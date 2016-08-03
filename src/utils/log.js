/* eslint-disable no-var, vars-on-top, no-loop-func, func-names, no-console, prefer-rest-params, prefer-arrow-callback  */
var chalk = require('chalk');
var colors = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray'];

var api = colors.reduce(function (acc, color) {
    acc[color] = function () {
        var args = Array.prototype.slice.call(arguments);
        console.log(chalk[color].apply(chalk, [new Date().toLocaleTimeString()].concat(args)));
    };
    return acc;
}, {});

module.exports = api;
