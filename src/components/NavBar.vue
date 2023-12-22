<template>
  <div id="background">
    <div id="a-padding"></div>
    <div id="page-select-block"
         :style="{width: `${pageSelectBlockWidth}px`,transform: `translate(${pageSelectBlockOffset}px, -3px)`}"></div>
    <div v-for="(item, index) in routes" :ref="'page'+index" class="router-link" v-show="item.show">
      <router-link :to="item.path" @click="pageSelecting = index">
        {{ item.name }}
      </router-link>
    </div>
    <img src="/logo.png" id="icon" alt="icon">
    <div id="user">
      <div v-if="hasLogin" id="user-link-frame">
        <el-icon :color="'var(--blue)'" :size="20">
          <UserFilled/>
        </el-icon>
        <a @click="isSettingOpen = true" style="cursor: pointer">{{userInfo.username}}</a>
      </div>
      <a href="/login" v-else>登录/注册</a>
    </div>
  </div>
  <SettingDrawer :level1Open="isSettingOpen" @close-setting="isSettingOpen = false" @unlogin="unlogin"
  :userInfo="userInfo"></SettingDrawer>
</template>

<script>
import {nextTick} from "vue";
import routes from "../network/routes.js";
import {ElMessage} from "element-plus";
import SettingDrawer from "./setting/SettingDrawer.vue";
import {UserFilled} from "@element-plus/icons-vue";

export default {
  name: "NavBar",
  components: {UserFilled, SettingDrawer},
  props: {
    color: String,
    routes: Array
  },
  data() {
    return {
      hasLogin: true,
      userInfo: {
        userId: '',
        username: 'dsfds',
        email: '',
      },
      pageSelecting: 1,
      pageSelectBlockOffset: 0,
      pageSelectBlockWidth: 0,

      isSettingOpen: false,
    }
  },
  watch: {
    pageSelecting: {
      handler(newVal, oldVal) {
        this.pageSelectBlockOffset = 30
        for (let i = 0; i < this.pageSelecting; ++i) {
          const width = this.$refs['page' + i][0].clientWidth
          console.log(width)
          if (width !== 0)
            this.pageSelectBlockOffset += width + 40
        }
        this.pageSelectBlockWidth = this.$refs['page' + newVal][0].clientWidth + 20
      }
    },
    $route(newVal) {
      if (newVal.name === '文章') {
        this.pageSelecting = 2
      } else if (newVal.name === '团队成员') {
        this.pageSelecting = 4
      }
    }
  },
  methods: {
    unlogin() {
      localStorage.setItem('userId', '')
      this.hasLogin = false
      this.isSettingOpen = false
    }
  },
  mounted() {
    console.log('get userId from local storage: ', localStorage.getItem('userId'))
    const userId = localStorage.getItem('userId')
    console.log(userId === true)

    if (userId && userId !== 'undefined') {
      console.log('in', userId)
      this.$request.get('/user/getAccount', {params: {userId}}).then((res) => {
        console.log('relogin')
        this.userInfo = res.msg

        this.hasLogin = true
      }).catch((err) => {
        console.log(err)
        localStorage.setItem('userId', '')
        ElMessage.error('登录状态过期，请重新登录。')
      })
    }

    // for(let i = 0; i < this.routes.length; ++i)
    this.pageSelectBlockOffset = 30
    this.pageSelectBlockWidth = this.$refs['page' + 1][0].clientWidth + 20

    setTimeout(() => {
      for (let i = 0; i < this.routes.length; ++i) {
        if (this.routes[i].name === this.$route.name) {
          let name = this.$route.name
          if (name === '文章') {
            this.pageSelecting = 2
          } else if (name === '团队成员') {
            this.pageSelecting = 4
          } else {
            this.pageSelecting = i
          }
          return
        }
      }
    }, 1)

  }
}
</script>

<style scoped>
#background {
  height: 50px;
  box-sizing: border-box;
}

#background #a-padding {
  width: 100%;
  height: 15px;
}

#page-select-block {
  position: absolute;
  z-index: -1;
  top: 50px;
  height: 5px;
  background-image: linear-gradient(to right, var(--pink) 20%, var(--blue) 80%);
  transition: all 0.2s ease-in-out;
}

.router-link {
  display: inline-block;
  margin-left: 40px;
  /*font-weight: bold;*/
  /*border-bottom: 5px solid red;*/
}

a {
  text-decoration: none;
  color: black;
  font-family: Montserrat, PingFang SC, Microsoft YaHei, Arial, sans-serif;
  font-size: 20px;
}

#background #icon {
  position: absolute;
  height: 45px;
  object-fit: cover;
  top: 0;
  left: 50vw;
  transform: translate(-50%, 8px);
}

#background #user {
  position: absolute;
  height: 45px;
  object-fit: cover;
  top: 10px;
  right: 0;
  /*transform: translate(-50%, 8px);*/
}

#user #user-link-frame :deep(.el-icon){
  transform: translate(-5px, 2px);
}

#background #user a {
  font-size: 20px;
  padding: 5px 0 0 0;
  /*margin-top: 15px;*/
  margin: 0 40px 0 0;
  display: inline-block;
  font-weight: lighter;
}


</style>