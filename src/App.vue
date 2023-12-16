<template>
  <div style="min-height: calc(100vh - 400px);">
    <nav-bar :routes="routes" v-show="isHeadTailNeeded" @open-setting="isSettingOpen = true"/>
    <router-view/>
  </div>
  <Bottom v-show="isHeadTailNeeded"></Bottom>
  <Setting :level1Open="isSettingOpen" @close-setting="isSettingOpen = false"></Setting>
</template>

<script>
import index from './network/routes.js'
import NavBar from "./components/NavBar.vue";
import Bottom from "./components/Bottom.vue";
import Setting from "./components/setting/SettingDrawer.vue";
import {nextTick} from "vue";

export default {
  components: {Setting, NavBar, Bottom},
  data() {
    return {
      routes: index,
      nowPath: '',
      isSettingOpen: false,
    }
  },
  watch: {
    $route(newVal) {
      this.nowPath = this.$route.fullPath
      document.title = document.title.split(' | ')[0] + ' | ' + newVal.name
    }
  },
  computed:{
    isHeadTailNeeded() {
      return this.nowPath !== '/login' && this.nowPath !== '/register'
    }
  },
  mounted() {
    setTimeout(()=>{
      document.title = document.title.split(' | ')[0] + ' | ' + this.$route.name
    }, 1)
  }
}
</script>

<style scoped>

</style>
