// import { Vue, store, taMixins } from 'common/js/public-ant.js'// 引入公共文件
import { Vue, store, taMixins } from 'common/js/public-ant-modules.js' // 引入模块化公共文件
import router from './router/index' // 引入 改模块的路由模块
import {
    table,
    drawer,
    tabs,
    select,
    collapse,
    pagination,
    list,
    divider
} from '@tq/ta404-ui'

Vue.use(table)
Vue.use(drawer)
Vue.use(tabs)
Vue.use(select)
Vue.use(collapse)
Vue.use(pagination)
Vue.use(list)
Vue.use(divider)
    // 把组件化页面挂载到节点app上
new Vue({
    mixins: [taMixins],
    router,
    store
}).$mount('#app')