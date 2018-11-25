const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "development",
    devtool: "source-map",
    devServer: {
        inline: true,
        hot: true,
        host: "localhost",
        port: 3000,
        contentBase: "./src",
        watchOptions: {
            aggregateTimeout: 100,
            ignored: /node_modules/
        }
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
});