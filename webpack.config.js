const path = require('path');

module.exports = {
    devtool: "source-map",
    entry: ['@babel/polyfill', 'whatwg-fetch', path.resolve(__dirname, './src/index.js')],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};