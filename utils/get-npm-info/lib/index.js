'use strict';

const axios = require('axios');
const urlJson = require('url-join');
const semver = require('semver');

function getNpmInfo(npmName, registry){
    if(!npmName) {
        return null;
    }

    const registryUrl = registry || getDefaultRegistry();
    const npmInfoUrl = urlJson(registryUrl, npmName);
    // console.log(npmInfoUrl);
    return axios.get(npmInfoUrl).then(response => {
        if(response.status === 200){
            return response.data;
        }
        return null;
    }).catch(err => {
        return Promise.reject(err);
    });
}

function getDefaultRegistry(isOriginal = false) {
    return isOriginal ? 'https://registry.npmjs.org' : 'https://registry.npm.taobao.org';
}

async function getNpmVersions(npmName, registry) {
    const data = await getNpmInfo(npmName, registry);
    if(data) {
        return Object.keys(data.versions);
    } else {
        return [];
    }
}

function getSemverVersions(baseVersion, versions){
    // console.log(`getSemverVersions typeof versions: ${typeof versions}, versions instanceof Array: ${versions instanceof Array}`);

    const filterVersions =  versions
        .filter(version => {
            const result = semver.gt(version, baseVersion);
            // const result =semver.satisfies(version, `^${baseVersion}`);
            // console.log(`version: ${version}, ^${baseVersion}: ${result}`);
            return result;
        }
            
        );
        
    const sortVersions = filterVersions
        .sort((a, b) => semver.gt(b, a));
    // console.log(`baseVersion: ${baseVersion}, versions: ${versions}, filterVersions: ${filterVersions}, sortVersions: ${sortVersions}`);
    return sortVersions;
}

async function getNpmSemverVersion(baseVersion, npmName, registry){
    const versions = await getNpmVersions(npmName, registry);
    // console.log(`typeof versions: ${typeof versions}, versions instanceof Array: ${versions instanceof Array}`);

    // const newVer = typeof versions === '' ? [versions] : versions;
    
    const newVersions = getSemverVersions(baseVersion, versions);
    // console.log(`baseVersion: ${baseVersion}, versions: ${versions}, newVer: ${newVer}, newVersions: ${newVersions}`);
    if(newVersions && newVersions.length > 0){
        return newVersions[0];
    }
}

module.exports = {
    getNpmInfo,
    getNpmVersions,
    getNpmSemverVersion
};
