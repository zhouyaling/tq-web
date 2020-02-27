// import { Vue, store, taMixins } from 'common/js/public-ant.js'// 引入公共文件
import { store, taMixins, Vue } from 'common/js/public-ant-modules.js' // 引入模块化公共文件
import app from './formDesign.vue'
import components from './components/index'
Vue.use(components)
import {
    Switch,
    radio,
    select,
    colorPicker,
    inputNumber,
    checkbox
} from '@tq/ta404-ui'

Vue.use(Switch)
Vue.use(radio)
Vue.use(select)
Vue.use(colorPicker)
Vue.use(inputNumber)
Vue.use(checkbox)

// 把组件化页面挂载到节点app上
new Vue({
    mixins: [taMixins],
    render: h => h(app)
}).$mount('#app')