/* eslint-disable no-var, func-names, prefer-arrow-callback, no-console */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');
var fs = require('fs');
var createConfig = require('./createConfig');
var createEntry = require('./createEntry');
var config = createConfig();
var entry = createEntry();

fs.writeFileSync(path.resolve(__dirname, '../entry/index.js'), entry);

new WebpackDevServer(webpack(config), {
    contentBase: path.resolve(__dirname, '../entry'),
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
}).listen(3000, 'localhost', function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:3000/');
});
