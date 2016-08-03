/* eslint-disable prefer-template, no-var, prefer-arrow-callback, indent, object-shorthand, global-require, func-names, quotes */

function createLoader(experiments) {
    return [
        "module.exports = function(setExperiments) {",
            "var experiments = {};",
            "function assign(target) {",
                "'use strict';",
                "if (target == null) throw new TypeError('Cannot convert undefined or null to object');",
                "target = Object(target);",
                "for (var index = 1; index < arguments.length; index++) {",
                    "var source = arguments[index];",
                    "if (source != null) {",
                        "for (var key in source) {",
                            "if (Object.prototype.hasOwnProperty.call(source, key)) {",
                                "target[key] = source[key];",
                            "}",
                        "}",
                    "}",
                "}",
                "return target;",
            "};",
            experiments.map(function (experiment) {
                return [
                    "(function() {",
                        "var config = require('", experiment.config, "');",
                        "var _initialize = ",
                            experiment.initialize !== false
                                ? "require('" + experiment.initialize + "')"
                                : "false",
                        ";",
                        "var initialize = _initialize && _initialize.__esModule ? _initialize['default'] : _initialize;",
                        "var _update = ",
                            experiment.update !== false
                                ? "require('" + experiment.update + "')"
                                : "false",
                        ";",
                        "var update = _update && _update.__esModule ? _update['default'] : _update;",
                        "experiments['", experiment.key, "'] = {",
                            "config: config,",
                            "initialize: initialize,",
                            "update: update",
                        "};",
                        "if (module.hot) {",
                            "module.hot.accept('", experiment.config, "', function() {",
                                "var updated = require('", experiment.config, "');",
                                "experiments = assign({}, experiments, {", experiment.key, ": assign({}, experiments.", experiment.key, ", { config: updated }) });",
                                "setExperiments(experiments);",
                            "});",
                            experiment.initialize !== false ? [
                                "module.hot.accept('", experiment.initialize, "', function() {",
                                    "var _updated = require('", experiment.initialize, "');",
                                    "var updated = _updated && _updated.__esModule ? _updated['default'] : _updated;",
                                    "experiments = assign({}, experiments, {", experiment.key, ": assign({}, experiments.", experiment.key, ", { initialize: updated }) });",
                                    "setExperiments(experiments);",
                                "});"
                            ].join('') : '',
                            experiment.update !== false ? [
                                "module.hot.accept('", experiment.update, "', function() {",
                                    "var _updated = require('", experiment.update, "');",
                                    "var updated = _updated && _updated.__esModule ? _updated['default'] : _updated;",
                                    "experiments = assign({}, experiments, {", experiment.key, ": assign({}, experiments.", experiment.key, ", { update: updated }) });",
                                    "setExperiments(experiments);",
                                "});"
                            ].join('') : '',
                        "}",
                    "})();"
                ].join('');
            }).join(''),
            "setExperiments(experiments);",
        "}",
    ].join('');
}

module.exports = createLoader;
