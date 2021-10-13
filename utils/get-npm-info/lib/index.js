'use strict';

const axios = require('axios')
const urlJoin = require('url-join')
const semver = require('semver')


function getNpmInfo(npmName,registry) {
    console.log(npmName)
    if(!npmName){
        return null;
    }
    const registryUrl = registry || getDefaultRegistry(true)
    const npmInfoUrl = urlJoin(registryUrl,npmName)
    console.log(npmInfoUrl)
}

function getDefaultRegistry(isOriginal = false){
    return isOriginal?'https://registry.npmjs.org':'https://registry.npm.taobao.org'
}

module.exports = {
    getNpmInfo
};