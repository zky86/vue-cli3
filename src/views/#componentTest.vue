<template>
  <div>
    <slot :data="data"></slot>
    子组件内容:{{value}}
    <br />
    <br />
    <el-button v-bind="$attrs" type="primary" @click="dataClick">v-model 回调测试</el-button>
    <el-button v-bind="$attrs" type="primary" @click="dataClickHead">head.sync 回调测试</el-button>
  </div>
</template>

<script>

export default {
  name: 'com',
  props: {
    value: {
      type: String,
      required: true
    },
    head: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      data: ['zhangsan', 'lisi', 'wanwu', 'zhaoliu', 'tianqi', 'xiaoba']
    }
  },
  created () {
    console.log(this.value)
    console.log(this.head)
  },

  mounted () {
  },

  methods: {
    dataClick () {
      this.$emit('on-price', { obj: '1' })
    },
    dataClickHead () {
      this.$emit('update:head', '789')
    }
  }
}
</script>

<style lang="scss">

</style>
