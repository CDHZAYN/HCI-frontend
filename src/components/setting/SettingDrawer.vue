<template>
  <Transition name="background">
    <div id="setting-frame" v-if="level1Open" @click="close">
      <div id="level1" @click.stop>
        <el-icon @click="close" style="cursor: pointer;" :size="24">
          <Close></Close>
        </el-icon>
        <div id="title-frame">
          <p>欢迎，</p>
          <div id="name-frame">
            <h1>{{ userInfo.username }}</h1>
          </div>
          <div id="hr-division-line"/>
        </div>
        <el-menu @select="handleSelect">
          <el-menu-item index="1">
            <el-icon>
              <Setting></Setting>
            </el-icon>
            <span>账号管理</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon>
              <Connection></Connection>
            </el-icon>
            <span>咨询者管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon>
              <Bell></Bell>
            </el-icon>
            <span>预约记录</span>
          </el-menu-item>
          <el-menu-item index="4" @click="unlogin">
            <el-icon>
              <Remove></Remove>
            </el-icon>
            <span>退出登录</span>
          </el-menu-item>
        </el-menu>

      </div>
      <div @click.stop>
        <Transition name="level2" mode="out-in">
          <div class="level2" v-if="level2Type === '1'">
            <Account :userInfo="userInfo"></Account>
          </div>
          <div class="level2" v-else-if="level2Type === '2'">
            <Fellow :userInfo="userInfo"></Fellow>
          </div>
          <div class="level2" v-else-if="level2Type === '3'">
            <BookHistory></BookHistory>
          </div>
        </Transition>
      </div>
    </div>
  </Transition>
</template>

<script>
import {Close, Setting, Connection, Bell, Remove} from '@element-plus/icons-vue'
import Account from "./components/Account.vue";
import Fellow from "./components/Fellow.vue";
import BookHistory from "./components/BookHistory.vue";
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  name: "SettingDrawer",
  components: {Close, Setting, Connection, Bell, Remove, Account, Fellow, BookHistory},
  props: {
    level1Open: Boolean,
    userInfo: Object
  },
  data() {
    return {
      level2Type: 0,
    }
  },
  methods: {
    handleSelect(index) {
      if (index === 4) {

      } else {
        this.level2Type = index
        console.log(this.level2Type)
      }
    },
    close() {
      this.level2Type = 0
      setTimeout(() => this.$emit('closeSetting'), 50)
    },
    unlogin() {
      ElMessageBox.confirm(
          '确认退出账户登录？',
          '请确认',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            typeList: 'warning',
          }
      ).then(() => {
        this.$emit('unlogin')
        ElMessage.success('您已退出登录。')
      })
    }
  }
}
</script>

<style scoped>

@keyframes scroll {
  0% {
    margin-left: 0;
    transform: translateX(0);
  }
  10% {
    margin-left: 0;
    transform: translateX(0);
  }
  90% {
    margin-left: 100%;
    transform: translateX(-100%);
  }
  100% {
    margin-left: 100%;
    transform: translateX(-100%);
  }
}

.background-enter-active, .background-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.background-enter-from,
.background-leave-to {
  opacity: 0;
}

.background-enter-active #level1, .background-leave-active #level1 {
  transition: transform 0.2s ease-in-out;
}

.background-enter-from #level1, .background-leave-to #level1 {
  transform: translateX(100%);
}

.level2-enter-active, .level2-leave-active {
  transition: transform 0.3s ease-in-out;
}

.level2-enter-from, .level2-leave-to {
  transform: translateX(100%);
}

#setting-frame {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  /*width: 200px;*/
  background: rgba(0, 0, 0, .3);
  z-index: 5;
}

#level1 {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 300px;
  background: white;
  z-index: 7;
  /*text-align: right;*/
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}

#level1 :deep(.el-icon[style*='cursor']) {
  position: absolute;
  right: 10px;
  top: 10px;
}

#title-frame {
  padding: 0 30px;
}

#title-frame p {
  margin: 30px 0 0 0;
}

#name-frame {
  width: 240px;
  overflow: hidden;
}

#name-frame h1 {
  min-width: 100%;
  white-space: nowrap;
  margin: 0;
  animation: scroll ease-in-out 5s alternate infinite;
  position: relative;
  float: left;
}

#hr-division-line {
  margin: 20px 0;
  height: 1px;
  background-image: -webkit-linear-gradient(bottom left, var(--pink) 30%, var(--blue) 70%);
}

#level1 :deep(.el-menu) {
  border-right: none;
  --el-menu-hover-bg-color: rgba(115, 204, 255, .1);
}

#level1 :deep(.el-menu-item.is-active) {
  background-color: rgba(115, 204, 255, .2);
}

.level2 {
  position: fixed;
  right: 300px;
  top: 0;
  bottom: 0;
  width: 700px;
  background: white;
  z-index: 6;
  /*text-align: right;*/
  padding: 0 30px;
  box-sizing: border-box;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  height: 100vh;
  overflow-y: scroll;
  overscroll-behavior: contain;
}

.level2::-webkit-scrollbar {
  width: 5px;
}

.level2::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: white;
}

.level2::-webkit-scrollbar-thumb {
  border-radius: 10px;
  /*-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);*/
  background-image: -webkit-linear-gradient(bottom left, var(--light-pink) 30%, var(--light-blue) 70%);
}

</style>