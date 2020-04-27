<template>
  <div class="system-page">
    <div class="p1th">
      <h3 class="f18">功能列表：</h3>
      <ul class="list">
        <router-link :to="{ name: 'index-upload'}">
          <li>上传文件</li>
        </router-link>

        <router-link :to="{ name: 'index-table'}">
          <li>table组件封装</li>
        </router-link>
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
    if (to.query.token) {
      store.commit('login', to.query.token)
    }
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
      a {
        text-decoration: none;
      }
      li {
        margin-top: 25px;
        width: 200px;
        height: 40px;
        line-height: 40px;
        background-color: #f67161;
        color: #fff;
        text-align: center;
        &:hover {
          background-color: #f88d81;
        }
      }
    }
  }
}
</style>
