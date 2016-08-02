/* eslint-disable no-var, func-names, prefer-arrow-callback, no-console, vars-on-top, prefer-template */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');
var fs = require('fs');
var log = require('../utils/log');
var createConfig = require('../utils/createConfig');
var createEntry = require('../utils/createEntry');
var openBrowser = require('../utils/openBrowser');

var cwd = process.cwd();
var config = createConfig(cwd);
var entry = createEntry(cwd);

fs.writeFileSync(path.resolve(__dirname, '../entry/index.js'), entry);

var compiler = webpack(config);

compiler.plugin('invalid', function () {
    log.yellow('Compiling...');
});

compiler.plugin('done', function (stats) {
    var hasErrors = stats.hasErrors();
    var hasWarnings = stats.hasWarnings();
    if (!hasErrors && !hasWarnings) {
        log.green('Compiled successfully!');
        return;
    }

    var json = stats.toJson();

    if (hasErrors) {
        log.red('Failed to compile.');
        json.errors.forEach(function (message) {
            console.log(message);
        });
        return;
    }

    if (hasWarnings) {
        log.yellow('Compiled with warnings.');
        json.warnings.forEach(function (message) {
            console.log(message);
        });
    }
});

new WebpackDevServer(compiler, {
    contentBase: path.resolve(__dirname, '../entry'),
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    quiet: true,
    watchOptions: {
        ignored: /node_modules/
    }
}).listen(3000, 'localhost', function (err) {
    if (err) {
        console.log(err);
        return;
    }
    log.cyan('Starting the development server...');
    log.white('The app will be running at http://localhost:3000/');
    openBrowser('http://localhost:3000/');
});
