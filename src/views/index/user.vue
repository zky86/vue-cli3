<template>
  <div v-loading="loading" element-loading-text="玩命加载中...">
    <div class="p1th mt20">
      <h3 class="mb20">用户列表：</h3>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="filters.username" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class @click="handleSearch">搜索</el-button>
          <el-button type="primary" class @click="add">新增用户</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData" class="mt20">
        <el-table-column prop="username" sortable label="姓名" width="200"></el-table-column>
        <el-table-column prop="phone" sortable label="电话" width="200"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="check(scope.$index,scope.row)" size="small">查看</el-button>
            <el-button @click="edit(scope.$index,scope.row)" size="small">修改</el-button>
            <el-popover
              placement="top"
              :ref="`pop-${scope.$index}`"
              width="160"
            >
              <p>确定删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="scope._self.$refs[`pop-${scope.$index}`].doClose()">取消</el-button>
                <el-button type="primary" size="mini" @click="del(scope)">确定</el-button>
              </div>
              <el-button slot="reference" type="primary" style="margin-left:15px" size="small">删除</el-button>
            </el-popover>
            <!-- <el-button type="primary" @click="del(scope.$index,scope.row)" size="small">删除</el-button> -->
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

    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
      <el-form
        :rules="rules"
        ref="ruleForm"
        :model="addFilters"
        label-width="80px"
        style="width:93%"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addFilters.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addFilters.password"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="addFilters.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import * as api from '@/api'
import * as types from '@/store/mutation-types'
import * as api from '@/api'
import commonMixin from '@/mixin/commonMixin'
export default {
  mixins: [commonMixin],
  data () {
    return {
      loading: false,
      dialogVisible: false,
      tableData: [],
      total: 0,
      pageIndex: 1,
      pageSize: 10,
      filters: {
        username: null
      },
      addFilters: {
        username: '',
        password: '',
        phone: ''
      },
      rules: {
        username: [{ required: true, message: '请输入', trigger: 'blur' }],
        password: [],
        phone: []
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
      this.loading = false
      if (ret.code === 1) {
        this.tableData = ret.data.list
        this.total = ret.data.total
      }
    },
    check (key, item) {
      this.$store.commit(types.RECORD_GLOBAL_CURRENT_INFO, item)
      this.$router.push(`/list/${item ? item._id : 0}/article`)
    },

    edit (key, item) {
      this.dialogVisible = true
      const arr = JSON.parse(JSON.stringify(item))
      this.addFilters = arr
    },

    async del (scope) {
      console.log(scope)
      const data = {
        _id: scope.row._id
      }
      this.loading = true
      const ret = await api.user.delUser(data)
      this.loading = false
      if (ret.code === 1) {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        scope._self.$refs[`pop-${scope.$index}`].doClose()
        this.handleSearch()
      }
    },
    async add () {
      this.dialogVisible = true
    },
    confirm (formName) {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          this.loading = true
          const ret = await api.user.addUser(this.addFilters)
          if (ret.code === 1) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.$refs.ruleForm.resetFields()
            this.loading = false
            this.dialogVisible = false
            this.handleSearch()
          }
        } else {
          this.$message.error('请按提示补充完整信息...')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.p1th {
}
</style>
