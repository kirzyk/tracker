const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
require('babel-polyfill');

module.exports = {
    entry: ['babel-polyfill', './src/app.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        port: 4000,
        contentBase: path.resolve(__dirname, 'static')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'babel-preset-env']
                    }
                }
            }
        ]
    },
    devtool: "source-map",
    plugins: [
        new CopyWebpackPlugin([
            {from: 'static'}
        ])
    ]
};