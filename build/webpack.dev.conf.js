'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { VueLoaderPlugin } = require('vue-loader')
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true, extract: false })
  },
  performance: {
    maxAssetSize: 100000,
    hints: false
  },
  devtool: config.dev.devtool,
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, '404.html') }
      ]
    },
    hot: true,
    contentBase: false,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    openPage: 'login.html',
    index: 'login.html',
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true,
    watchOptions: {
      poll: config.dev.poll
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: 'static/css/[name].css',
    //   chunkFilename: 'static/css/[id].css'
    // }),
    // new CSSSplitWebpackPlugin({
    //   size: 3000,
    //   filename: 'static/css/[name]-[part].[ext]'
    // }),
    // new BundleAnalyzerPlugin({
    //   openAnalyzer: config.dev.autoOpenBrowserWithAnalyzer
    // }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      },
      // {
      //   from: path.resolve(__dirname, '../node_modules/less/dist/less.min.js'),
      //   to: config.dev.assetsSubDirectory + '/_less'
      // },
      // {
      //   from: path.resolve(__dirname, '../node_modules/css-vars-ponyfill/dist/css-vars-ponyfill.min.js'),
      //   to: config.dev.assetsSubDirectory + '/_less'
      // }
    ])
  ].concat(utils.htmlPlugin())// 添加html多模块打包出口
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      process.env.PORT = port
      devWebpackConfig.devServer.port = port
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`系统访问地址: http://${devWebpackConfig.devServer.host}:${port}`]
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})

console.error([
  '888888  db          dP88   dPYb     dP88',
  '  88   dPYb        dP 88  dP   Yb  dP 88',
  '  88  dP__Yb      d888888 Yb   dP d888888',
  '  88 dP    Yb         88   YbodP      88'
].join('\n'))
console.warn([
  '                   _ooOoo_',
  '                  o8888888o',
  '                  88" . "88',
  '                  (| -_- |)',
  '                  O\\  =  /O',
  "               ____/`---'\\____",
  "             .'  \\\\|     |//  `.",
  '            /  \\\\|||  :  |||//  \\',
  '           /  _||||| -:- |||||-  \\',
  '           |   | \\\\\\  -  /// |   |',
  "           | \\_|  ''\\---/''  |   |",
  '           \\  .-\\__  `-`  ___/-. /',
  "         ___`. .'  /--.--\\  `. . __",
  "      .\"\" '<  `.___\\_<|>_/___.'  >'\"\".",
  '     | | :  `- \\`.;`\\ _ /`;.`/ - ` : | |',
  '     \\  \\ `-.   \\_ __\\ /__ _/   .-` /  /',
  "======`-.____`-.___\\_____/___.-`____.-'======",
  "                   `=---='",
  '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',
  '         佛祖保佑       永无BUG'
].join('\n'))
