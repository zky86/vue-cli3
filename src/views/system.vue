<template>
  <div class="system-page">
    <div class="p1th">
      <h3>功能列表：</h3>
      <ul class="list">
        <li>
          <router-link :to="{ name: 'index-user'}">
            <el-button class="mt20" type="primary">上传功能</el-button>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
export default {
  beforeRouteEnter (to, from, next) {
    // 把token写入本地，全局通用
    store.commit('login', to.query.token)
    next(vm => {
      // 在内部获取不到外部的this，方法、变量等都获取不到。但是vm.XXXXX可以获取到
    })
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
  .p1th {
    padding: 50px;
    .list {
      li {
        margin-top: 20px;
      }
    }
  }
}
</style>
