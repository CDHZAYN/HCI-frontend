<template>
  <div id="main-frame">
    <div style="height: 30px;"></div>
    <h1>{{ brief.title }}</h1>
    <h4>{{ brief.date }}</h4>
    <p>这是正文。</p>
    <div id="button-frame">
      <el-button @click="login()" id="button" type="primary">现在预约</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleDetail",
  data() {
    return {
      brief: {

        pic: '文章默认头图.png',
        title: '《奇葩说》黄执中：我一辈子都讨厌小孩 | 那些被孤立过的人',
        subtitle: '',
        type: '活动预约',
        date: '2023-11-13'

      }
    }
  }
}
</script>

<style scoped>
#main-frame {
  padding: 0 200px 30px 200px;
}

#button-frame{
  text-align: center;
}

#button {
  margin-top: 10px;
  width: 200px;
  height: 50px;
  font-size: 20px;
  border-color: unset;
  background-image: -webkit-linear-gradient(bottom left, rgb(225, 94, 145) 30%, rgb(115, 204, 255) 70%);
  font-weight: bold;
}

#button-frame #button:hover {
  background-image: -webkit-linear-gradient(bottom left, rgb(224, 119, 159) 30%, rgb(148, 213, 252) 70%);
}

#button-frame #button:active {
  background-image: -webkit-linear-gradient(bottom left, rgb(194, 80, 125) 30%, rgb(76, 135, 168) 70%);
}

</style>