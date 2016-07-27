/* eslint-disable no-var */
var rucksack = require('rucksack-css');
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractTextPlugin = new ExtractTextPlugin('client.css');

module.exports = {
    devtool: 'eval',
    entry: [
        './client/index'
    ],
    output: {
        path: path.join(__dirname, 'entry'),
        filename: 'client.js',
        library: 'client',
        libraryTarget: 'commonjs2'
    },
    module: {
        loaders: [{
            test: /\.scss$/,
            include: path.join(__dirname, 'client'),
            loader: extractTextPlugin.extract([
                'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
                'postcss-loader',
                'sass?outputStyle=expanded'
            ].join('!'))
        }, {
            test: /\.js$/,
            loaders: ['babel'],
            include: [
                path.join(__dirname, 'client')
            ],
            exclude: /node_modules/
        }],
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        root: [
            path.join(__dirname, 'client')
        ]
    },
    postcss: [
        rucksack({ autoprefixer: true })
    ],
    plugins: [
        extractTextPlugin
    ],
    sassLoader: {
        includePaths: [path.resolve(__dirname, 'client')]
    }
};
