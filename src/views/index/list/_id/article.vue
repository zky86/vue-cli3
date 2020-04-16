<template>
  <div v-loading="loading" element-loading-text="玩命加载中..." >
    <div class="p1th mt20" >
      <h3>文章列表</h3>
      <el-table :data="tableData" class="mt20">
        <el-table-column prop="title" sortable label="标题"></el-table-column>
        <el-table-column prop="timer" sortable label="发布时间"></el-table-column>
      </el-table>
    </div>
    <!--工具条-->
    <el-col :span="24" class="mt20">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        :total="total"
      ></el-pagination>
    </el-col>
  </div>
</template>

<script>
// import * as api from '@/api'
import * as api from '@/api'
export default {
  data () {
    return {
      loading: false,
      tableData: [],
      total: 0,
      page: 1,
      pageSize: 5
    }
  },
  created () {},

  mounted () {
    console.log(this.$store.state.global)
    this.handleSearch()
  },
  beforeRouteEnter (to, from, next) {
    // console.log(to.params.id)
    // const creatable = +to.params.id === 0
    // console.log(creatable)
    next(vm => {
      // console.log(vm)
    })
  },
  methods: {
    // 点击页码操作
    handleCurrentChange (val) {
      this.page = val
      this.search()
    },
    // 切换一页翻多少条数据
    handleSizeChange (val) {
      this.pageSize = val
      this.search()
    },
    handleSearch () {
      this.total = 0
      this.page = 1
      this.search()
    },
    async search () {
      const data = {
        pageSize: this.pageSize,
        page: this.page
      }
      this.loading = true
      const ret = await api.user.getArticle(data)
      this.loading = false
      if (ret.code === 1) {
        this.tableData = ret.data.list
        this.total = ret.data.total
      }
    }
  }
}
</script>

<style lang="scss">
.p1th {

}
</style>
