<template>
<!--  <p>{{article}}</p>-->
  <div id="main-frame">
    <div style="height: 30px;"></div>
    <h1>{{ article.title }}</h1>
    <h4>{{ article.date }}</h4>
    <div id="text-frame" v-html="article.text"></div>
    <div id="confirm-button-frame" v-if="article.type === 1">
      <el-button @click="login()" id="button" type="primary" :disabled="!article.eventDate">现在预约</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleDetail",
  data() {
    return {
      article: {
      }
    }
  },
  mounted() {

    this.$request.get('/article/detail', {
      params:{
        articleId: this.$route.params.articleId,
      }
    }).then(res=>{
      this.article = res.msg
    })
  }
}
</script>

<style scoped>
#main-frame {
  padding: 0 200px 30px 200px;
}

#text-frame :deep(p:has(img)){
  text-align: center;
}

#text-frame :deep(img){
  max-width: 300px;
  max-height: 300px;
}

#confirm-button-frame{
  text-align: center;
}

#button {
  margin-top: 10px;
  width: 200px;
  height: 50px;
  font-size: 20px;
  border-color: unset;
  background-image: -webkit-linear-gradient(bottom left, var(--pink) 30%, var(--blue) 70%);
  font-weight: bold;
}

#confirm-button-frame #button.is-disabled{
  background-image: none;
  background-color: lightgray;
}
#confirm-button-frame #button.is-disabled:hover {
  background-image: none;
}
#confirm-button-frame #button.is-disabled:active {
  background-image: none;
}


#confirm-button-frame #button:hover {
  background-image: -webkit-linear-gradient(bottom left, var(--light-pink) 30%, var(--light-blue) 70%);
}


#confirm-button-frame #button:active {
  background-image: -webkit-linear-gradient(bottom left, rgb(194, 80, 125) 30%, rgb(76, 135, 168) 70%);
}

</style>