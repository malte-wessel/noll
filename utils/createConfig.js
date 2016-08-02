/* eslint-disable no-var, func-names, prefer-arrow-callback, no-console */
var path = require('path');
var webpack = require('webpack');

module.exports = function createConfig(cwd) {
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
                loader: 'babel',
                include: [
                    path.resolve(__dirname, '../entry'),
                    cwd
                ],
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    ignore: [
                        path.resolve(__dirname, '../entry/client')
                    ]
                }
            }, {
                test: /\.json$/,
                loader: 'json',
                include: [
                    path.resolve(__dirname, '../entry'),
                    cwd
                ],
                exclude: /node_modules/
            }, {
                test: /\.(glsl|frag|vert)$/,
                loader: 'raw',
                exclude: /node_modules/
            }, {
                test: /\.(glsl|frag|vert)$/,
                loader: 'glslify',
                exclude: /node_modules/
            }]
        },
        resolve: {
            extensions: ['', '.js', '.jsx']
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    };
};
