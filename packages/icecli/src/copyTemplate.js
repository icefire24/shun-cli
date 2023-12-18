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
const getFilterFile = function (src, dest) {
  let templatePath = path.resolve(process.cwd(), options.projectName)
  if (!options.features.includes('prettier') && src.includes('.prettierrc.js')) {
    return false;
  }
  if (!options.features.includes('eslint') && src.includes('.eslintrc.js')) {
    return false;
  }
  
  if (!options.features.includes('pinia') && src.includes('store')) {
    return false;
  }
  
  
  
  return true;
}
module.exports = { copyTemplate }
