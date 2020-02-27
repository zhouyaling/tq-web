// import { Vue, store, taMixins } from 'common/js/public-ant.js'// 引入公共文件
import { store, taMixins, Vue } from 'common/js/public-ant-modules.js' // 引入模块化公共文件
import router from './router/index' // 引入 改模块的路由模块
import moduleStore from './store/store'

import {
    tabs,
    upload,
    menu,
    inputNumber,
    slider,
    Switch,
    select
} from '@tq/ta404-ui'

Vue.use(tabs)
Vue.use(upload)
Vue.use(menu)
Vue.use(inputNumber)
Vue.use(slider)
Vue.use(Switch)
Vue.use(select)

store.registerModule('online', moduleStore)

// 把组件化页面挂载到节点app上
window._Vue = new Vue({
    mixins: [taMixins],
    router,
    store
}).$mount('#app')