<template>
  <div style="min-height: calc(100vh - 400px);">
    <nav-bar :routes="routes" v-if="isHeadTailNeeded"/>
    <router-view/>
  </div>
  <Bottom v-if="isHeadTailNeeded"></Bottom>
</template>

<script>
import index from './network/routes.js'
import NavBar from "./components/NavBar.vue";
import Bottom from "./components/Bottom.vue";
import {nextTick} from "vue";

export default {
  components: {NavBar, Bottom},
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
