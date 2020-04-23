<template>
  <div v-loading="loading" element-loading-text="玩命加载中...">
    <div class="p1th mt20">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" size="small" @click="addFn">新增文章</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData">
        <el-table-column prop="title" sortable label="标题"></el-table-column>
        <el-table-column prop="summary" sortable label="内容"></el-table-column>
        <el-table-column prop="updateTime" sortable label="发布时间">
          <template slot-scope="scope">
            {{[scope.row.updateTime, '{y}-{m}-{d}'] | formatTime}}
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
      <el-form :rules="rules" ref="form" :model="form" label-width="80px" style="width:93%">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="summary">
          <el-input type="textarea" :rows="6" v-model="form.summary"></el-input>
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
import * as api from '@/api'
export default {
  data () {
    return {
      type: this.$route.query.type || 'article',
      dialogVisible: false,
      loading: false,
      tableData: [],
      total: 0,
      pageIndex: 1,
      pageSize: 10,
      form: {
        title: '',
        summary: '',
        user_id: '',
        type: this.$route.query.type || 'article'
      },
      rules: {
        title: [{ required: true, message: '请输入', trigger: 'blur' }],
        summary: []
      }
    }
  },
  created () {},

  mounted () {
    // console.log(this.$store.state.global)
  },
  beforeRouteEnter (to, from, next) {
    // const creatable = +to.params.id === 0
    // console.log(creatable)
    // console.log(vm)
    next(vm => {
      vm.$nextTick(() => {
        vm.form.user_id = to.params.id
        vm.handleSearch()
      })
    })
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
        pageIndex: this.pageIndex,
        user_id: this.form.user_id,
        type: this.type
      }
      this.loading = true
      const ret = await api.article.getList(data)
      this.loading = false
      if (ret.code === 1) {
        this.tableData = ret.data.list
        this.total = ret.data.total
      }
    },

    confirm (formName) {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true
          const ret = await api.article.add(this.form)
          if (ret.code === 1) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.$refs.form.resetFields()
            this.loading = false
            this.dialogVisible = false
            this.handleSearch()
          }
        } else {
          this.$message.error('请按提示补充完整信息...')
          return false
        }
      })
    },

    addFn () {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss">
.p1th {
}
</style>
