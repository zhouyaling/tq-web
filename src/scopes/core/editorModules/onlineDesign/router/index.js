import Vue from 'vue'// 引入vue
import VueRouter from 'vue-router'// 引入vue路由支持

// 使用注册使用路由
Vue.use(VueRouter)

// 定义该模块的路由
const router = new VueRouter({
  routes: [
    { path: '/', component: () => import('../onlineDesign.vue')},
    { path: '/editorPreview', component: () => import('../editorPart/editorPreview.vue') }
  ]
})

// 导出该模块路由
export default router
