/* eslint-disable prefer-template, no-var, prefer-arrow-callback, indent, object-shorthand, global-require, func-names, quotes */

function createEntry() {
    return [
        "var createClient = require('./client.js');",
        "var loader = require('./loader.js');",
        "var setExperiments = createClient();",
        "loader(setExperiments);",
        "module.hot.accept('./loader.js', function() {",
            "var loaderUpdated = require('./loader.js');",
            "loaderUpdated(setExperiments);",
        "});"
    ].join('');
}

module.exports = createEntry;
