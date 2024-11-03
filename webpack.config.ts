import alt1chain from "@alt1/webpack";
import * as path from "path";

const srcdir = path.resolve(__dirname, "./src/");
const outdir = path.resolve(__dirname, "./dist/");

// wrapper around webpack-chain, most stuff you'll need are direct properties,
// more finetuning can be done at config.chain
// the wrapper gives decent webpack defaults for everything alt1/typescript/react related
const config = new alt1chain(srcdir, { ugly: false });

// the name and location of our entry file (the name is used for output and can contain a relative path)
config.entry("index", "./index.ts");

// where to put all the stuff
config.output(outdir);
config.chain.resolve.alias.merge({ vue$: "vue/dist/vue.esm-browser.prod.js" });

export default config.toConfig();
