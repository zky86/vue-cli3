const list = () => import(/* webpackChunkName: "list" */ '@/views/list')
const login = () => import(/* webpackChunkName: "login" */ '@/views/login')
export default [
  {
    name: 'list',
    path: '/list',
    component: list
  },
  {
    name: 'login',
    path: '/login',
    component: login
  }
]
