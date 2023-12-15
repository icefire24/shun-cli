let options = {}
let question = {
  projectName: [
    {
      name: 'projectName',
      type: 'text',
      initial: 'projectName',
      message: '请输入项目目录',
    },
  ],
  package: [
    {
      name: 'package',
      type: 'select',
      default: 'pnpm',
      message: '请选择包管理器',
      choices: [
        { title: 'pnpm', value: 'pnpm' },
        { title: 'npm', value: 'npm' },
        { title: 'yarn', value: 'yarn' },
      ]
    },
  ],
  frame: [
    {
      name: 'frame',
      type: 'select',
      message: 'Check the frame needed for your project:',
      choices: [
        { title: 'vue', value: 'vue' },
        { title: 'react', value: 'react' },

      ],
      onSubmit: (prompt, answer) => {
        options.frame = answer
      }
    },
  ],
  overWrite: [
    {
      name: 'isOverwrite',
      type: 'select',
      message: '已存在目标文件夹，是否覆盖',
      choices: [
        { title: '覆盖', value: true },
        { title: '取消', value: false },
      ],
    },
  ],
  features: [
    {
      name: 'features',
      type: 'multiselect',
      message: 'Check the features needed for your project:',
      choices: options.frame == 'vue' ? [
        { title: 'prettier', value: 'prettier' },
        { title: 'eslint', value: 'eslint' },
        { title: 'cesium', value: 'cesium' },
        { title: 'element', value: 'element' },
        { title: 'unocss', value: 'unocss' },
        { title: 'pinia', value: 'pinia' },
      ] : [
        { title: 'prettier', value: 'prettier' },
        { title: 'eslint', value: 'eslint' },
        { title: 'cesium', value: 'cesium' },
        { title: 'antd', value: 'antd' },
        { title: 'unocss', value: 'unocss' }
      ],
    },
  ],
}
module.exports = { question, options }