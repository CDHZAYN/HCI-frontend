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
      <a v-if="hasLogin">啥ZAYN</a>
      <a href="/login" v-else>登录/注册</a>
    </div>
  </div>
</template>

<script>
import {nextTick} from "vue";

export default {
  name: "NavBar",
  props: {
    color: String,
    routes: Array
  },
  data() {
    return {
      hasLogin: false,
      pageSelecting: 1,
      pageSelectBlockOffset: 0,
      pageSelectBlockWidth: 0,
    }
  },
  watch: {
    pageSelecting: {
      handler(newVal, oldVal) {
        this.pageSelectBlockOffset = 30
        for (let i = 0; i < this.pageSelecting; ++i) {
          const width = this.$refs['page' + i][0].clientWidth
          console.log(width)
          if(width !== 0)
            this.pageSelectBlockOffset += width + 40
        }
        this.pageSelectBlockWidth = this.$refs['page' + newVal][0].clientWidth + 20
      }
    }
  },
  methods: {},
  mounted() {
    // for(let i = 0; i < this.routes.length; ++i)
    console.log(this.$refs['page' + 1][0].clientWidth)
    this.pageSelectBlockOffset = 30
    this.pageSelectBlockWidth = this.$refs['page' + 1][0].clientWidth + 20
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
  background-image: linear-gradient(to right, rgb(225, 94, 145) 20%, rgb(115, 204, 255) 80%);
  transition: all 0.2s ease-in-out;
}

.router-link{
  display: inline-block;
  margin-left: 40px;
  /*font-weight: bold;*/
  /*border-bottom: 5px solid red;*/
}

a{
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

#background #user a {
  font-size: 20px;
  padding: 5px 0 0 0;
  /*margin-top: 15px;*/
  margin: 0 40px 0 0;
  display: inline-block;
  font-weight: lighter;
}


</style>