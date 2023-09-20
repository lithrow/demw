<template>
  <div class="home">
    <el-form ref="instance" class="form" :model="formData" :rules="rules">
      <div class="title">电商后台管理平台</div>
      <el-form-item prop="username">
        <el-input :prefix-icon="User" v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input  :prefix-icon="Lock" v-model="formData.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <div class="btn-box">
          <el-button type="primary" @click="submit">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import { userLogin } from '../utils/api'
import { useRouter } from 'vue-router'
const router = useRouter()
const formData= reactive({
  username: '',
  password: ''
})

const rules = reactive({
  username: [
    { required: true,  message: '用户名不能为空', trigger: 'blur' },
    { min: 3, max: 10, message: '账号在3～10个字符之间', trigger: 'blur'}
  ],
  password: [
    { required: true, min: 3, max: 10, message: '密码不能为空', trigger: 'blur' }
  ]
})

const instance = ref()

const submit = () => {
  instance.value.validate(valid => {
    if(valid) {
      userLogin(formData).then(res => {
        // console.log(res)
        if(res.meta.status === 200) {
          localStorage.setItem('token', res.data.token)
          router.push('/about')
        }
      })
    }
  })
}

const reset = () => {
  // console.log(instance.value)
  instance.value.resetFields()
}

</script>

<style lang="scss" scoped>
.home {
  background-color: #385374;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form {
  padding: 20px;
  width: 450px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px #fff; 
}
.title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.btn-box {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
</style>

