<template>
  <div v-loading="loading" element-loading-text="玩命加载中...">
    <div class="p1th mt20">
      <h3>用户列表：</h3>
      <el-table :data="tableData" class="mt20">
        <el-table-column prop="username" sortable label="姓名" width="180"></el-table-column>
        <el-table-column align="center" sortable label="操作">
          <template slot-scope="scope">
            <div @click="check(scope.$index,scope.row)">查看</div>
          </template>
        </el-table-column>
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
      pageIndex: 1,
      pageSize: 10
    }
  },
  created () {},

  mounted () {
    this.handleSearch()
  },

  methods: {
    // 点击页码操作
    handleCurrentChange (val) {
      this.pageIndex = val
      this.search()
    },
    // 切换一页翻多少条数据
    handleSizeChange (val) {
      this.pageSize = val
      this.search()
    },
    handleSearch () {
      this.total = 0
      this.pageIndex = 1
      this.search()
    },
    async search () {
      const data = {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex
      }
      this.loading = true
      const ret = await api.user.getList(data)
      console.log(ret)
      this.loading = false
      if (ret.code === 1) {
        this.tableData = ret.data.list
        this.total = ret.data.total
      }
    },
    check (key, item) {
      console.log(item)
      this.$router.push(`/list/${item ? item.id : 0}/article`)
    }
  }
}
</script>

<style lang="scss">
.p1th {
}
</style>
