'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path')
const faceConfig = require('../faceConfig.js')
let targetUrl = faceConfig.devServer
process.env.RUN_ENV == 'mock' && (targetUrl = 'http://localhost:36742/')
    // 动态设置代理路径
const proxyTable = {}
const pathRewrite = {}
if (process.env.RUN_ENV == 'mock' || process.env.RUN_ENV == 'server') {
    pathRewrite['^' + faceConfig.basePath] = '/'
    proxyTable[faceConfig.basePath] = {
        target: targetUrl,
        changeOrigin: true,
        pathRewrite: {
            ...pathRewrite
        }
    }
} else {
    // proxyTable=false
}
module.exports = {
    dev: {
        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        imgPublicPath: '',
        proxyTable: proxyTable,
        // Various Dev Server settings
        host: '0.0.0.0', // can be overwritten by process.env.HOST
        port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
        autoOpenBrowserWithAnalyzer: false,

        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: true
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: '',
        assetsPublicPath: '',
        imgPublicPath: '',

        /**
         * Source Maps
         */

        productionSourceMap: false,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

        bundleAnalyzerReport: process.env.npm_config_report
    },

    babel: {
        compact: false,
        presets: [
            [
                '@babel/preset-env',
                {
                    useBuiltIns: 'entry',
                    corejs: { version: 2, proposals: true },
                    forceAllTransforms: true,
                    targets: {
                        chrome: '58',
                        ie: '9'
                    }
                }
            ]
        ],
        plugins: [
            'transform-vue-jsx', ['import', { libraryName: '@tq/ta404-ui', libraryDirectory: 'es', style: true }],
            '@babel/plugin-transform-arrow-functions',
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-syntax-import-meta',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-json-strings', [
                '@babel/plugin-proposal-decorators',
                {
                    legacy: true
                }
            ],
            '@babel/plugin-proposal-function-sent',
            '@babel/plugin-proposal-export-namespace-from',
            '@babel/plugin-proposal-numeric-separator',
            '@babel/plugin-proposal-throw-expressions'
        ]
    }
}