<template>
  <div>
    <div class="p1th">
      <h3>用户列表：</h3>
      <div class="list">123</div>
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
    this.$store.commit('login', this.$route.query.token)
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
  width: 90%;
  margin: 0 auto;
  padding: 20px 0;
}
</style>
