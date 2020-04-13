const index = () => import(/* webpackChunkName: "index" */ '@/views/index')
const indexArticle = () => import(/* webpackChunkName: "indexArticle" */ '@/views/index/article')
const indexList = () => import(/* webpackChunkName: "indexList" */ '@/views/index/list')
const indexTabNav = () => import(/* webpackChunkName: "indexTabNav" */ '@/views/index/tabNav')
const loginstate = () => import(/* webpackChunkName: "loginstate" */ '@/views/login_state')
const login = () => import(/* webpackChunkName: "login" */ '@/views/login')
export default [
  {
    name: 'login',
    path: '/login',
    component: login
  },
  {
    name: 'login_state',
    path: '/login_state',
    component: loginstate
  },
  {
    name: 'index',
    path: '/',
    component: index,
    children: [
      {
        name: 'index-article',
        path: 'article',
        component: indexArticle
      },
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
