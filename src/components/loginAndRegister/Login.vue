<template>
  <div id="main-frame">
    <div id="poison-frame">
      <el-carousel :interval="5000" arrow="never" :autoplay="true" height="100vh">
        <el-carousel-item v-for="item in poisonList" :key="item.poison">
          <img :src="item.pic" alt="鸡汤背景"/>
          <div id="poison-text">
            <p v-html="item.poison"></p>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div id="register-frame">
      <a href="/home" id="title-frame">
        <img :src="'/logo.png'">
        <h1 id="title-zayn">泽恩</h1>
        <h1>心理咨询预约平台</h1>
      </a>
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
        <el-form-item prop="usernameOrEmail">
          <el-input v-model="loginForm.usernameOrEmail" placeholder="用户名/邮箱"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" show-password placeholder="密码"/>
        </el-form-item>
      </el-form>
      <el-button @click="login()" id="button" type="primary">登&nbsp;&nbsp;录</el-button>
      <div id="link-frame">
        <a href="/register">注册</a>
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
  name: "Login",
  data() {
    return {

      poisonList: [],

      loginForm: {
        usernameOrEmail: '',
        password: ''
      },
      loginRules: {
        // 用户名或邮箱验证,首先不为空,再分别进入用户名/邮箱的单独验证函数进行验证
        usernameOrEmail: [
          {required: true, message: '输入不能为空', trigger: 'blur'},
          {validator: this.usernameOrEmailValidator, trigger: 'blur'},
        ],
        // 密码验证,8-16位且同时包含数字和字母
        password: [
          {required: true, message: '输入不能为空', trigger: 'blur'},
          {min: 8, max: 16, message: '密码长度应在8-16位之间', trigger: 'blur'},
          {validator: this.passwordValidator, trigger: 'blur'},
        ],
      }
    }
  },
  methods: {
    getImg(name) {
      return getAssetsFile(name)
    },
    async login() {
      await this.$refs.loginFormRef.validate((valid, invalidFields) => {
        // 验证通过
        if (valid) {
          // 进行密码加密
          let testList = []
          for (let i = 0; i < this.loginForm.password.length; ++i) {
            let str = this.loginForm.password.charCodeAt(i)
            testList[i] = str
          }
          let passwordScrypt = syncScrypt(testList,
              new buffer.SlowBuffer("105gjc".normalize('NFKC')), 1024, 8, 1, 64)
          // 将加密生成的字符数组转为字符串
          let passwordScryptStr = ''
          for (let i = 0; i < passwordScrypt.length; ++i)
            passwordScryptStr += String.fromCharCode(passwordScrypt[i])
          let loginInfo = {
            username: this.loginForm.usernameOrEmail.includes('@') ? null : this.loginForm.usernameOrEmail,
            password: passwordScryptStr,
            email: this.loginForm.usernameOrEmail.includes('@') ? this.loginForm.usernameOrEmail : null,
          }
          // 向后端发起登录请求
          this.$request.post('/user/login', loginInfo).then((res) => {
            ElMessage.success('登录成功')
            localStorage.setItem('userId', res.msg.userId)
            this.$router.push('/home')
          }).catch((response) => {
            ElMessage.error('登录失败！\n' + response.msg)
          })
        } else {
          console.log(invalidFields)
        }
      })
    },
    usernameOrEmailValidator(rule, value, callback) {
      if (value.includes('@'))
        return this.emailValidator(rule, value, callback)
      return this.usernameValidator(rule, value, callback)
    },
    usernameValidator(rule, value, callback) {
      if (value.length >= 17 || value.length <= 1)
        return callback(new Error('用户名长度应在2-16位之间'))
      if (value.includes('@'))
        return callback(new Error('用户名中不应包含’@‘字符'))
      return callback()
    },
    passwordValidator(rule, value, callback) {
      if (!value.match(/^(?=.*[a-zA-Z])(?=.*\d).+$/))
        return callback(new Error('密码应且只应同时包含英文字符和数字'))
      return callback()
    },
    emailValidator(rule, value, callback) {
      if (!value.match(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/))
        return callback(new Error('异常的邮箱格式'))
      return callback()
    },
  },
  mounted() {
    this.$request.get('/home/carousel').then(res => {
      this.poisonList = res.msg
    })
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

#poison-frame {
  width: 60vw;
}

#poison-frame :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

#poison-frame :deep(#poison-text) {
  position: absolute;
  bottom: 0;
  left: 20px;
  color: white;
  text-align: left;
  text-shadow: 0 0 5px grey;
}

#poison-frame :deep(#poison-text p) {
  margin: 0 10px 20px 10px;
  font-size: 50px;
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