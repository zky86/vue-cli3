<template>
  <div v-loading="loading" class="card" element-loading-text="玩命加载中...">
    <div class="p1th mt20">
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
        <div slot="tip" class="el-upload__tip"></div>
      </el-upload>
    </div>
  </div>
</template>

<script>
import * as api from '@/api'
export default {
  components: {},
  data () {
    return {
      loading: false,
      fileList: []
    }
  },
  created () {},

  mounted () {},

  methods: {

    UploadImage (param) {
      const formData = new FormData()
      formData.append('file', param.file)
      api.common
        .uploadExcel(formData)
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
    }
  }
}
</script>

<style lang="scss">
</style>
