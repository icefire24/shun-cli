const fs = require('fs-extra')
const path = require('path')
const { options } = require('./constant')
const copyTemplate = function () {
  let templatePath = path.resolve(__dirname, `../template/${options.frame}`)
  let destPath = path.resolve(process.cwd(), options.projectName)
  fs.copySync(
    templatePath,
    destPath,
    {
      overwrite: true,
      filter: getFilterFile,
    },
    (err) => {
      if (err) return console.error(err)
    }
  )
}
const getFilterFile = function () {
  let templatePath = path.resolve(process.cwd(), options.projectName)
  if (!options.features.includes('prettier')) {
    fs.remove(path.resolve(templatePath, '.prettierrc.js'))
  }
  if (!options.features.includes('eslint')) {
    fs.remove(path.resolve(templatePath, '.eslintrc.js'))
  }
  if (!options.features.includes('pinia')) {
    fs.remove(path.resolve(templatePath, 'store'))
  }
  return true
}
module.exports = { copyTemplate }
