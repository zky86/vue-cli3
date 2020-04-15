<template>
  <div v-loading="loading" element-loading-text="玩命加载中...">
    <div class="p1th mt20">
      <h3 class="mb20">用户列表：</h3>
      <el-form :inline="true" >
          <el-form-item>
            <el-input v-model="filters.username" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class=""  @click="handleSearch" >搜索</el-button>
            <el-button type="primary" class=""  @click="add" >新增用户</el-button>
          </el-form-item>
      </el-form>

      <el-table :data="tableData" class="mt20">
        <el-table-column prop="username" sortable label="姓名" width="180"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="check(scope.$index,scope.row)" size="small">查看</el-button>
            <el-button type="primary"  @click="del(scope.$index,scope.row)" size="small">删除</el-button>
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
      pageSize: 10,
      filters: {
        username: null
      }
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
        username: this.filters.username,
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
      this.$router.push(`/list/${item ? item.id : 0}/article`)
    },
    async del (key, item) {
      const data = {
        _id: item._id
      }
      this.loading = true
      const ret = await api.user.delUser(data)
      if (ret.code === 1) {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.handleSearch()
      }
    },
    add () {

    }
  }
}
</script>

<style lang="scss">
.p1th {
}
</style>
