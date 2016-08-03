/* eslint-disable no-var, vars-on-top, no-console, prefer-arrow-callback, indent, object-shorthand, global-require, func-names, quotes */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');
var fs = require('fs');
var chokidar = require('chokidar');
var deepEqual = require('deep-equal');

var log = require('../utils/log');
var getExperiments = require('../utils/getExperiments');
var createConfig = require('../utils/createConfig');
var createEntry = require('../utils/createEntry');
var createLoader = require('../utils/createLoader');
var openBrowser = require('../utils/openBrowser');

var cwd = process.cwd();
var experiments = getExperiments(cwd);

function writeLoader(exp) {
    var loader = createLoader(exp);
    fs.writeFileSync(path.resolve(__dirname, '../entry/loader.js'), loader);
}

function writeEntry() {
    var entry = createEntry();
    fs.writeFileSync(path.resolve(__dirname, '../entry/index.js'), entry);
}

function handleChanged() {
    var experimentsNext = getExperiments(cwd);
    if (!deepEqual(experimentsNext, experiments)) {
        experiments = experimentsNext;
        log.yellow('Updating loader...');
        writeLoader(experiments);
    }
}

var watcher = chokidar.watch('**/*.*', {
    cwd: cwd,
    ignored: /node_modules/,
    ignoreInitial: true
});

watcher
    .on('add', handleChanged)
    .on('change', handleChanged)
    .on('unlink', handleChanged);


writeLoader(experiments);
writeEntry();
var config = createConfig(cwd);
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
