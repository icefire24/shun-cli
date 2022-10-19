const fs = require("fs-extra");
const path = require("path");
const Inquirer = require("inquirer");
const ora = require("ora");
const chalk = require("chalk");
const { Console } = require("console");
//检查目标文件夹是否已存在
async function handleFolderExist(projectName, cmd) {
  let outdir = path.join(process.cwd(), projectName);
  if (fs.existsSync(outdir)) {
    if (cmd.force) {
      await fs.remove(outdir)``;
    } else {
      let { isOverwrite } = await new Inquirer.prompt([
        {
          name: "isOverwrite",
          type: "list",
          message: "已存在目标文件夹，是否覆盖",
          choices: [
            { name: "覆盖", value: true },
            { name: "取消", value: false },
          ],
        },
      ]);
      isOverwrite ? (await fs.remove(outdir), chooseTemplate(projectName)) : console.log("取消");
    }
  } else {
    chooseTemplate(projectName);
  }
}

/**询问用户选择模板
 * @param {string}项目名称
 */
async function chooseTemplate(projectName) {
  new Inquirer.prompt([
    {
      name: "template",
      // 多选交互功能
      // 单选将这里修改为 list 即可
      type: "list",
      message: "Check the features needed for your project:",
      choices: ["vue", "react"],
    },
  ]).then(async ({ template }) => {
    loading("正在拉取项目，请耐心等待", downTemplate, template, projectName);
    successCallback(projectName);
  });
}
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

async function loading(message, fn, ...args) {
  const spinner = ora(message);
  spinner.start(); // 开启加载
  try {
    fn(...args);
    // 加载成功
    spinner.succeed();
  } catch (error) {
    /* // 加载失败
    spinner.fail("request fail, refetching");
    await sleep(1000);
    // 重新拉取
    return loading(message, fn, ...args); */
    console.log(error);
  }
}

module.exports = {
  handleFolderExist,
  chooseTemplate,
  loading,
};
