/* eslint-disable no-var, func-names, prefer-arrow-callback, no-console */
var path = require('path');
var webpack = require('webpack');

module.exports = function createConfig() {
    return {
        devtool: 'eval',
        entry: [
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            path.resolve(__dirname, '../entry/index'),
        ],
        output: {
            path: path.resolve(__dirname, '../dist'),
            filename: 'bundle.js',
            publicPath: '/static/'
        },
        module: {
            loaders: [{
                test: /\.js$/,
                loaders: ['babel'],
                include: [
                    path.resolve(__dirname, '../entry'),
                    process.cwd()
                ],
                exclude: /node_modules/
            }, {
                test: /\.json$/,
                loaders: ['json'],
                include: [
                    path.resolve(__dirname, '../entry'),
                    process.cwd()
                ],
                exclude: /node_modules/
            }],
        },
        resolve: {
            extensions: ['', '.js', '.jsx']
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    };
};
