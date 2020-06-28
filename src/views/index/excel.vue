<template>
  <div v-loading="loading" class="card" element-loading-text="玩命加载中...">
    <div class="p1th mt20">
      <!-- :http-request="UploadImage" -->
      <el-upload
        ref="upload"
        class="upload-demo mb20"
        multiple
        action="http://localhost:8080/common/uploadExcel"
        :before-upload="beforeUpload"
        :on-success="handleSuccess"
        accept="xls, xlsx"
        :data="importData"
        :file-list="fileList"
        :headers = "headers"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip"></div>
      </el-upload>

      <div style="padding-top:30px">
        <el-button type="primary" size="mini" @click="downloadExcel">下载数据</el-button>
        <el-button type="primary" size="mini" @click="delFn">清空数据</el-button>
      </div>

    </div>

    <div class="p2th" style="padding-top:20px">
      <h3>表格内容</h3>
      <c-table
        @after-fetch="afterFetch"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        ref="table"
        :api="api"
        :fields="[]"
        :columns="columns"
      >
        <el-table-column sortable slot="updateTime" prop="updateTime" label="发布时间">
          <template slot-scope="scope">{{[scope.row.updateTime, '{y}-{m}-{d}'] | formatTime}}</template>
        </el-table-column>
      </c-table>
    </div>
  </div>
</template>

<script>
import * as api from '@/api'
import store from '@/store'
import CTable from '@/components/CTable.vue'
import ExportJsonExcel from 'js-export-excel'
export default {
  components: {
    CTable
  },
  data () {
    return {
      loading: false,
      fileList: [],
      importData: {
      },
      // eslint-disable-next-line vue/no-dupe-keys
      loading: false,
      dialogVisible: false,
      tableData: [],
      api: p => api.user.getExcel(p),
      filters: {
        username: null,
        date: []
      },
      // 表格
      columns: [
        { prop: 'number', label: '序列号', width: '', sortable: 'sortable' },
        { prop: 'time', label: '时间', width: '', sortable: 'sortable' },
        { prop: 'order', label: '序号', width: '', sortable: 'sortable' },
        { prop: 'name', label: '姓名', width: '', sortable: 'sortable' },
        { prop: 'ic_card', label: '身份证', width: '', sortable: 'sortable' },
        { prop: 'phone', label: '电话', width: '', sortable: 'sortable' },
        { prop: 'status', label: '状态', width: '', sortable: 'sortable' },
        { prop: 'remark', label: '备注', width: '', sortable: 'sortable' },
        { slot: 'updateTime', sortable: 'sortable' }
      ]
    }
  },
  computed: {
    headers() {
      return {
        Authorization:`${store.state.token}`
      }
    }
  },
  created () {},

  mounted () {},

  methods: {
    beforeUpload (file) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'xls'
      const extension2 = testmsg === 'xlsx'
      // const isLt2M = file.size / 1024 / 1024 < 10
      if (!extension && !extension2) {
        this.$message({
          message: '上传文件只能是 xls、xlsx格式！',
          type: 'error'
        })
      }
      // if (!isLt2M) {
      //   this.$message({
      //     message: '上传文件大小不能超过 10MB!',
      //     type: 'warning'
      //   })
      // }
      // return (extension || extension2) && isLt2M
      return extension || extension2
    },
    afterFetch (data) {
      this.tableData = data
    },

    // 下载数据
    downloadExcel () {
      const data = this.tableData // 表格数据
      var option = {}
      const dataTable = []
      if (data) {
        for (const i in data) {
          if (data) {
            const obj = {
              // eslint-disable-next-line quote-props
              序列号: data[i].number,
              // eslint-disable-next-line quote-props
              时间: data[i].time,
              // eslint-disable-next-line quote-props
              序号: data[i].order,
              // eslint-disable-next-line quote-props
              姓名: data[i].name,
              // eslint-disable-next-line quote-props
              身份证: data[i].ic_card,
              // eslint-disable-next-line quote-props
              电话: data[i].phone,
              // eslint-disable-next-line quote-props
              状态: data[i].status,
              // eslint-disable-next-line quote-props
              备注: data[i].remark
            }
            dataTable.push(obj)
          }
        }
      }
      option.fileName = '用户信息'
      option.datas = [
        {
          sheetData: dataTable,
          sheetName: 'sheet',
          sheetFilter: [
            '序列号',
            '时间',
            '序号',
            '姓名',
            '身份证',
            '电话',
            '状态',
            '备注'
          ],
          sheetHeader: [
            '序列号',
            '时间',
            '序号',
            '姓名',
            '身份证',
            '电话',
            '状态',
            '备注'
          ]
        }
      ]
      var toExcel = new ExportJsonExcel(option)
      toExcel.saveExcel()
    },

    // 删除数据
    delFn (file) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log(1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {})
    },

    handleSuccess (res, file) {
      // 刷新页面
      this.$refs.table.fetch()
    }
  }
}
</script>

<style lang="scss">
</style>
