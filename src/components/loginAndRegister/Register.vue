<template>
  <div id="main-frame">
    <div>
      <div id="img-frame">
        <img :src="getImg('鸡汤背景.png')">
      </div>
      <div id="text-frame">
        <p v-for="item in text">{{ item }}</p>
      </div>
    </div>
    <div id="register-frame">
      <a href="/home" id="title-frame">
        <img :src="'/logo.png'">
        <h1 id="title-zayn">泽恩</h1>
        <h1>心理咨询预约平台</h1>
      </a>
      <el-form ref="registerFormRef" :model="registerForm" :rules="registerRules">
        <el-form-item prop="username">
          <el-input v-model="registerForm.username" placeholder="用户名"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="registerForm.password" show-password placeholder="密码"/>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input v-model="registerForm.confirmPassword" show-password placeholder="确认密码"/>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="registerForm.email" placeholder="邮箱"/>
        </el-form-item>
        <el-form-item prop="verifyCode">
          <el-input v-model="registerForm.verifyCode" placeholder="邮箱验证码"
                    style="width: 75%; margin-right: 5%"/>
          <el-button @click="sendEmailVerifyCode()" type="primary" style="width: 20%">send</el-button>
        </el-form-item>
      </el-form>
      <el-button @click="register()" id="button" type="primary">注&nbsp;&nbsp;册</el-button>
      <div id="link-frame">
        <a href="/login">登录</a>
        <p>&nbsp;|&nbsp;登录或注册即表示同意</p>
        <a href="/contract">用户条款</a>
      </div>
    </div>
  </div>
</template>

<script>
import getAssetsFile from "../../assets/getAssetsFile.js";
import {syncScrypt} from "scrypt-js";
import buffer from "buffer";
import {ElMessage} from "element-plus";

