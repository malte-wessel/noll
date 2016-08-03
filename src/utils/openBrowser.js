/* eslint-disable no-var, prefer-template */
var execSync = require('child_process').execSync;
var path = require('path');
var opn = require('opn');

function openBrowser(url) {
    if (process.platform === 'darwin') {
        try {
            // Try our best to reuse existing tab
            // on OS X Google Chrome with AppleScript
            execSync('ps cax | grep "Google Chrome"');
            execSync(
                'osascript ' +
                path.resolve(__dirname, './chrome.applescript') +
                ' ' + url
            );
            return;
        } catch (err) {
            // Ignore errors.
        }
    }
    // Fallback to opn
    // (It will always open new tab)
    opn(url);
}

module.exports = openBrowser;
