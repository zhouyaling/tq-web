'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: utils.entries,
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        chunkFilename: 'chunk/[name].js',
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue: 'vue/dist/vue.js',
            '@': resolve('src'),
            // 添加读取路径
            pages: resolve('src/pages'),
            common: resolve('src/common'),
            faceConfig: resolve('faceConfig.js'),
            '@common': resolve('src/common'),
            '@projectCommon': resolve('src/projectCommon')
        },
        modules: [
            'node_modules',
            'node_modules/@yh'
        ]
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'),
                    resolve('test'),
                    resolve('node_modules/webpack-dev-server/client'),
                    resolve('node_modules/vue-echarts-v3/src'),
                    resolve('.'), resolve('node_modules/@tq/ta404-ui'),
                    resolve('node_modules/element-ui'),
                    resolve('node_modules/vue')
                ],
                exclude: [resolve('build'), resolve('config'), resolve('devGuide')],
                options: config.babel
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 100,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]'),
                    publicPath: process.env.NODE_ENV === 'production' ?
                        config.build.imgPublicPath : config.dev.imgPublicPath
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: 'async',
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                },
                vendor: {
                    name: 'chunks-vendor',
                    test: (module) => {
                        var context = module.context
                        return context && (context.indexOf('node_modules') >= 0)
                    },
                    priority: 10,
                    chunks: 'initial', // 只打包初始时依赖的第三方
                    reuseExistingChunk: true
                },
                vendor1: {
                    name: 'chunks-vendor1',
                    reuseExistingChunk: true,
                    test: (module) => {
                        var context = module.context
                        return context && (
                            (context.indexOf('vue-router') >= 0) ||
                            (context.indexOf('vue-bus') >= 0) ||
                            (context.indexOf('vue-grid-layout') >= 0) ||
                            (context.indexOf('vue-cookies') >= 0) ||
                            (context.indexOf('vue-codemirror-lite') >= 0) ||
                            (context.indexOf('pretty') >= 0) ||
                            (context.indexOf('codemirror') >= 0) ||
                            (context.indexOf('@tinymce/tinymce-vue') >= 0) ||
                            (context.indexOf('classnames') >= 0)
                        )
                    },
                    priority: 11,
                    chunks: 'async' // 只打包初始时依赖的第三方
                },
                ta404: {
                    name: 'chunk-ta404', // 单独将 @tq/ta404-ui 拆包
                    reuseExistingChunk: true,
                    priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
                    test: (module) => {
                        var context = module.context
                        return context &&
                            (context.indexOf('@yh') >= 0)
                    }
                },
                moment: {
                    name: 'chunk-moment', // 单独将 @tq/ta404-ui 拆包
                    priority: 21, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
                    chunks: 'all',
                    reuseExistingChunk: true,
                    test: (module) => {
                        var context = module.context
                        return context && (context.indexOf('moment') >= 0)
                    }
                },
                echarts: {
                    name: 'chunk-echarts', // 单独将 @tq/ta404-ui 拆包
                    priority: 21, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
                    chunks: 'all',
                    reuseExistingChunk: true,
                    test: (module) => {
                        var context = module.context
                        return context && (context.indexOf('echarts') >= 0)
                    }
                }
            }
        }
    },
    plugins: [
        new CaseSensitivePathsPlugin()
    ],
    node: {
        setImmediate: false,
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}