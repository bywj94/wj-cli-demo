'use strict';

const semver = require('semver')
const colors = require('colors/safe')
const minimist = require('minimist')
const dotenv = require('dotenv')

const os = require('os')
const fs = require('fs')
const path = require('path')

const log = require('@wj-cli-demo/log')
const pkg = require('../package.json')
const constant = require('./const')


function core() {
    try{
    checkPkgVersion()
    checkNodeVersion()
    checkRoot()
    checkUserHome()
    checkInputArgs()
    checkEnv()
    checkGlobalUpdate()
    }catch(e){
        log.error(e.message)
    }

}

// 检查版本号
function checkPkgVersion(){
    log.notice('cli',pkg.version)
}

// 检查node版本
function checkNodeVersion(){
    const currentVersion = process.version;
    const lowestVersion = constant.LOWEST_NODE_VERSION;
    if(!semver.gte(currentVersion,lowestVersion)){
        throw new Error(colors.red(`wj-cli-demo 需要安装 ${lowestVersion} 以上版本的 Node.js`))
    }
}

// 检查是否是root用户，不是的话降级
function checkRoot(){
    // 如果是 sudo 启动的，开始值为 0
    // console.log(process.geteuid());
    const rootCheck = require('root-check')
    rootCheck()
    // 降级之后为 501
    // console.log(process.geteuid());
}

// 检查用户主目录
function checkUserHome(){
    const userhome = os.homedir()
    if(!userhome || !fs.existsSync(userhome)){
        throw new Error(colors.red('用户主目录不存在！'))
    }
}

// 检查入参
function checkInputArgs(){
    const argv = minimist(process.argv.slice(2))
    if(argv.debug){
        log.level = 'verbose'
    }
}

// 检查环境变量
function checkEnv(){
    // 默认环境变量存储在主目录的 .env 文件中
    const envPath = path.resolve(os.homedir(),'.env')
    let config;
    if(fs.existsSync(envPath)){
        config = dotenv.config({path:envPath})
    }
    if(process.env.CLI_HOME){
        process.env.CLI_HOME_PATH = path.join(os.homedir(),process.env.CLI_HOME)
    }else{
        process.env.CLI_HOME_PATH = path.join(os.homedir(),constant.DEFAULT_CLI_HOME)
    }
    console.log('环境变量：',config);
}

// 检查版本，更新
function checkGlobalUpdate(){
    const currentVersion = pkg.version;
    const npmName = pkg.name;
    const {getNpmInfo} = require('@wj-cli-demo/get-npm-info')
    getNpmInfo(npmName)
}

module.exports = core;
