const Inquirer = require('inquirer')
const prompts = require('prompts')
const { handleFolderExist } = require('./share')
const { options, question } = require('./constant')
async function createInquirer(question) {
  let answers = await prompts(question)
  Object.assign(options, answers)
  return Promise.resolve(answers)
}
const initQuestion = async function () {
  let { projectName } = await createInquirer(question.projectName)
  let isOverwrite = handleFolderExist(projectName)
  if (isOverwrite) {
    let { isOverwrite } = await createInquirer(question.overWrite)
    if (!isOverwrite) {
      return false
    }
  }
  let packages = await createInquirer(question.package)
  let frame = await createInquirer(question.frame)
  let features = await createInquirer(
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
        { title: 'pinia', value: 'pinia' }
      ] : [
        { title: 'prettier', value: 'prettier' },
        { title: 'eslint', value: 'eslint' },
        { title: 'cesium', value: 'cesium' },
        { title: 'antd', value: 'antd' },
        { title: 'unocss', value: 'unocss' },
      ],
    },
  )
  return true
}

module.exports = { initQuestion, createInquirer }
