<template>
  <div class="layout">
    <aside class="aside">
      <div class="f16 title">功能列表：</div>
      <ul class="list">
        <router-link v-for="(item, index) in nav" :key="index" :to="{ name: item.name}">
          <li>{{item.txt}}</li>
        </router-link>

        <!-- <router-link :to="{ name: 'index-table'}">
          <li>table组件封装</li>
        </router-link>
        <router-link :to="{ name: 'index-upload'}">
          <li>上传文件</li>
        </router-link>
        <router-link :to="{ name: 'index-upload'}">
          <li>上传Excel写入数据库</li>
        </router-link>
        <router-link :to="{ name: 'index-upload'}">
          <li>爬虫抓取数据</li>
        </router-link>-->
      </ul>
    </aside>
    <section>
      <main>
        <h1 class="index-nav">{{routerName}}</h1>
        <router-view class="view" />
      </main>
    </section>
  </div>
</template>

<script>
// import * as api from '@/api'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 在内部获取不到外部的this，方法、变量等都获取不到。但是vm.XXXXX可以获取到
      const arr = vm.nav.find((v) => v.name === vm.$route.name)
      vm.routerName = arr.txt
    })
    NProgress.done()
  },
  data () {
    return {
      routerName: null,
      nav: [
        {
          name: 'index-table',
          txt: 'table组件封装'
        },
        {
          name: 'index-upload',
          txt: '上传文件'
        },
        {
          name: 'index-excel',
          txt: '上传Excel写入数据库'
        }
        // {
        //   name: 'index-upload',
        //   txt: '爬虫抓取数据'
        // }
      ]
    }
  },
  watch: {
    $route (to, from) {
      const arr = this.nav.find((v) => v.name === this.$route.name)
      this.routerName = arr.txt
    }
  },
  created () {},

  mounted () {},

  methods: {}
}
</script>

<style lang="scss">
.layout {
  > aside {
    position: fixed;
    top: 0px;
    bottom: 0;
    left: 0;
    z-index: 1;
    min-width: 220px;
    max-width: 220px;
    padding: 24px 0 72px;
    background-color: #fff;
    box-shadow: 0 8px 12px #ebedf0;
    transition: $transition;
    &.collapse {
      width: $aside-width--collapse;
      > header span {
        display: none;
      }
      + section {
        margin-left: $aside-width--collapse;
        width: calc(100% - #{$aside-width--collapse});
        > header {
          left: if($header-fixed, $aside-width--collapse, 0);
          > i {
            transform: rotate(180deg);
          }
        }
      }
    }
    .title {
      padding: 0 0 20px 20px;
    }

    .list {
      a {
        text-decoration: none;
      }
      li {
        display: block;
        margin: 0;
        padding: 8px 0 8px 30px;
        color: #333;
        font-size: 14px;
        line-height: 28px;
        -webkit-transition: color 0.2s;
        transition: color 0.2s;
        &:hover {
          color: #f67161;
          display: block;
          margin: 0;
          padding: 8px 0 8px 30px;
          font-size: 14px;
          line-height: 28px;
          -webkit-transition: color 0.2s;
          transition: color 0.2s;
        }
      }
      .router-link-active {
        li{
          color: #f67161;
        }
      }
    }
  }
  > section {
    padding: 20px 30px 30px 30px;
    overflow: hidden;
    width: calc(100% - #{$aside-width-padding});
    margin-left: $aside-width;
    min-height: 100vh;
    transition: $transition;
    > header {
      height: $header-height;
      padding: 0 $padding-horizontal;
      border-bottom: 1px solid $color-border;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: if($header-fixed, fixed, relative);
      top: 0;
      left: if($header-fixed, $aside-width, 0);
      right: 0;
      z-index: 2000;
      transition: $transition;
      .el-icon-arrow-down {
        margin-left: 4px;
      }
    }
    > main {
      margin-top: if($header-fixed, $header-height, 0);
    }
    .card {
      margin-bottom: 24px;
      padding: 24px;
      background-color: #fff;
      border-radius: 12px;
      box-shadow: 0 8px 12px #ebedf0;
    }
    .index-nav {
      margin: 0 0 30px;
      font-size: 30px;
      cursor: default;
      font-weight: normal;
    }
  }
}
</style>
