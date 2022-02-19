const componentPage = () => import(/* webpackChunkName: "componentPage" */ '@/views/componentPage')
const index = () => import(/* webpackChunkName: "index" */ '@/views/index')
const indexExcel = () => import(/* webpackChunkName: "indexExcel" */ '@/views/index/excel')
const indexListId = () => import(/* webpackChunkName: "indexListId" */ '@/views/index/list/_id')
const indexListIdArticle = () => import(/* webpackChunkName: "indexListIdArticle" */ '@/views/index/list/_id/article')
const indexListIdComment = () => import(/* webpackChunkName: "indexListIdComment" */ '@/views/index/list/_id/comment')
const indexTable = () => import(/* webpackChunkName: "indexTable" */ '@/views/index/table')
const indexUpload = () => import(/* webpackChunkName: "indexUpload" */ '@/views/index/upload')
const login = () => import(/* webpackChunkName: "login" */ '@/views/login')
const system = () => import(/* webpackChunkName: "system" */ '@/views/system')
export default [
  {
    name: 'componentPage',
    path: '/componentPage',
    component: componentPage
  },
  {
    name: 'login',
    path: '/login',
    component: login
  },
  {
    name: 'system',
    path: '/system',
    component: system
  },
  {
    name: 'index',
    path: '/',
    component: index,
    children: [
      {
        name: 'index-excel',
        path: 'excel',
        component: indexExcel
      },
      {
        name: 'index-table',
        path: 'table',
        component: indexTable
      },
      {
        name: 'index-upload',
        path: 'upload',
        component: indexUpload
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
