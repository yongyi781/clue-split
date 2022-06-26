// alt1 base libs, provides all the commonly used methods for image matching and capture
// also gives your editor info about the window.alt1 api
import * as a1lib from "@alt1/base"
import ChatBoxReader, { ChatLine } from "@alt1/chatbox"
import { computed, createApp, onMounted, onUpdated, ref, watch } from "vue"

// //tell webpack to add index.html and appconfig.json to output
require("!file-loader?name=[name].[ext]!./index.html")
require("!file-loader?name=[name].[ext]!./appconfig.json")
require("!file-loader?name=[name].[ext]!./style.css")

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
    let d = new Date()
    let d2 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, timestamp)
    if (d2 > new Date()) {
        // Timestamp near midnight
        d2.setDate(d2.getDate() - 1)
    }
    return d2
}

function mixColor(color: number[]) {
    return a1lib.mixColor(color[0], color[1], color[2], color[3])
}

function formatTime(elapsed: number) {
    const mins = Math.floor(elapsed / 60)
    const secs = elapsed % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
}

function capitalizeFirstLetter(str : string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
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

        const table = computed(() => timestamps.value.map((t, i) => {
            const elapsed = (t.getTime() - startTime.value.getTime()) / 1000
            const duration = i === 0 ? elapsed : (t.getTime() - timestamps.value[i - 1].getTime()) / 1000
            return {
                id: i + 1,
                elapsed: formatTime(elapsed),
                duration: formatTime(duration),
                rate: ((i + 1) * 3600 / elapsed).toFixed(1)
            }
        }))

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
            // timestamps.value = [
            //     new Date(startTime.value.getTime() + 1),
            //     new Date(startTime.value.getTime() + 2),
            //     new Date(startTime.value.getTime() + 3000),
            // ]
            setInterval(captureChat, 1200)
            setInterval(() => {
                const lastClueTime = getLastClueTime()
                currentClueTime.value = Math.round((Date.now() - lastClueTime.getTime()) / 1000)
            })
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
            timestamps.value = []
            clueType.value = null;
        }

        onMounted(() => {
            setTimeout(init, 100)
        })

        watch(timestamps, () => {
            const output = document.getElementById("output")
            output.scrollTop = output.scrollHeight
        }, { deep: true, flush: "post" })

        return { startTime, clueType, currentClueTime, table, capitalizeFirstLetter, formatTime, init, reset }
    }
}).mount("#app")
