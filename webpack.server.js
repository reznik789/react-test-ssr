const path = require("path");
const webpackMerge = require("webpack-merge");
const baseConfig = require("./webpack.base");
const webpackNodeExternals = require('webpack-node-externals');

const serverConfig = {
  // Inform that we are build for nodejs
  target: "node",

  //Tell about root file of server app
  entry: "./src/index.js",

  // Tell where put the output file
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build")
  },

  externals: [webpackNodeExternals()]
};

module.exports = webpackMerge(baseConfig, serverConfig);
