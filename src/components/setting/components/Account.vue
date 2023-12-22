<template>
  <div style="height: 30px;"></div>
  <h2>基本信息</h2>
  <div>
    <h4>账号ID</h4>
    <p>{{ userInfo.userId }}</p>
  </div>
  <div>
    <h4>用户名</h4>
    <p>{{ userInfo.username }}</p>
  </div>
  <div>
    <h4>邮箱</h4>
    <p>{{ userInfo.email }}</p>
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
    <div id="button-frame">
      <el-button type="primary" @click="submit()">确认</el-button>
    </div>
  </el-form>
</template>

<script>
import {syncScrypt} from "scrypt-js";
import buffer from "buffer";
import {ElMessage} from "element-plus";

export default {
  name: "Account",
  props: {
    userInfo: Object
  },
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
          {validator: this.newPasswordValidator, trigger: 'blur'},
        ],
        confirmNewPwd: [
          {required: true, message: '输入不能为空', trigger: 'blur'},
          {min: 8, max: 16, message: '密码长度应在8-16位之间', trigger: 'blur'},
          {validator: this.confirmPasswordValidator, trigger: 'blur'},
        ]
      }
    }
  },
  methods: {
    getSCryptPwd(pwd){
      let testList = []
      for (let i = 0; i < pwd.length; ++i) {
        let str = pwd.charCodeAt(i)
        testList[i] = str
      }
      let passwordScrypt = syncScrypt(testList,
          new buffer.SlowBuffer("105gjc".normalize('NFKC')), 1024, 8, 1, 64)
      let passwordScryptStr = ''
      for (let i = 0; i < passwordScrypt.length; ++i)
        passwordScryptStr += String.fromCharCode(passwordScrypt[i])
      return passwordScryptStr
    },
    submit() {
      console.log('???')
      this.$refs.passwordRef.validate((valid, invalidFields) => {
        console.log('???????')
        if (valid) {

          const passwordInfo = {
            userId: this.userInfo.userId,
            originalPwd: this.getSCryptPwd(this.password.originalPwd),
            newPwd: this.getSCryptPwd(this.password.newPwd)
          }
          this.$request.post('/user/changePwd', passwordInfo).then(() => {
            ElMessage.success('密码重置成功！')
            this.password = {
              originalPwd: '',
              newPwd: '',
              confirmNewPwd: ''
            }
          }).catch((response) => {
            ElMessage.error('密码重置失败：' + response.msg)
          })
        } else {
          console.log(invalidFields)
        }
      })
    },
    passwordValidator(rule, value, callback) {
      if (!value.match(/^(?=.*[a-zA-Z])(?=.*\d).+$/))
        return callback(new Error('密码应且只应同时包含英文字符和数字'))
      return callback()
    },
    newPasswordValidator(rule, value, callback) {
      if (!value.match(/^(?=.*[a-zA-Z])(?=.*\d).+$/))
        return callback(new Error('密码应且只应同时包含英文字符和数字'))
      if (this.password.originalPwd === this.password.newPwd) {
        return callback(new Error('新旧密码相同'))
      }
      return this.$refs.passwordRef.validateField('confirmNewPwd', () => null)
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

h4 {
  width: 100px;
}

#hr-division-line {
  margin: 20px 0;
  height: 1px;
  background-image: -webkit-linear-gradient(bottom left, var(--pink) 30%, var(--blue) 70%);
}

:deep(label) {
  justify-content: left;
  width: 100px;
}

:deep(.el-input) {
  width: 300px;
}

#button-frame :deep(.el-button) {
  border-color: unset;
  background-color: var(--blue);
  /*font-weight: bold;*/
}

#button-frame :deep(.el-button:hover) {
  background-color: var(--light-blue);
}

#button-frame :deep(.el-button:active) {
  background-color: #3594c5;
}

#button-frame :deep(.el-button[disabled]) {
  background-color: var(--light-blue);
}

</style>