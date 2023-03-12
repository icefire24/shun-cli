#! /usr/bin/env node
const chalk = require('chalk')
const program = require('commander')
const { initQuestion } = require('./inquier')
const gradient = require('gradient-string')
const { copyTemplate } = require('./copyTemplate')
const { renderFile } = require('./render')
const  {loading,successCallback}=require("./share")
const { options } = require('./constant')
console.log(chalk.bold(gradient.morning('\n🚀 Welcome to use icefirecli to create custom-app')))
async function init() {
  console.log(333);
  let isOverwrite = await initQuestion()
  if (isOverwrite) {
    loading('正在拉取模板', copyTemplate)
    renderFile()
    successCallback(options.projectName,options.package)
  }
}
init()
// commander 提供了 version 方法，.version() 方法可以设置版本
program.version(`icefirecli ${require('../package.json').version}`)
// name 是配置脚手架名称
// usage 是配置命令格式
program.name('icefirecli').usage(`<command> [option]`)

program.option('-h,--help', 'help').action((cmd) => {
  // cmd.help?
})
program.option('-v,--version', 'version').action((cmd) => {
  cmd.version ? console.log(chalk.blue(program._version)) : ''
})
program.parse(process.argv)
