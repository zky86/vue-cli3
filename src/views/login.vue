<template>
  <div class="login-page">
    <div class="p1th">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop>
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop>
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn mt20">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import * as api from '@/api'
import * as api from '../api/index'
export default {
  data () {
    return {
      ruleForm: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [{ required: true, message: '请输入', trigger: 'blur' }],
        password: [{ required: true, message: '请输入', trigger: 'blur' }]
      }
    }
  },
  created () {},

  mounted () {},

  methods: {
    login () {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          const data = {
            userName: this.ruleForm.userName,
            password: this.ruleForm.password
          }
          const ret = await api.auth.login(data)
          if (ret.code === 1) {
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            this.$router.push({
              name: 'system',
              query: { token: ret.data.token }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.login-page {
  .p1th {
    width: 50%;
    margin: 0 auto;
    padding-top: 150px;
    .btn {
      text-align: center;
    }
  }
}
</style>
