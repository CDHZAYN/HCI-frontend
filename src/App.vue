<template>
  <div style="min-height: calc(100vh - 82px);">
    <nav-bar :routes="routes" v-show="isHeadTailNeeded"/>
    <router-view/>
  </div>
  <Bottom v-show="isHeadTailNeeded"></Bottom>
</template>

<script>
import index from './network/routes.js'
import NavBar from "./components/NavBar.vue";
import Bottom from "./components/Bottom.vue";

export default {
  components: {NavBar, Bottom},
  data() {
    return {
      routes: index,
      nowPath: '',
    }
  },
  watch: {
    $route(newVal) {
      this.nowPath = this.$route.fullPath
    }
  },
  computed:{
    isHeadTailNeeded() {
      console.log(this.nowPath, this.nowPath !== '/login' && this.nowPath !== '/register')
      return this.nowPath !== '/login' && this.nowPath !== '/register'
    }
  }
}
</script>

<style scoped>

</style>
