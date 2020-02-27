import Vue from 'vue'

// -----------工具类 start-----------------------------------
// 模块化引入Base的工具，只需要引入需要的内容

// 码表工具
import collectionUtil from '@tq/ta404-ui/es/utils/js/collectionUtil'
// cookie处理工具
import cookieUtil from '@tq/ta404-ui/es/utils/js/cookie.util'
// 跨域处理工具
import '@tq/ta404-ui/es/utils/js/crossDomain'
// 下载工具
import downloadFile from '@tq/ta404-ui/es/utils/js/downloadFile'
// dom处理工具
import elementUtil from '@tq/ta404-ui/es/utils/js/element.util'
// 系统信息获取工具
import systemInfo from '@tq/ta404-ui/es/utils/js/environment'
// 表单提交工具
import formUtil from '@tq/ta404-ui/es/utils/js/form.util'
// 打印工具
import getLodop from '@tq/ta404-ui/es/utils/js/LodopFuncs'
// 日期处理工具
import momentUtil from '@tq/ta404-ui/es/utils/js/moment.util'
// 对象处理工具
import objectUtil from '@tq/ta404-ui/es/utils/js/object.util'
// 拼音过滤工具
import pinyin from '@tq/ta404-ui/es/utils/js/pinyin'
// 排序工具
import sorter from '@tq/ta404-ui/es/utils/js/sorter'
// url处理工具
import urlUtil from '@tq/ta404-ui/es/utils/js/url.util'
// 缓存处理工具
import webStorage from '@tq/ta404-ui/es/utils/js/webStorage'
// 各种弹出框工具
import windowUtil from '@tq/ta404-ui/es/utils/js/window.util'
// 加密工具
import encryption from '@tq/ta404-ui/es/utils/js/encryption/index'
// -----------工具类 end-----------------------------------

// -----------组件 start----------------------------------
// 模块化引入组件
// 通过下面这样引入的组件，可以自动引入组件js以及样式文件（css或less）
// 注意：引入的组件名称区分大小写（比如colorPicker对应：@tq/ta404-ui/es/color-picker）。
import {
    // 常用组件
    affix,
    anchor,
    autoComplete,
    avatar,
    backTop,
    badge,
    borderLayout,
    breadcrumb,
    button,
    calendar,
    card,
    colorPicker,
    carousel,
    cascader,
    checkbox,
    col,
    collapse,
    comment,
    configProvider,
    containerMask,
    datePicker,
    divider,
    drawer,
    dropdown,
    form,
    icon,
    input,
    inputNumber,
    labelCon,
    layout,
    list,
    localeProvider,
    menu,
    message,
    modal,
    notification,
    pagination,
    popconfirm,
    popoverEx,
    progress,
    radio,
    rate,
    row,
    select,
    skeleton,
    slider,
    spin,
    steps,
    Switch,
    table,
    tableEdit,
    tabs,
    tag,
    timeline,
    timePicker,
    tooltip,
    transfer,
    treeSelect,
    upload,
    // 不常用组件
    carefulDelete,
    echarts,
    richEditor,
    simpleUploader,
    w2uiDatagrid,
    searchPanel,
    sensitiveInput,
    userInput,
    userSelect,
    tagSelect,
    pageTool,
    eTree
} from '@tq/ta404-ui'

const util = {
        ...collectionUtil,
        ...cookieUtil,
        downloadFile,
        ...elementUtil,
        systemInfo,
        ...formUtil,
        getLodop,
        ...momentUtil,
        ...objectUtil,
        pinyin,
        ...sorter,
        ...urlUtil,
        webStorage,
        ...windowUtil,
        encryption
    }
    // 使用Vue注册模块
    // 每个页面仅需要注册需要的模块即可

// 注册常用组件
Vue.use(affix)
Vue.use(alert)
Vue.use(anchor)
Vue.use(cascader)
Vue.use(tag)
Vue.use(autoComplete)
Vue.use(avatar)
Vue.use(backTop)
Vue.use(badge)
Vue.use(borderLayout)
Vue.use(breadcrumb)
Vue.use(button)
Vue.use(popoverEx)
Vue.use(labelCon)
Vue.use(calendar)
Vue.use(card)
Vue.use(carousel)
Vue.use(checkbox)
Vue.use(col)
Vue.use(collapse)
Vue.use(colorPicker)
Vue.use(comment)
Vue.use(configProvider)
Vue.use(containerMask)
Vue.use(datePicker)
Vue.use(divider)
Vue.use(drawer)
Vue.use(dropdown)
Vue.use(eTree)
Vue.use(form)
Vue.use(icon)
Vue.use(input)
Vue.use(inputNumber)
Vue.use(layout)
Vue.use(list)
Vue.use(localeProvider)
Vue.use(menu)
Vue.use(message)
Vue.use(modal)
Vue.use(notification)
Vue.use(pagination)
Vue.use(popconfirm)
Vue.use(progress)
Vue.use(radio)
Vue.use(rate)
Vue.use(row)
Vue.use(select)
Vue.use(skeleton)
Vue.use(slider)
Vue.use(spin)
Vue.use(steps)
Vue.use(Switch)
Vue.use(table)
Vue.use(tableEdit)
Vue.use(tableOperate)
Vue.use(tabs)
Vue.use(timePicker)
Vue.use(timeline)
Vue.use(tooltip)
Vue.use(transfer)
Vue.use(treeSelect)
Vue.use(upload)
    // 注册不常用组件
Vue.use(carefulDelete)
Vue.use(echarts)
Vue.use(richEditor)
Vue.use(simpleUploader)
Vue.use(w2uiDatagrid)
Vue.use(searchPanel)
Vue.use(sensitiveInput)
Vue.use(userInput)
Vue.use(userSelect)
Vue.use(tagSelect)
Vue.use(pageTool)
Vue.use(eTree)

// 注册工具到上Base
Vue.prototype.Base = {
    // 工具类
    ...util,
    // 蒙层
    ...containerMask.$mask
}
Vue.prototype.$message = message
Vue.prototype.$info = modal.info
Vue.prototype.$success = modal.success
Vue.prototype.$error = modal.error
Vue.prototype.$warning = modal.warning
Vue.prototype.$confirm = modal.confirm
Vue.prototype.$notification = notification
window.message = message
window.notification = notification
window.Modal = modal
window.Spin = spin
window.Base = Vue.prototype.Base