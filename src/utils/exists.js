/* eslint-disable no-var */
var fs = require('fs');

function exists(filename) {
    try {
        fs.accessSync(filename);
    } catch (err) {
        return false;
    }
    return true;
}

module.exports = exists;
