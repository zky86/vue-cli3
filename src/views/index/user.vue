<template>
  <div v-loading="loading" element-loading-text="玩命加载中...">
    <div class="p1th mt20">
      <h3 class="mb20">用户列表：</h3>

      <el-upload
        ref="upload"
        class="upload-demo mb20"
        multiple
        action="string"
        list-type="picture-card"
        :http-request="UploadImage"
        :on-change="fileChange"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>

      <!-- 封装表格 -->
      <c-table
        :api="api"
        :fields="fields"
        style="padding-top:50px"
        @before-fetch="handleBeforeFetch"
        :columns="columns"
      >
        <el-table-column  sortable slot="timestamp"  label="预定时间" width="200">
          <template slot-scope="scope">{{[scope.row.timestamp, '{y}-{m}-{d}'] | formatTime}}</template>
        </el-table-column>
        <el-table-column sortable  slot="updateTime" label="发布时间" >
          <template slot-scope="scope">{{[scope.row.updateTime, '{y}-{m}-{d}'] | formatTime}}</template>
        </el-table-column>
        <el-table-column sortable slot="operation" label="操作" width="260">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.$index,scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </c-table>

      <el-form :inline="true" style="padding-top:50px">
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
      fileList: [],
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

      columns: [
        { prop: 'username', label: '姓名', width: '200', sortable: 'sortable' },
        { prop: 'phone', label: '电话', width: '200', sortable: 'sortable' },
        { slot: 'timestamp' },
        { slot: 'updateTime' },
        { slot: 'operation' }
      ],
      api: p => api.user.getList(p),
      fields: [
        {
          prop: 'username',
          placeholder: '请输入姓名',
          clearable: true
        },
        {
          prop: 'status',
          placeholder: '状态',
          component: 'select',
          clearable: true,
          filterable: true,
          options: [
            {
              label: '开启',
              value: '0'
            },
            {
              label: '关闭',
              value: '1'
            }
          ]
        },
        {
          prop: 'date',
          placeholder: '日期',
          component: 'date-picker',
          type: 'daterange',
          rangeSeparator: '至',
          startPlaceholder: '开始时间',
          endPlaceholder: '结束时间',
          valueFormat: 'yyyy-MM-dd'
        }
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
        scope._self.$refs[`pop-${scope.$index}`].doClose()
        this.handleSearch()
      }
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
    },
    handleAvatarSuccess (res, file) {
      console.log(res)
    },

    UploadImage (param) {
      const formData = new FormData()
      formData.append('file', param.file)
      api.common
        .upload(formData)
        .then(ret => {
          if (ret.code === 1) {
            param.onSuccess() // 上传成功的图片会显示绿色的对勾
            this.$message({
              message: '添加成功',
              type: 'success'
            })
          }
          // 但是我们上传成功了图片， fileList 里面的值却没有改变，还好有on-change指令可以使用
        })
        .catch(ret => {
          param.onError()
        })
    },
    fileChange (file) {
      this.$refs.upload.clearFiles() // 清除文件对象
      this.logo = file.raw // 取出上传文件的对象，在其它地方也可以使用
      this.fileList = [{ name: file.name, url: file.url }] // 重新手动赋值filstList， 免得自定义上传成功了, 而fileList并没有动态改变， 这样每次都是上传一个对象
    },

    handleBeforeFetch (params) {
      // console.log(params)
      if (params.date) {
        const {
          date: [startTime, endTime]
        } = params
        params.startTime = startTime
        params.endTime = endTime
        delete params.date
      }
    }
  }
}
</script>

<style lang="scss">
.p1th {
}
</style>
