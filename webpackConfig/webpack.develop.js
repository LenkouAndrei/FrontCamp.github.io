const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require('path');

module.exports = merge(common, {
  mode: "development",
  watch: true,
  devtool: 'inline-cheap-source-map',
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    open: true,
    watchContentBase: true,
  },
})