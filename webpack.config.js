const path = require("path");

/**
 * @type {import("webpack").Configuration}
 */
module.exports = {
  mode: "production",
  context: path.resolve(__dirname, "src"),
  entry: "./index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    library: { type: "umd", name: "ClueSplit" },
  },
  devtool: false,
  externals: ["sharp", "canvas", "electron/common"],
  resolve: {
    extensions: [".wasm", ".tsx", ".ts", ".mjs", ".jsx", ".js"],
    alias: { vue$: "vue/dist/vue.esm-browser.prod.js" },
  },
  module: {
    // The rules section tells webpack what to do with different file types when you import them from js/ts
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] },
      // type:"asset" means that webpack copies the file and gives you an url to them when you import them from js
      {
        test: /\.(png|jpg|jpeg|gif|webp)$/,
        type: "asset/resource",
        generator: { filename: "[base]" },
      },
      {
        test: /\.(html|json)$/,
        type: "asset/resource",
        generator: { filename: "[base]" },
      },
      // file types useful for writing alt1 apps, make sure these two loader come after any other json or png loaders, otherwise they will be ignored
      {
        test: /\.data\.png$/,
        loader: "alt1/imagedata-loader",
        type: "javascript/auto",
      },
      { test: /\.fontmeta.json/, loader: "alt1/font-loader" },
    ],
  }
};
