<template>
  <div id="main-frame">
    <el-steps :space="200" :active="active" simple>
      <el-step title="选择预约类型" @click="backTo(0)" :style="{'cursor': cursorState[active>=1]}">
        <template #icon>
          <el-icon>
            <More></More>
          </el-icon>
        </template>
      </el-step>
      <el-step title="选择咨询 / 活动" @click="backTo(1)" :style="{'cursor': cursorState[active>=2]}">
        <template #icon>
          <el-icon>
            <Search></Search>
          </el-icon>
        </template>
      </el-step>
      <el-step title="填写预约信息" @click="backTo(2)" :style="{'cursor': cursorState[active>=3]}">
        <template #icon>
          <el-icon>
            <ChatLineSquare></ChatLineSquare>
          </el-icon>
        </template>
      </el-step>
    </el-steps>
    <Transition mode="out-in">
      <div v-if="active === 0">
        <BookType @next-to="nextTo"></BookType>
      </div>
      <div v-else-if="active === 1">
        <BookCounselor :type="bookType" @next-to="nextTo"></BookCounselor>
      </div>
      <div v-else-if="active === 2">
        <BookInfo :info="info" @next-to="nextTo"></BookInfo>
      </div>
      <div v-else-if="active === 3">
        <BookSuccess @next-to="nextTo"></BookSuccess>
      </div>
    </Transition>
  </div>
</template>

<script>

import {More, Search, ChatLineSquare} from "@element-plus/icons-vue";
import BookInfo from "./components/BookInfo.vue";
import BookType from "./components/BookType.vue";
import BookCounselor from "./components/BookCounselor.vue";
import BookSuccess from "./components/BookSuccess.vue";
import {ElMessage} from "element-plus";

export default {
  name: "Book",
  components: {BookSuccess, BookCounselor, BookType, BookInfo, More, Search, ChatLineSquare},
  data() {
    return {
      active: 0,
      cursorState: {
        true: 'pointer',
        false: 'default'
      },
      bookType: 0,
      info: {},
      unLogin: false,
    }
  },
  methods: {
    backTo(step) {
      if (this.active === 3 && step !== 0)
        return
      if (this.active > step)
        this.active = step
    },
    nextTo(step, info) {
      if(this.unLogin)
        return
      if (step === 1) {
        this.bookType = info.index
      } else if (step === 2) {
        this.info = info
      } else if (step === 3) {

      }
      this.active = step
    }
  },
  mounted() {
    const userId = localStorage.getItem('userId')
    console.log(userId)
    if (!userId || userId === 'undefined') {
      this.unLogin = true
      ElMessage.warning('请您登陆后再进行预约。')
    }
  }
}
</script>

<style scoped>

.v-enter-active, .v-leave-active {
  transition: scale 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.v-enter-from, .v-leave-to {
  scale: .8;
  opacity: 0;
}


#main-frame {
  padding: 30px 200px 50px 200px;
}

:deep(.el-steps) {
  background: none;
  /*cursor: pointer;*/
}

:deep(.is-finish) {
  color: var(--blue) !important;
}

:deep(.el-step:nth-child(2)) {
  transform: translateX(-5%);
}
</style>