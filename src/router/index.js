import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import routes from './routes'
NProgress.configure({
  showSpinner: false
})
Vue.use(VueRouter)
// routes.find(x => x.path === '/').redirect = '/login'
const router = new VueRouter({
  // routes: process.env.NODE_ENV === 'production' ? routes.filter(x => x.children === undefined) : routes
  routes: routes
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})
export default router
