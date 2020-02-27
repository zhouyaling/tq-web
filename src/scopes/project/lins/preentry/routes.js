//导出该模块路由
export default [
  {
    title: "人员",
    name: "preentry",
    path: 'preentry',
    component: () => import("./preentry.vue")
  },
  {
    title: "修改",
    name: "editEmployeeView",
    path: 'editEmployeeView',
    component: () => import("./part/editEmployeeView.vue")
  }
]

