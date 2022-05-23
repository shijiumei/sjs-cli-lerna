'use strict';

module.exports = core;

const pkg = require('../package.json');
const log = require('@sjs-cli-lerna/log');

function core() {
    checkPkgVersion();
}

function checkPkgVersion() {
    console.log(pkg.version);
    log.success("sjst", "msg");
}
