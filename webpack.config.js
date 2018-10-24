const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve("./build")
  },
  devServer: {
    contentBase:'./build',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: "ts-loader"
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      template: "./src/public/index.html",
      filename: "index.html"
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
