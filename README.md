# ta404-ui-cli.

## 框架介绍

ta404前端开发框架plus版本,集成框架系统管理,页面登录,权限管理等功能

> 注:如需使用简洁版请联系研发中心相关人员.

## 使用教程

[前端文档戳这里](http://114.116.130.110:8085/docs/#/docs/components/icon-cn/)


## 目录结构
├─.babelrc                   #babel配置
 ├─.eslintrc.js               #eslint规范
 ├─faceConfig.json            #开发相关的配置项
 ├─net.js                     #mockServer监听文件
 ├─package.json               #包管理文件
 ├─README.md                  #项目介绍
 │
 ├─build                       #打包配置目录
 │      build.js               #打包生产页面的脚本
 │      check-versions.js      #检测版本
 │      utils.js               #构建工具类
 │      vue-loader.conf.js     #vue-loader配置
 │      webpack.base.conf.js   #webpack基础配置
 │      webpack.dev.conf.js    #webpack开发环境配置
 │      webpack.prod.conf.js   #webpack生产环境配置
 │
 ├─config                      #打包环境配置
 │      dev.env.js             #开发环境变量配置
 │      index.js               #项目打包配置
 │      prod.env.js            #生产环境配置
 │
 ├─devGuide                    #开发指引
 │
 ├─src                         #项目资源主目录
 │  ├─common                   #公共文件
 │  │  ├─css                   #公用css文档
 │  │  ├─js                    #公用js文档
 │  │  ├─scss                  #公用scss文档
 │  │  └─store                 #store文档
 │  │
 │  ├─corePage                 #框架基础页面文件
 │  │  │
 │  │  ├─index                 #首页
 │  │  │
 │  │  ├─login                 #登录页
 │  │  │
 │  │  └─worktable             #工作台页面
 │  │
 │  ├─demoPage                 #框架提供的示例页面目录
 │  │
 │  ├─projectCommon            #预留的项目公共资源目录,包括公用的js、scss、components等
 │  │
 │  └─scopes                   #功能模块顶层目录
 │     │
 │     ├─core                  #框架模块的顶层目录
 │     │
 │     └─project               #预留的项目开发的顶层目录
 │
 └─static                      #静态依赖的主目录，打包时，该目录下资源会不做特殊处理，copy到输出目录


### 快速启动

```
# 下载依赖
npm install

# 快速启动 localhost:8080
npm run dev

# 打包(完整)
npm run build








