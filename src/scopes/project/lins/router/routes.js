import routesContainer from '@/common/components/routesContainer'

import preentry from "../preentry/routes"

const innerRoutes = [
  ...preentry
]
//导入路由声明
export default [
  {
    path: '/',
    component: routesContainer,
    children: innerRoutes.map((item) => ({
        ...item,
      })
    ),
  },
]
