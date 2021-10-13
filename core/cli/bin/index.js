#! /usr/bin/env node

const importLocal = require('import-local')

if(importLocal(__filename)){
    // 本地是指此项目中安装在 node_modules 中的
    // 如果全局安装了，本地也有，优先使用本地安装的
    // 开发时使用的是全局的，通过 npm link 到全局的
    require('npmlog').info('cli','正在使用 wj-cli-demo 本地版本')
}else{
    require('../lib/index')(process.argv.slice(2))
}