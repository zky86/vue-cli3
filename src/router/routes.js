const index = () => import(/* webpackChunkName: "index" */ '@/views/index')
const indexList = () => import(/* webpackChunkName: "indexList" */ '@/views/index/list')
const indexTabNav = () => import(/* webpackChunkName: "indexTabNav" */ '@/views/index/tabNav')
const login = () => import(/* webpackChunkName: "login" */ '@/views/login')
export default [
  {
    name: 'login',
    path: '/login',
    component: login
  },
  {
    name: 'index',
    path: '/',
    component: index,
    children: [
      {
        name: 'index-list',
        path: 'list',
        component: indexList
      },
      {
        name: 'index-tabNav',
        path: 'tabNav',
        component: indexTabNav
      }
    ]
  }
]
