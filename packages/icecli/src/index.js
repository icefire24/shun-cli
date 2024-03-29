#! /usr/bin/env node
const chalk = require('chalk')
const program = require('commander')
const { initQuestion } = require('./inquier')
const gradient = require('gradient-string')
const { copyTemplate } = require('./copyTemplate')
const { renderFile } = require('./render')
const { successCallback } = require("./share")
const { options } = require('./constant')
console.log(chalk.bold(gradient.morning('\n🚀 Welcome to use shun-cli to create custom-app')))
async function init() {
  let isOverwrite = await initQuestion()
  if (isOverwrite) {
    try {
      console.log(chalk.blue.bold('正在拉取模板'))
      copyTemplate()
      renderFile()
      successCallback(options.projectName, options.package)
    } catch (error) {
      console.log(error);
    }
  }
}
init()
// commander 提供了 version 方法，.version() 方法可以设置版本
program.version(`shun-cli ${require('../package.json').version}`)
// name 是配置脚手架名称
// usage 是配置命令格式
program.name('shun-cli').usage(`<command> [option]`)

program.option('-h,--help', 'help').action((cmd) => {
  // cmd.help?
})
program.option('-v,--version', 'version').action((cmd) => {
  cmd.version ? console.log(chalk.blue(program._version)) : ''
})
program.parse(process.argv)
