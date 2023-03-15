let options = {}
let question = {
  projectName: [
    {
      name: 'projectName',
      type: 'input',
      default: 'projectName',
      message: '请输入项目目录',
    },
  ],
  package: [
    {
      name: 'package',
      type: 'list',
      default: 'pnpm',
      message: '请选择包管理器',
      choices:['npm','yarn','pnpm']
    },
  ],
  frame: [
    {
      name: 'frame',
      // 多选交互功能
      // 单选将这里修改为 list 即可
      type: 'list',
      message: 'Check the frame needed for your project:',
      choices: ['vue', 'react'],
    },
  ],
  overWrite: [
    {
      name: 'isOverwrite',
      type: 'list',
      message: '已存在目标文件夹，是否覆盖',
      choices: [
        { name: '覆盖', value: true },
        { name: '取消', value: false },
      ],
    },
  ],
  features: [
    {
      name: 'features',
      type: 'checkbox',
      message: 'Check the features needed for your project:',
      choices: options.frame=='vue'?['prettier', 'eslint','cesium','element']:['prettier', 'eslint','cesium','antd','unocss'],
    },
  ],
}
module.exports = { question, options}