<template>
  <div>
    <div class="p1th mt20">

      <el-form :inline="true">
        <el-form-item>
          当前用户：<span class="fb mr10">{{this.$store.state.global.current_info.username}}</span>
        </el-form-item>
        <el-form-item>
          <router-link :to="{ name:'index-table'}"><el-button type="primary" >返回用户列表</el-button></router-link>
        </el-form-item>
      </el-form>

      <el-menu mode="horizontal" :default-active="$route.name">
        <template v-for="(item, index) in navs">
          <el-menu-item :key="index" :index="item.name" @click.native="onClick(item)">{{item.label}}</el-menu-item>
        </template>
      </el-menu>

      <keep-alive>
        <router-view  v-if="keepAlive()"></router-view>
      </keep-alive>
      <router-view v-if="!keepAlive()"></router-view>

    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      loading: false,
      navs: [
        {
          label: '文章列表',
          name: 'index-list-id-article'
        },
        {
          label: '评论列表',
          name: 'index-list-id-comment'
        }
      ]

    }
  },

  created () {
    this.navs.forEach(n => {
      n.params = this.$route.params
      n.children &&
        n.children.forEach(c => {
          c.params = this.$route.params
        })
    })
    // console.log(this.navs)
  },

  mounted () {
    // console.log(this.$route.name)
  },

  methods: {
    onClick (item) {
      let type
      if (item.name === 'index-list-id-article') {
        type = 'article'
      } else {
        type = 'comment'
      }
      this.$router.push({ name: item.name, params: item.params, query: { type: type } })
    },
    findNav (navs, name) {
      for (const nav of navs) {
        if (nav.name === name) {
          return nav
        } else if (nav.children && nav.children.length > 0) {
          const _nav = this.findNav(nav.children, name)
          if (_nav) {
            return _nav
          }
        }
      }
      return false
    },
    keepAlive () {
      const { keepAlive } = this.findNav(this.navs, this.$route.name)
      return keepAlive
    }
  }
}
</script>

<style lang="scss">
</style>
