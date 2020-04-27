<template>
  <div class="system-page">
  </div>
</template>

<script>
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
export default {
  beforeRouteEnter (to, from, next) {
    // 把token写入本地，全局通用
    if (to.query.token) {
      store.commit('login', to.query.token)
    }
    next({ name: 'index-upload' })
    // next(vm => {
    //   // 在内部获取不到外部的this，方法、变量等都获取不到。但是vm.XXXXX可以获取到
    // })
    NProgress.done()
  },
  data () {
    return {}
  },
  created () {},

  mounted () {},

  methods: {}
}
</script>

<style lang="scss">
.system-page {

}
</style>
