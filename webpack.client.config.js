/* eslint-disable no-var, object-shorthand, prefer-template */
var rucksack = require('rucksack-css');
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractTextPlugin = new ExtractTextPlugin('client.css');

var env = process.env.NODE_ENV;
var plugins = [
    extractTextPlugin,
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(env) }),
];
var devtool = 'eval';
var localIdentName = '[local]___[hash:base64:5]';

if (env === 'production') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
    devtool = undefined;
    localIdentName = '[hash:base64:8]';
}

module.exports = {
    devtool: devtool,
    entry: [
        'babel-polyfill',
        './src/client/index'
    ],
    output: {
        path: path.join(__dirname, 'entry'),
        filename: 'client.js',
        library: 'client',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [{
            test: /\.scss$/,
            include: path.join(__dirname, 'src/client'),
            loader: extractTextPlugin.extract([
                'css-loader?modules&sourceMap&importLoaders=1&localIdentName=' + localIdentName,
                'postcss-loader',
                'sass?outputStyle=expanded'
            ].join('!'))
        }, {
            test: /\.js$/,
            loader: 'babel',
            include: [path.join(__dirname, 'src/client')],
            exclude: /node_modules/
        }],
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        root: [
            path.join(__dirname, 'src/client')
        ]
    },
    postcss: [
        rucksack({ autoprefixer: true })
    ],
    plugins: plugins,
    sassLoader: {
        includePaths: [path.resolve(__dirname, 'src/client')]
    }
};
