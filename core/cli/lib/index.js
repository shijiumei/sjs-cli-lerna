'use strict';

module.exports = core;

const semver = require('semver');
const colors = require('colors/safe');
const log = require('@sjs-cli-lerna/log');


const pkg = require('../package.json');
const constant = require('./const');

function core() {
    try{
        checkPkgVersion();
        checkNodeVersion();
    }catch(e){
        log.error(e.message);
    }
}

function checkNodeVersion() {
    // 第一步，获取当前Node版本号
    const currentVersion = process.version;
    // 第二步，比对最低版本号
    const lowestVersion = constant.LOWeST_NODE_VERSION;
    if(!semver.gte(currentVersion, lowestVersion)) {
        throw new Error(colors.red(`sjs-cli 需要安装 v${lowestVersion} 以上版本的 Node.js`));
    }
}

function checkPkgVersion() {
    log.info('sjs', pkg.version);
}
