const { existsSync } = require('fs-extra')
const ora = import('ora')
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const gradient = require('gradient-string')
const handleFolderExist = function (projectName) {
  let absolutePath = path.join(process.cwd(), projectName)
  return existsSync(absolutePath)
}
async function loading(message, fn, ...args) {
  const spinner = ora(message)
  spinner.start() // 开启加载
  try {
    fn(...args)
    // 加载成功
    spinner.succeed()
  } catch (error) {
    /* // 加载失败
      spinner.fail("request fail, refetching");
      await sleep(1000);
      // 重新拉取
      return loading(message, fn, ...args); */
    console.log(error)
  }
}

/**下载用户选择模板
 * @param {string} template 用户选择模板名称
 * @param {string}  outdir 项目名称
 */
function downTemplate(template, outdir) {
  fs.copySync(path.resolve(__dirname, `../template/${template}`), path.join(process.cwd(), outdir))
}
/**项目拉取成功后提示
 * @param {string} outdir 项目文件夹
 */
function successCallback(outdir,package) {
  console.log(gradient.rainbow('项目拉取成功,运行以下命令启动项目'))
  console.log(chalk.blue.bold(`cd ${outdir}`))
  console.log(chalk.blue.bold(`${package} install`))
  console.log(chalk.blue.bold(`${package} dev`))
}

/**
 * 睡觉函数
 * @param {Number} n 睡眠时间
 */
function sleep(n) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, n)
  })
}
module.exports = { handleFolderExist, loading, successCallback }
