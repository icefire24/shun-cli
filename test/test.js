const prettier = require("prettier")
const fs = require("fs")
const code = fs.readFileSync("./package.json", "utf-8")
console.log(code);
const code2 = prettier.format(code, {
    parser: "babel",
    semi: false,
})
console.log(code2);