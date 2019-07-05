const merge = require('webpack-merge')
const base = require('./webpack.base.js')
module.exports = merge(base, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
        port: '3000',
        // host: '0.0.0.0'
    },
    plugins: [
    ]
});