const login = () => import(/* webpackChunkName: "login" */ '@/views/login')
export default [
  {
    name: 'login',
    path: '/login',
    component: login
  }
]
