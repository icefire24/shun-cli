const ejs =require("ejs")
const path =require("path")
const fs = require("fs-extra")
const { options } = require("./constant")
const rendFile = [
    "package.json",
]
const render=function (handlePath){
    let filepath=path.resolve(process.cwd(),options.projectName,handlePath)
    let fileInfo=path.parse(filepath)
    let readFilePath=path.resolve(fileInfo.dir,`${fileInfo.name}.ejs`)
    let code=fs.readFileSync(readFilePath,"utf-8")
    // let outputFilePath=path.join(fileInfo.dir,fileInfo.name)
    let renderCode= ejs.render(code,options)
    fs.writeFileSync(filepath,renderCode)
    fs.removeSync(readFilePath)
    
}
function renderFile() {
    rendFile.forEach((item) => {
        render(item)
    })
}
module.exports={renderFile}