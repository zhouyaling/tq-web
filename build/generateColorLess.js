#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const { generateTheme } = require('antd-theme-generator')
const { vars } = require('../config/themeVariables')

if (!fs.existsSync(path.resolve('static/_less'))) {
    fs.mkdirSync(path.resolve('static/_less'))
}

const options = {
    stylesDir: path.join(__dirname, '../src'), // 指向src即可
    antdStylesDir: path.join(__dirname, '../node_modules/@tq/ta404-ui/es'), // 指向src即可：此目录下的所有less文件都会被处理
    varFile: path.join(__dirname, '../node_modules/@tq/ta404-ui/es/style/themes/default.less'), // 指向默认less文件：变量等声明
    mainLessFile: path.join(__dirname, '../src/style/index.less'), // 指向默认index.less：注意：在编译中会对此文件进行解析，若没有在此文件或子文件中引入的less样式则不会被改变主题色
    themeVariables: vars, // 需要进行颜色改变的变量定义
    outputFilePath: path.join(__dirname, '../static/_less/color.less') // 默认输出less文件
}

generateTheme(options).then(css => {
    // 处理用于vue文件的scoped变量
    const varFile = fs.readFileSync(path.join(__dirname, '../src/style/var.less')).toString()

    fs.writeFileSync(path.join(__dirname, '../static/_less/color.less'), css + '\n' + varFile)
})