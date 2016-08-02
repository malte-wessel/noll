/* eslint-disable no-var, prefer-arrow-callback, indent, object-shorthand, global-require, func-names, quotes */
var path = require('path');
var glob = require('glob');

function createEntry(cwd) {
    var experiments = glob.sync('**/config.json', { cwd: cwd }).map(function (filename) {
        var dirname = path.dirname(filename);
        var configFilename = path.join(cwd, filename);
        var config = require(configFilename);
        var initializeFilename = path.resolve(cwd, dirname, config.initialize || './initialize.js');
        var updateFilename = path.resolve(cwd, dirname, config.update || './update.js');
        return {
            key: dirname,
            config: configFilename,
            initialize: initializeFilename,
            update: updateFilename
        };
    });

    return [
        "import createClient from './client.js';",
        "const setExperiments = createClient();",
        "let experiments = {};",
        experiments.map(function (experiment) {
            return [
                "experiments['", experiment.key, "'] = {",
                    "config: require('", experiment.config, "'),",
                    "initialize: require('", experiment.initialize, "').default,",
                    "update: require('", experiment.update, "').default",
                "};",
                "if (module.hot) {",
                    "module.hot.accept('", experiment.config, "', () => {",
                        "var updated = require('", experiment.config, "');",
                        "experiments = { ...experiments, ", experiment.key, ": { ...experiments.", experiment.key, ", config: updated }};",
                        "setExperiments(experiments);",
                    "});",
                    "module.hot.accept('", experiment.initialize, "', () => {",
                        "var updated = require('", experiment.initialize, "').default;",
                        "experiments = { ...experiments, ", experiment.key, ": { ...experiments.", experiment.key, ", initialize: updated }};",
                        "setExperiments(experiments);",
                    "});",
                    "module.hot.accept('", experiment.update, "', () => {",
                        "var updated = require('", experiment.update, "').default;",
                        "experiments = { ...experiments, ", experiment.key, ": { ...experiments.", experiment.key, ", update: updated }};",
                        "setExperiments(experiments);",
                    "});",
                "}"
            ].join('');
        }).join(''),
        "setExperiments(experiments);"
    ].join('');
}

module.exports = createEntry;
