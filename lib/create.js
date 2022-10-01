const fs=require('fs-extra')
const path = require('path')
const Inquirer = require("inquirer");

module.exports = async function (projectName, cmd) {
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