<template>
  <div class="system-page">
    组件测试：

    <br />
    <br />
    <component-test ref="calcForm" v-model="foo" @on-price="onPrice" :head.sync="head" size='mini'>
      <template slot-scope="user">
        slog
        {{user.data}}
      </template>
        <!-- slog -->
    </component-test>
    <br />
    <br />
    <el-button type="primary"  @click="dataClick">head.sync 回传给父组件值</el-button>
  </div>
</template>

<script>
import 'nprogress/nprogress.css'
import componentTest from './#componentTest.vue'
export default {
  components: {
    componentTest
  },
  data () {
    return {
      foo: '123',
      head: '456'
    }
  },
  created () {},

  mounted () {
    console.log(this.$refs.calcForm)
  },

  methods: {
    onPrice (data) {
      console.log(data)
    },
    dataClick () {
      console.log(this.head)
    }
  }
}
</script>

<style lang="scss">
.system-page {

}
</style>
