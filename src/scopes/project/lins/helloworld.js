import { Vue, store, taMixins } from 'common/js/public-ant.js' // 引入公共文件
import router from './router/index' // 引入 改模块的路由模块
import tagSelect from '@tq/ta404-ui/dist/tagSelect/tagSelect.js'
import popover from '@tq/ta404-ui/dist/popover/popover.js'

// 自己引入各种插件
Vue.use(tagSelect);
// 把组件化页面挂载到节点app上
new Vue({
    mixins: [taMixins],
    router,
    store
}).$mount('#app');



Vue.use(popover);