const path = require("path");
const webpackMerge = require("webpack-merge");
const baseConfig = require("./webpack.base");

const clientConfig = {
  //Tell about root file of server app
  entry: "./src/client/client.js",

  // Tell where put the output file
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public")
  }
};

module.exports = webpackMerge(baseConfig, clientConfig);
