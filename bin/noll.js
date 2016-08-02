#!/usr/bin/env node
/* eslint-disable no-var, vars-on-top, prefer-template, no-console */
var spawn = require('cross-spawn');

var result = spawn.sync(
    'node',
    [require.resolve('../scripts/start')],
    { stdio: 'inherit' }
);
process.exit(result.status);
