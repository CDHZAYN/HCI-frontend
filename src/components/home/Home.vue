<template>
  <Banner></Banner>
  <Title :title="'泽恩文编'"></Title>
  <Article></Article>
  <Title :title="'关于我们'"></Title>
  <AboutUs></AboutUs>
</template>

<script>

import Banner from "./components/Banner.vue";
import Title from "./components/Title.vue";
import Article from "./components/Article.vue";
import AboutUs from "./components/AboutUs.vue";
export default {
  name: "Home",
  components: {AboutUs, Article, Title, Banner}
}
</script>

<style scoped>


</style>