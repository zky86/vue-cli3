<template>
  <div>
    <div class="p1th mt20">
      <h3>评论列表：</h3>
      <div class="list ">222</div>
    </div>
  </div>
</template>

<script>
// import * as api from '@/api'
import * as api from '@/api'
export default {
  data () {
    return {
      ruleForm: {}
    }
  },
  created () {},

  mounted () {
    // console.log(this.$route.query.token)
    // this.$store.commit('login', this.$route.query.token)

    this.getList()
  },

  methods: {
    async getList () {
      const data = {}
      const ret = await api.menu.getList(data)
      // console.log(ret)
    }
  }
}
</script>

<style lang="scss">
.p1th {

}
</style>
