<template>
  <div>
    <div class="p1th">
      <h3>11</h3>
      <div class="list">123</div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
export default {
  beforeRouteEnter (to, from, next) {
    store.commit('login', to.query.token)
    next({ name: 'index-tabNav' })
    NProgress.done()
  },
  data () {
    return {
      ruleForm: {}
    }
  },
  created () {},

  mounted () {
  },

  methods: {
  }
}
</script>

<style lang="scss">
.p1th {
}
</style>
