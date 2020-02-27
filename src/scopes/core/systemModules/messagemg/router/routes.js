import routesContainer from '@/common/components/routesContainer'

import recordMg from '../modulePart/record/routes'

const innerRoutes = [
  ...recordMg
]

// 导入路由声明
export default [
  {
    path: '/',
    component: routesContainer,
    children: innerRoutes.map((item) => ({
      ...item
    }))
  }
]
