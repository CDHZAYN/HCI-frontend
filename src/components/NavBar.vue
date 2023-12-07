<template>
  <div id="background">
    <div id="a-padding"></div>
    <router-link v-for="(item, index) in routes" :to="item.path" v-show="item.show">
      {{ item.name }}
    </router-link>
    <img src="/logo.png" id="icon" alt="icon">
    <div id="user">
      <a v-if="hasLogin">啥ZAYN</a>
      <a v-else>登录/注册</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    color: String,
    routes: Array
  },
  data() {
    return {
      hasLogin: false,
    }
  },
  mounted() {
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

a {
  text-decoration: none;
  color: black;
  font-family: Montserrat, PingFang SC, Microsoft YaHei, Arial, sans-serif;
  font-size: 20px;
  margin-left: 40px;
  /*font-weight: bold;*/
  /*border-bottom: 5px solid red;*/
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
  right:0;
  /*transform: translate(-50%, 8px);*/
}

#background #user a{
  font-size: 20px;
  padding: 5px 0 0 0;
  /*margin-top: 15px;*/
  margin: 0 40px 0 0;
  display: inline-block;
}


</style>