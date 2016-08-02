/* eslint-disable no-var, prefer-arrow-callback, indent, object-shorthand, global-require, func-names, quotes */
var path = require('path');
var glob = require('glob');

function createEntry(cwd) {
    var files = glob.sync('**/config.json', { cwd: cwd, ignore: ['node_modules/**'] });
    var experiments = files.map(function (filename) {
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
        "var createClient = require('./client.js');",
        "var setExperiments = createClient();",
        "var experiments = {};",
        "function assign(target) {",
        "    'use strict';",
        "    if (target == null) throw new TypeError('Cannot convert undefined or null to object');",
        "    target = Object(target);",
        "    for (var index = 1; index < arguments.length; index++) {",
        "        var source = arguments[index];",
        "        if (source != null) {",
        "            for (var key in source) {",
        "                if (Object.prototype.hasOwnProperty.call(source, key)) {",
        "                    target[key] = source[key];",
        "                }",
        "            }",
        "        }",
        "    }",
        "    return target;",
        "};",
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
                        "experiments = assign({}, experiments, {", experiment.key, ": assign({}, experiments.", experiment.key, ", { config: updated }) });",
                        "setExperiments(experiments);",
                    "});",
                    "module.hot.accept('", experiment.initialize, "', () => {",
                        "var updated = require('", experiment.initialize, "').default;",
                        "experiments = assign({}, experiments, {", experiment.key, ": assign({}, experiments.", experiment.key, ", { initialize: updated }) });",
                        "setExperiments(experiments);",
                    "});",
                    "module.hot.accept('", experiment.update, "', () => {",
                        "var updated = require('", experiment.update, "').default;",
                        "experiments = assign({}, experiments, {", experiment.key, ": assign({}, experiments.", experiment.key, ", { update: updated }) });",
                        "setExperiments(experiments);",
                    "});",
                "}"
            ].join('');
        }).join(''),
        "setExperiments(experiments);"
    ].join('');
}

module.exports = createEntry;
