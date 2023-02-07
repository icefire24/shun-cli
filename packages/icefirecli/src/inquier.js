const Inquirer = require('inquirer')
const { handleFolderExist } = require('./share')
const { options, question } = require('./constant')
async function createInquirer(question) {
  let answers = await Inquirer.prompt(question)
  Object.assign(options, answers)
  return Promise.resolve(answers)
}
const initQuestion = async function () {
  let { projectName } = await createInquirer(question.projectName)
  console.log('projectName: ', projectName)

  let isOverwrite = handleFolderExist(projectName)
  console.log('isOverwrite: ', isOverwrite)
  if (isOverwrite) {
    let { isOverwrite } = await createInquirer(question.overWrite)
    if (!isOverwrite) {
      return false
    } else {
      let package=await createInquirer(question.package)
      let frame = await createInquirer(question.frame)
      let features = await createInquirer(question.features)
      return true
    }
  } else {
    let package=await createInquirer(question.package)
    let frame = await createInquirer(question.frame)
    let features = await createInquirer(question.features)
    return true
  }
}

module.exports = { initQuestion, createInquirer }
