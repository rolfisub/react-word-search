const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve('./build')
  },
  module: {
    rules: [
      {
        test:/\.tsx?/,
        use: 'ts-loader'
      }
    ]
  }
};
