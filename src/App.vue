<template>
  <div style="min-height: calc(100vh - 82px);">
    <nav-bar @color="changeColor" :routes="routes" v-show="isHeadTailNeeded"/>
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
      nowColor: '#FFCA02',
      routes: index,
      nowPath: '',
    }
  },
  methods: {
    changeColor(color) {
      this.nowColor = color;
    }
  },
  watch: {
    $route(newVal) {
      this.nowPath = this.$route.fullPath
      console.log('changed!', this.routes.filter(o => o.path === this.nowPath)[0].color)
      this.nowColor = this.routes.filter(o => o.path === this.nowPath)[0].color
      sessionStorage.setItem('nowColor', this.nowColor)
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
