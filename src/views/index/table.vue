<template>
  <div v-loading="loading" class="card" element-loading-text="玩命加载中...">
    <div class="p1th">
      <!-- 封装表格 -->
      <c-table
        :page-size="pageSize"
        ref="table"
        :api="api"
        :fields="fields"
        @before-fetch="handleBeforeFetch"
        :columns="columns"
      >
        <el-button type="primary" slot="operate" @click="addFn">新增用户</el-button>
        <el-table-column sortable slot="timestamp" prop="timestamp" label="预定时间" width="200">
          <template slot-scope="scope">{{[scope.row.timestamp, '{y}-{m}-{d}'] | formatTime}}</template>
        </el-table-column>
        <el-table-column sortable slot="updateTime" prop="updateTime" label="发布时间">
          <template slot-scope="scope">{{[scope.row.updateTime, '{y}-{m}-{d}'] | formatTime}}</template>
        </el-table-column>
        <el-table-column slot="operation" label="操作" width="260">
          <template slot-scope="scope">
            <el-button @click="check(scope.$index,scope.row)" size="small">查看</el-button>
            <el-button @click="edit(scope.$index,scope.row)" size="small">修改</el-button>
            <el-button type="primary" size="mini" @click="remove(scope)">删除</el-button>
          </template>
        </el-table-column>
      </c-table>
    </div>

    <!-- 原生区域 -->
    <div class="p2th" style="padding:50px 0;display:none">
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="filters.username" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="filters.date"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
            :picker-options="$utils.pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class @click="handleSearch">搜索</el-button>
          <el-button type="primary" class @click="addFn">新增用户</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData" class="mt20">
        <el-table-column prop="username" sortable label="姓名" width="200"></el-table-column>
        <el-table-column prop="phone" sortable label="电话" width="200"></el-table-column>
        <el-table-column prop="timestamp" sortable label="预定时间" width="200">
          <template slot-scope="scope">{{[scope.row.timestamp, '{y}-{m}-{d}'] | formatTime}}</template>
        </el-table-column>
        <el-table-column sortable label="发布时间" prop="updateTime">
          <template slot-scope="scope">{{[scope.row.updateTime, '{y}-{m}-{d}'] | formatTime}}</template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="260">
          <template slot-scope="scope">
            <el-button @click="check(scope.$index,scope.row)" size="small">查看</el-button>
            <el-button @click="edit(scope.$index,scope.row)" size="small">修改</el-button>
            <el-popover placement="top" :ref="`pop-${scope.$index}`" width="160">
              <p>确定删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button
                  size="mini"
                  type="text"
                  @click="scope._self.$refs[`pop-${scope.$index}`].doClose()"
                >取消</el-button>
                <el-button type="primary" size="mini" @click="del(scope)">确定</el-button>
              </div>
              <el-button slot="reference" type="primary" style="margin-left:15px" size="small">删除</el-button>
            </el-popover>
            <!-- <el-button type="primary" @click="del(scope.$index,scope.row)" size="small">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
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
        <el-form-item label="时间" prop="phone">
          <el-date-picker
            v-model="addFilters.timestamp"
            type="date"
            value-format="timestamp"
            placeholder="选择日期"
          ></el-date-picker>
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
import CTable from '@/components/CTable.vue'
export default {
  components: {
    CTable
  },
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
        username: null,
        date: []
      },
      addFilters: {
        username: '',
        password: '',
        phone: '',
        timestamp: ''
      },
      rules: {
        username: [{ required: true, message: '请输入', trigger: 'blur' }],
        password: [],
        phone: []
      },
      api: p => api.user.getList(p),
      // 表单区域
      fields: [
        {
          prop: 'username',
          placeholder: '请输入姓名',
          clearable: true
        },
        // {
        //   prop: 'status',
        //   placeholder: '状态',
        //   component: 'select',
        //   clearable: true,
        //   filterable: true,
        //   options: [
        //     {
        //       label: '开启',
        //       value: '0'
        //     },
        //     {
        //       label: '关闭',
        //       value: '1'
        //     }
        //   ]
        // },
        {
          prop: 'date',
          placeholder: '日期',
          component: 'date-picker',
          type: 'daterange',
          rangeSeparator: '至',
          startPlaceholder: '开始时间',
          endPlaceholder: '结束时间',
          valueFormat: 'timestamp'
        }
      ],
      // 表格
      columns: [
        { prop: 'username', label: '姓名', width: '', sortable: 'sortable' },
        { prop: 'phone', label: '电话', width: '', sortable: 'sortable' },
        { slot: 'timestamp', sortable: 'sortable' },
        { slot: 'updateTime', sortable: 'sortable' },
        { slot: 'operation', sortable: 'sortable' }
      ]
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
        date: this.filters.date,
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
        // scope._self.$refs[`pop-${scope.$index}`].doClose()
        this.handleSearch()
        this.$refs.table.reload()
      }
    },

    remove (scope) {
      this.$_confirm({
        operateText: '删除',
        name: scope.row.username,
        operate: async () => {
          const data = {
            _id: scope.row._id
          }
          return await api.user.delUser(data)
        },
        callback: res => {
          console.log(res)
          res.success && this.$refs.table.data.splice(scope.$index, 1)
        }
      })
    },

    async addFn () {
      this.dialogVisible = true
    },
    confirm (formName) {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          this.loading = true
          const ret = await api.user.addUser(this.addFilters)
          if (ret.code === 1) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.$refs.ruleForm.resetFields()
            this.loading = false
            this.dialogVisible = false
            this.handleSearch()
            this.$refs.table.reload()
          }
        } else {
          this.$message.error('请按提示补充完整信息...')
          return false
        }
      })
    },

    handleBeforeFetch (params) {
      // console.log(params)
      // if (params.date) {
      //   const {
      //     date: [startTime, endTime]
      //   } = params
      //   params.startTime = startTime
      //   params.endTime = endTime
      //   delete params.date
      // }
    }
  }
}
</script>

<style lang="scss">
.p1th {
}
</style>
