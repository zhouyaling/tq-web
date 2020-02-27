'use strict'
const path = require('path')
const config = require('../config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const packageConfig = require('../package.json')
const faceConfig = require('../faceConfig.js')
const theme = require('../src/style/theme/index')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap,
      plugins: {
        plugins: [
          require('autoprefixer')({
            browsers: ['last 2 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie> 8']
          })
        ]
      }
    }

  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      // return [MiniCssExtractPlugin.loader].concat(loaders)
      return [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../'
        }
      }].concat(loaders)
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  function generateLessResourceLoader() {
    let defaultTheme
    if (faceConfig.defaultTheme && faceConfig.defaultTheme.length > 0) {
      defaultTheme = faceConfig.defaultTheme
    }
    const loaders = [
      cssLoader,
      postcssLoader,
      {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true,
          modifyVars: defaultTheme ? theme(defaultTheme) : {}
        }
      },
      {
        loader: 'sass-resources-loader',
        options: {
          // it need a absolute path
          resources: [path.resolve(__dirname, '../src/common/less/index.less')]
        }
      }

    ]
    if (options.extract) {
      return [MiniCssExtractPlugin.loader].concat(loaders)
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLessResourceLoader(),
    sass: generateLoaders(),
    scss: generateLoaders(),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus'),
    js: [
      {
        loader: 'babel-loader',
        options: config.babel
      }
    ]
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

// 添加多模块处理

const glob = require('glob')
// 页面模板
const HtmlWebpackPlugin = require('html-webpack-plugin')// 使用webpack多入口页面生成插件
// 取得相应的页面路径，因为之前的配置，所以是src文件夹下的pages文件夹
// const PAGE_PATH = path.resolve(__dirname, '../src/pages')
// const PRO_PAGE_PATH = path.resolve(__dirname, '../src/project-pages')
// 用于做相应的merge处理
const merge = require('webpack-merge')

const PAGES_PATH = []
faceConfig.coreModules.forEach(function (item) {
  PAGES_PATH.push(path.resolve(__dirname, '../src/scopes/core/' + item))
})
faceConfig.projectModules.forEach(function (item) {
  PAGES_PATH.push(path.resolve(__dirname, '../src/scopes/project/' + item))
})

// 待删除
faceConfig.docModule.forEach(function (item) {
  PAGES_PATH.push(path.resolve(__dirname, '../src/' + item))
})

// 多入口配置
// 通过glob模块读取pages文件夹下的所有对应文件夹下的js后缀文件，如果该文件存在
// 那么就作为入口处理
exports.entries = function () {
  let entryFiles = []
  PAGES_PATH.forEach(function (item) {
    entryFiles = entryFiles.concat(glob.sync(item + '/*.js'))
  })
  const map = {}
  entryFiles.forEach((filePath) => {
    const filename = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.'))
    map[filename] = ['@babel/polyfill', filePath]
  })
  return map
}

// 多页面输出配置
// 与上面的多页面入口配置相同，读取pages文件夹下的对应的html后缀文件，然后放入数组中
exports.htmlPlugin = function () {
  let entryHtml = []
  PAGES_PATH.forEach(function (item) {
    entryHtml = entryHtml.concat(glob.sync(item + '/*.html'))
  })
  const arr = []
  entryHtml.forEach((filePath) => {
    const filename = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.'))
    let conf = {
      // 模板来源
      template: filePath,
      // 文件名称
      filename: filename + '.html',
      // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
      chunks: ['manifest', 'vendor', 'common', filename],
      inject: true,
      inlineSource: 'runtime~.+\\.js'
      // 配置title的图标
      // favicon: path.resolve('')
    }
    if (process.env.NODE_ENV === 'production') {
      conf = merge(conf, {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        chunksSortMode: 'auto'
      })
    }
    arr.push(new HtmlWebpackPlugin(conf))
  })
  return arr
}