export default {
  name: "Register",
  data() {
    return {
      text: '生命的美，<br>不在它的绚烂，而在它的平和；<br>生命的动人，<br>不在它的激情，而在它的平静。'.split(/<br>/),
      registerForm: {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        verifyCode: ''
      },
      correctVerifyCode: '',
      registerRules: {
        // 用户名验证,2-16位,不包含@(方便邮箱判定)
        username: [
          {required: true, message: '输入不能为空', trigger: 'blur'},
          {min: 2, max: 16, message: '用户名长度应在2-16位之间', trigger: 'blur'},
          {validator: this.usernameValidator, trigger: 'blur'},
        ],
        // 密码验证,8-16位且同时包含数字和字母
        password: [
          {required: true, message: '输入不能为空', trigger: 'blur'},
          {min: 8, max: 16, message: '密码长度应在8-16位之间', trigger: 'blur'},
          {validator: this.passwordValidator, trigger: 'blur'},
        ],
        // 重复密码验证,保证原密码验证要求的同时还需要跟原密码输入一致
        confirmPassword: [
          {required: true, message: '输入不能为空', trigger: 'blur'},
          {min: 8, max: 16, message: '密码长度应在8-16位之间', trigger: 'blur'},
          {validator: this.confirmPasswordValidator, trigger: 'blur'},
        ],
        // 邮箱验证,必须通过邮箱正则表达式验证
        email: [
          {required: true, message: '输入不能为空', trigger: 'blur'},
          {validator: this.emailValidator, trigger: 'blur'},
        ],
        // 邮箱验证码验证,需要跟后端回传的验证码匹配
        verifyCode: [
          {required: true, message: '输入不能为空', trigger: 'blur'},
          {validator: this.verifyCodeValidator, trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    getImg(name) {
      return getAssetsFile(name)
    },
    sendEmailVerifyCode() {
      this.$refs.registerFormRef.validateField('email', (isGood) => {
        if (isGood) {
          this.$request.post('/user/verify', {}, {
            params: {
              email: this.registerForm.email
            }
          }).then((res) => {
            console.log(res.msg)
            this.correctVerifyCode = res.msg
            ElMessage.success('发送成功')
          })
        }
      })
    },
    register() {
      this.$refs.registerFormRef.validate((valid, invalidFields) => {
        if (valid) {
          let testList = []
          for (let i = 0; i < this.registerForm.password.length; ++i) {
            let str = this.registerForm.password.charCodeAt(i)
            testList[i] = str
          }
          let passwordScrypt = syncScrypt(testList,
              new buffer.SlowBuffer("105gjc".normalize('NFKC')), 1024, 8, 1, 64)
          let passwordScryptStr = ''
          for (let i = 0; i < passwordScrypt.length; ++i)
            passwordScryptStr += String.fromCharCode(passwordScrypt[i])
          let registerInfo = {
            username: this.registerForm.username,
            password: passwordScryptStr,
            email: this.registerForm.email,
            verifyCode: this.registerForm.verifyCode
          }
          this.$request.post('/user/register', registerInfo).then(() => {
            ElMessage.success('注册成功')
            setTimeout(() =>
                this.$router.push('/login'), 1000)
          }).catch((response) => {
            ElMessage.error('注册失败：\n' + response.msg)
          })
        } else {
          console.log(invalidFields)
        }
      })
    },
    usernameValidator(rule, value, callback) {
      if (value.includes('@'))
        return callback(new Error('用户名中不应包含’@‘字符'))
      return callback()
    },
    passwordValidator(rule, value, callback) {
      if (!value.match(/^(?=.*[a-zA-Z])(?=.*\d).+$/))
        return callback(new Error('密码应且只应同时包含英文字符和数字'))
      return this.$refs.registerFormRef.validateField('confirmPassword', () => null)
    },
    confirmPasswordValidator(rule, value, callback) {
      if (value !== this.registerForm.password)
        return callback(new Error('两次输入的密码不匹配'))
      return callback()
    },
    emailValidator(rule, value, callback) {
      if (!value.match(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/))
        return callback(new Error('异常的邮箱格式'))
      return callback()
    },
    verifyCodeValidator(rule, value, callback) {
      if (this.registerForm.verifyCode !== this.correctVerifyCode)
        return callback(new Error('验证码不匹配'))
      return callback()
    },
  }
}
</script>

<style scoped>
#main-frame {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  /*background: red;*/
  display: flex;
  align-items: center;
}

#img-frame {
  width: 60vw;
  height: 100vh;
}

#img-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

#text-frame {
  position: absolute;
  bottom: 30px;
  padding-left: 30px;
}

#text-frame p {
  font-size: 30px;
  color: white;
  line-height: 20px;
}

#register-frame {
  margin: auto;
  /*width: 40vw;*/
  /*height: 100vh;*/
  display: flex;
  flex-direction: column;
  align-items: center;
}

#title-frame {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
}

#title-frame img {
  height: 30px;
  object-fit: contain;
  /*display: inline-block;*/
}

#title-frame h1 {
  font-size: 20px;
  /*display: inline-block;*/
}

#title-zayn {
  background-image: -webkit-linear-gradient(bottom left, var(--pink) 30%, var(--blue) 70%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 0 5px 0 10px;
}

#main-frame :deep(.el-form) {
  width: 100%;
}

#main-frame :deep(.el-form-item) {
  margin-top: 10px;
}

#main-frame #button {
  margin-top: 10px;
  width: 100%;
  border-color: unset;
  background-image: -webkit-linear-gradient(bottom left, var(--pink) 30%, var(--blue) 70%);
  font-weight: bold;
}

#main-frame #button:hover {
  background-image: -webkit-linear-gradient(bottom left, var(--light-pink) 30%, var(--light-blue) 70%);
}

#main-frame #button:active {
  background-image: -webkit-linear-gradient(bottom left, rgb(194, 80, 125) 30%, rgb(76, 135, 168) 70%);
}

#link-frame a {
  font-size: 13px;
  color: var(--blue);
  text-decoration: none;
  display: inline-block;
}

#link-frame p {
  font-size: 13px;
  display: inline-block;
}

</style>