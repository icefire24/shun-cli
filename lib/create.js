const fs=require('fs-extra')
const path = require('path')
const Inquirer = require("inquirer");
const downloadGitRepo=require('download-git-repo')
const Util=require('util')
const {
  getZhuRongRepo,
  getTagsByRepo,
}=require("../api/index");
const ora = require('ora');
async function handleFolderExist (projectName, cmd) {
    console.log(projectName, cmd);
    let outdir = path.join(process.cwd(), projectName)
    if (fs.existsSync(outdir)) {
        if (cmd.force) {
            await fs.remove(outdir)                                             ``
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
            isOverwrite?await fs.remove(outdir):console.log(取消);
        }
    }
    
};


async function chooseTemplate(target) {
  let template = await getZhuRongRepo();
  let arr = template.map(val =>val.name)
  let repo=null
  new Inquirer.prompt([
    {
      name: "template",
      // 多选交互功能
      // 单选将这里修改为 list 即可
      type: "list",
      message: "Check the features needed for your project:",
      choices:arr,
    },
  ]).then(async ({ template }) => {
    repo=template
     let version = await getTagsByRepo(template)
    let arr=version.map(val=>val.name)
    new Inquirer.prompt([
      {
        name: "tag",
        type: "list",
        message: "Check the features needed for your project:",
        choices: arr,
      },
    ]).then(({tag}) => {
      download(repo,tag,target)
    });
  });
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
    let executeRes = await fn(...args);
    // 加载成功
    spinner.succeed();
    return executeRes;
  } catch (error) {
    // 加载失败
    spinner.fail("request fail, refetching");
    await sleep(1000);
    // 重新拉取
    return loading(message, fn, ...args);
  }
}

async function download(repo, tag,target) {
  // 模板下载地址
  const templateUrl = `zhurong-cli/${repo}${tag ? "#" + tag : ""}`;
  // 调用 downloadGitRepo 方法将对应模板下载到指定目录
  await loading(
    "downloading template, please wait",
    Util.promisify(downloadGitRepo),
    templateUrl,
    path.join(process.cwd(), target) // 项目创建位置
  );
}


module.exports = {
  handleFolderExist,
  chooseTemplate,
  loading
};