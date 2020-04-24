const index = () => import(/* webpackChunkName: "index" */ '@/views/index')
const indexListId = () => import(/* webpackChunkName: "indexListId" */ '@/views/index/list/_id')
const indexListIdArticle = () => import(/* webpackChunkName: "indexListIdArticle" */ '@/views/index/list/_id/article')
const indexListIdComment = () => import(/* webpackChunkName: "indexListIdComment" */ '@/views/index/list/_id/comment')
const indexUseBackup = () => import(/* webpackChunkName: "indexUseBackup" */ '@/views/index/use-backup')
const indexUser = () => import(/* webpackChunkName: "indexUser" */ '@/views/index/user')
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
        name: 'index-use-backup',
        path: 'use-backup',
        component: indexUseBackup
      },
      {
        name: 'index-user',
        path: 'user',
        component: indexUser
      },
      {
        name: 'index-list-id',
        path: 'list/:id?',
        component: indexListId,
        children: [
          {
            name: 'index-list-id-article',
            path: 'article',
            component: indexListIdArticle
          },
          {
            name: 'index-list-id-comment',
            path: 'comment',
            component: indexListIdComment
          }
        ]
      }
    ]
  }
]
