const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '..'),
            verbose: true,
            dry: false
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            chunks: ['main', 'polyfills']
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    entry: ['@babel/polyfill', 'whatwg-fetch', path.resolve(__dirname, '../src/index.js')],
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../dist')
    },
    name: 'index',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader"
                    // {
                    //     loader: 'style-loader',
                    //     options: {
                    //         sourceMap: true
                    //     }
                    // },
                    // {
                    //     loader: 'css-loader',
                    //     options: {
                    //         sourceMap: true
                    //     }
                    // },
                    // {
                    //     loader: 'postcss-loader',
                    //     options: {
                    //         plugins: [
                    //             autoprefixer({
                    //                 browsers: ['ie >= 10', 'last 4 version']
                    //             })
                    //         ],
                    //         sourceMap: true
                    //     }
                    // },
                    // {
                    //     loader: 'less-loader',
                    //     options: {
                    //         sourceMap: true
                    //     }
                    // }
                ]
            }
        ]
    }
};