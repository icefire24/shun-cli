const fs = require('fs-extra')

const copyTemplate = function (src, dest) {
  fs.copy(src, dest, (err) => {
    if (err) console.log(err)
  })
}
const rmFile = function (src) {
    fs.remove(src)
}
module.exports = { copyTemplate }
