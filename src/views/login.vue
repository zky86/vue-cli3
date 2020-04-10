<template>
  <div>
    <div class="p1th">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="">
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn mt20"><el-button type="primary" @click="login">登录</el-button></div>
    </div>
  </div>
</template>

<script>
// import * as api from '@/api'
import * as api from '../api/index'
// const response = await api.auth.sso(payload)
console.log(api)
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
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const data = {
            userName: this.ruleForm.userName,
            password: this.ruleForm.password
          }
          const ret = api.auth.login(data)
          console.log(ret)
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
.p1th{
  width: 50%;
  margin: 0 auto;
  padding: 100px 0;
  .btn{
    text-align: center;

  }
}
</style>
