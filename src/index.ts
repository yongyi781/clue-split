// alt1 base libs, provides all the commonly used methods for image matching and capture
// also gives your editor info about the window.alt1 api
import * as a1lib from "@alt1/base"
import ChatBoxReader, { ChatLine } from "@alt1/chatbox"
import { computed, createApp, onMounted, onUpdated, ref, watch } from "vue"

// //tell webpack to add index.html and appconfig.json to output
require("!file-loader?name=[name].[ext]!./index.html")
require("!file-loader?name=[name].[ext]!./appconfig.json")
require("!file-loader?name=[name].[ext]!./style.css")
require("!file-loader?name=[name].[ext]!./icon.png")

// Puts timestampless chat lines with the previous chat line
function regroupChatLines(lines: ChatLine[]) {
    let result: ChatLine[] = []
    for (let line of lines) {
        if (ChatBoxReader.getMessageTime(line.text) === -1 && result.length > 0) {
            let lastLine = result[result.length - 1]
            // Add space to the first fragment
            let fragments = line.fragments
            fragments[0] = { ...fragments[0] }
            fragments[0].text = " " + fragments[0].text
            lastLine.fragments.push(...fragments)
            lastLine.text += " " + line.text
        } else {
            result.push({ ...line })
        }
    }
    return result
}

function chatTimestampToDateTime(timestamp: number) {
    let now = new Date()
    let result = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, timestamp)
    if (result.getTime() - now.getTime() > 12 * 60 * 60 * 1000) {
        // Chatbox says 23:something and it's already past midnight. Check for this by testing if result is over 12 hours from now.
        result.setDate(result.getDate() - 1)
    }
    return result
}

function mixColor(color: number[]) {
    return a1lib.mixColor(color[0], color[1], color[2], color[3])
}

function formatTime(elapsed: number, useCsvTimeFormat = false) {
    const mins = Math.floor(elapsed / 60)
    const secs = elapsed % 60
    return useCsvTimeFormat ? `${Math.floor(mins / 60)}:${(mins % 60).toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}` : `${mins}:${secs.toString().padStart(2, "0")}`
}

function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function formatDateTimeFileName(date: Date) {
    function p(n: number) {
        return (n > 9 ? "" : "0") + n
    }
    const y = date.getFullYear()
    const M = date.getMonth() + 1
    const d = date.getDate()
    const h = date.getHours()
    const m = date.getMinutes()
    const s = date.getSeconds()
    return `${y}-${p(M)}-${p(d)}_${p(h)}-${p(m)}-${p(s)}`
}

a1lib.identifyApp("appconfig.json")

const reader = new ChatBoxReader()
const clueCompleteRegex = /Congratulations! You have now completed [\d,]+ (?<clueType>\w+) treasure trails./
const clueCompleteColor = [4, 143, 6]

reader.readargs.colors.push(mixColor(clueCompleteColor))
// Riftsplitter title
reader.readargs.colors.push(a1lib.mixColor(215, 243, 136))

createApp({
    setup() {
        const startTime = ref(new Date())
        const clueType = ref<string>(null)
        const currentClueTime = ref(0)
        const timestamps = ref<Date[]>([])

        const table = computed(() => getTable(false))

        function getTable(useCsvTimeFormat = false) {
            return timestamps.value.map((t, i) => {
                const elapsed = (t.getTime() - startTime.value.getTime()) / 1000
                const duration = i === 0 ? elapsed : (t.getTime() - timestamps.value[i - 1].getTime()) / 1000
                return {
                    id: i + 1,
                    elapsed: formatTime(elapsed, useCsvTimeFormat),
                    duration: formatTime(duration, useCsvTimeFormat),
                    rate: ((i + 1) * 3600 / elapsed).toFixed(1)
                }
            })
        }

        function getLastClueTime() {
            return timestamps.value.length === 0 ? startTime.value : timestamps.value[timestamps.value.length - 1]
        }

        function init() {
            reader.find()
            if (!reader.pos) {
                console.log("Chat not found, trying again.")
                setTimeout(init, 1200)
                return
            }
            const rect = reader.pos.mainbox.rect
            // Overlay the chatbox.
            alt1.overLayRect(a1lib.mixColor(255, 0, 128), rect.x, rect.y, rect.width, rect.height, 2000, 1)
            reset()
            setInterval(captureChat, 1200)
            setInterval(() => {
                const lastClueTime = getLastClueTime()
                currentClueTime.value = Math.round((Date.now() - lastClueTime.getTime()) / 1000)
            }, 500)
        }

        function captureChat() {
            let lines = reader.read()
            if (lines == null || lines.length == 0) {
                return
            }
            lines = regroupChatLines(lines)

            for (let line of lines) {
                let match = line.text.match(clueCompleteRegex)

                if (match != null && match.length > 0) {
                    let timestamp = chatTimestampToDateTime(ChatBoxReader.getMessageTime(line.text))
                    if (timestamp > getLastClueTime()) {
                        if (timestamps.value.length === 0) {
                            clueType.value = match.groups.clueType
                        }
                        if (clueType.value === match.groups.clueType) {
                            timestamps.value.push(timestamp)
                        }
                    }
                }
            }
        }

        function reset() {
            startTime.value = new Date(Math.round(Date.now() / 1000) * 1000)
            // Debugging
            // timestamps.value = [new Date(startTime.value.getTime() + 3000), new Date(startTime.value.getTime() + 4000)]
            timestamps.value = []
            clueType.value = null
            currentClueTime.value = 0
        }

        function exportCsv() {
            const rows = [["#", "Elapsed", "Clue time", "Clues/hr"]].concat(getTable(true).map(x => [x.id.toString(), x.elapsed, x.duration, x.rate]))
            const csvContent = rows.map(r => r.join(",")).join("\n")
            const link = document.createElement("a")
            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" })
            // Now download the file
            const url = URL.createObjectURL(blob)
            link.setAttribute("href", url)
            link.setAttribute("download", `clue_split_${clueType.value ?? "unknown"}_${formatDateTimeFileName(startTime.value)}.csv`)
            link.style.visibility = "hidden"
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }

        onMounted(() => {
            setTimeout(init, 100)
        })

        watch(timestamps, () => {
            const output = document.getElementById("output")
            output.scrollTop = output.scrollHeight
        }, { deep: true, flush: "post" })

        return { startTime, clueType, currentClueTime, table, capitalizeFirstLetter, formatTime, init, reset, exportCSV: exportCsv }
    }
}).mount("#app")
