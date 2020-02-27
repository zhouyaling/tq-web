import routesContainer from '@/common/components/routesContainer'

//模块part 声明导入
import onlineCode from "../modulePart/onlineCode/routes"

const innerRoutes = [
    ...onlineCode,
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
