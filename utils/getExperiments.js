/* eslint-disable prefer-template, no-var, prefer-arrow-callback, indent, object-shorthand, global-require, func-names, quotes */
var path = require('path');
var glob = require('glob');
var exists = require('../utils/exists');

function getExperiments(cwd) {
    var files = glob.sync('**/experiment.json', {
        cwd: cwd,
        ignore: ['node_modules/**']
    });
    return files.map(function (filename) {
        var dirname = path.dirname(filename);
        var experimentFilename = path.join(cwd, filename);
        var experiment = require(experimentFilename);
        var initializeFilename = path.resolve(cwd, dirname, experiment.initialize || './initialize.js');
        var updateFilename = path.resolve(cwd, dirname, experiment.update || './update.js');

        if (!exists(initializeFilename)) initializeFilename = false;
        if (!exists(updateFilename)) updateFilename = false;

        return {
            key: dirname,
            config: experimentFilename,
            initialize: initializeFilename,
            update: updateFilename
        };
    });
}

module.exports = getExperiments;
