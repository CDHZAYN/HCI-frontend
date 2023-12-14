<template>
  <Banner></Banner>
  <Title :title="'泽恩文编'"></Title>
  <Article></Article>
  <Title :title="'关于我们'"></Title>
  <AboutUs></AboutUs>
  <Title :title="'服务项目'"></Title>
  <Project></Project>
</template>

<script>

import Banner from "./components/Banner.vue";
import Title from "./components/Title.vue";
import Article from "./components/Article.vue";
import AboutUs from "./components/AboutUs.vue";
import Project from "./components/Project.vue";
export default {
  name: "Home",
  components: {Project, AboutUs, Article, Title, Banner}
}
</script>

<style scoped>

</style>