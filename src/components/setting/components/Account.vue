<template>
  <div style="height: 30px;"></div>
  <h2>基本信息</h2>
  <div>
    <h4>账号ID</h4>
    <p>safd</p>
  </div>
  <div>
    <h4>用户名</h4>
    <p>safd</p>
  </div>
  <div>
    <h4>邮箱</h4>
    <p>949135640@qq.com</p>
  </div>
  <div id="hr-division-line"/>
  <h2 style="margin: 40px 0;">密码重置</h2>
  <el-form ref="passwordRef" :model="password" class="demo-form-inline"
           :rules="pwdRules" :hide-required-asterisk="true">
    <el-form-item label="原密码" prop="originalPwd">
      <el-input v-model="password.originalPwd" show-password/>
    </el-form-item>
    <el-form-item label="新密码" prop="newPwd">
      <el-input v-model="password.newPwd" show-password/>
    </el-form-item>
    <el-form-item label="重复新密码" prop="confirmNewPwd">
      <el-input v-model="password.confirmNewPwd" show-password/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">确认</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {syncScrypt} from "scrypt-js";
import buffer from "buffer";
import {ElMessage} from "element-plus";

export default {
  name: "Account",
  data() {
    return {
      password: {
        originalPwd: '',
        newPwd: '',
        confirmNewPwd: ''
      },
      pwdRules: {
        // 密码验证,8-16位且同时包含数字和字母
        originalPwd: [
          {required: true, message: '输入不能为空', trigger: 'blur'},
          {min: 8, max: 16, message: '密码长度应在8-16位之间', trigger: 'blur'},
          {validator: this.passwordValidator, trigger: 'blur'},
        ],
        newPwd: [
          {required: true, message: '输入不能为空', trigger: 'blur'},
          {min: 8, max: 16, message: '密码长度应在8-16位之间', trigger: 'blur'},
          {validator: this.passwordValidator, trigger: 'blur'},
        ],
        confirmNewPwd: [
          {required: true, message: '输入不能为空', trigger: 'blur'},
          {min: 8, max: 16, message: '密码长度应在8-16位之间', trigger: 'blur'},
          {validator: this.confirmPasswordValidator, trigger: 'blur'},
        ]
      }
    }
  },
  methods:{
    async submit(){
      await this.$refs.passwordRef.validate((valid, invalidFields) => {
        if (valid) {
          let passwordScrypt = syncScrypt(new buffer.SlowBuffer(this.registerForm.password.normalize('NFKC')),
              new buffer.SlowBuffer("105gjc".normalize('NFKC')), 1024, 8, 1, 64)
          let passwordScryptStr = ''
          for (let i = 0; i < passwordScrypt.length; ++i)
            passwordScryptStr += String.fromCharCode(passwordScrypt[i])
          let registerInfo = {
            username: this.registerForm.username,
            password: passwordScryptStr,
            email: this.registerForm.email
          }
          this.$request.post('/user/register', registerInfo).then(() => {
            ElMessage.success('Register success!')
            this.changeMode()
          }).catch((response) => {
            ElMessage.error('Register Failed!\n' + response.msg)
          })
        } else {
          console.log(invalidFields)
        }
      })
    },
    passwordValidator(rule, value, callback) {
      if (!value.match(/^(?![a-zA-z]+$)(?!d+ $)(?!@#$%^&*]+ $)(?![a-zA-z\d]+ $)(?![a zA-z!@#$%^&*]+$)(?![d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/))
        return callback(new Error('密码应且只应同时包含英文字符和数字'))
      if (this.mode === 'register')
        return this.$refs.registerFormRef.validateField('confirmPassword', () => null)
      return callback()
    },
    confirmPasswordValidator(rule, value, callback) {
      if (value !== this.password.newPwd)
        return callback(new Error('两次输入的密码不匹配'))
      return callback()
    },
  }
}
</script>

<style scoped>

h4, p {
  display: inline-block;
  margin: 15px 0;
}

h4{
  width: 100px;
}

#hr-division-line {
  margin: 20px 0;
  height: 1px;
  background-image: -webkit-linear-gradient(bottom left, rgb(225, 94, 145) 30%, rgb(115, 204, 255) 50%);
}

:deep(label){
  justify-content: left;
  width: 100px;
}

:deep(.el-input){
  width: 300px;
}

</style>