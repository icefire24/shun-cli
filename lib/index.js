const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");


/**下载用户选择模板
 * @param {string} template 用户选择模板名称
 * @param {string}  outdir 项目名称
 */
function downTemplate(template, outdir) {
  fs.copySync(path.resolve(__dirname, `../template/${template}`), path.join(process.cwd(), outdir));
}
/**项目拉取成功后提示
 * @param {string} outdir 项目文件夹
 */
function successCallback(outdir) {
  console.log(chalk.blue.bold('项目拉取成功'));
  console.log(chalk.blue.bold(`cd ${outdir}`));
  console.log(chalk.blue.bold(`yarn install`));
  console.log(chalk.blue.bold(`yarn dev`));
}

/**
 * 睡觉函数
 * @param {Number} n 睡眠时间
 */
function sleep(n) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, n);
  });
}


module.exports = {
  loading,
  chooseFeatures
};
