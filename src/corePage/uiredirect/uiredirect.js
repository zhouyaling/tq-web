import '../../common/js/util/ieCompatibility'
import { store, taMixins, Vue } from '@/common/js/public-ant-modules.js' // 引入模块化公共文件
import app from './uiredirect.vue' // 引入.vue页面模块

import {

} from '@tq/ta404-ui'

// 把组件化页面挂载到节点app上
new Vue({
    render: h => h(app)
}).$mount('#uiredirectapp')