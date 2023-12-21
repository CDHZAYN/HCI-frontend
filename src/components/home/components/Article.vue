<template>
  <div id="main-frame">
    <div style="height: 5px;"></div>
    <div id="flex-frame">
      <div id="poison-frame">
        <img :src="getImg('鸡汤背景.png')" alt="鸡汤背景"/>
        <div id="poison-text">
          <h6>泽恩寄语</h6>
          <p>生命的美，不在它的绚烂，而在它的平和；生命的动人，不在它的激情，而在它的平静。</p>
        </div>
      </div>
      <div id="ver-division-line"></div>
      <div id="event-article-frame">
        <div v-for="(item, index) in article" class="event-article-item"
             @mouseenter="isHoverEvent[index] = true" @mouseleave="isHoverEvent[index] = false">
          <a :href="'###'">
            <img :src="getImg(item.pic)" :class="{'is-hover': isHoverEvent[index]}"/>
            <div class="event-article-item-text">
              <p :class="{'book-event': item.type === '活动预约'}">{{ item.type }}&nbsp;</p>
              <p> | {{ item.date }}</p>
              <h4>{{ item.title }}</h4>
              <h5>{{ item.subtitle }}</h5>
            </div>
          </a>
        </div>
        <a href="/article">查看更多活动文章→</a>
      </div>
    </div>
    <div id="hr-division-line"/>
    <div id="poison-article-frame">
      <div v-for="(item, index) in article" class="poison-article-item"
           @mouseenter="isHoverPoison[index] = true" @mouseleave="isHoverPoison[index] = false">
        <a :href="'###'">
          <img :src="getImg(item.pic)" :class="{'is-hover': isHoverPoison[index]}"/>
          <div class="poison-article-item-text">
            <p>{{ item.type }}&nbsp;</p>
            <p> | {{ item.date }}</p>
            <h4>{{ item.title }}</h4>
            <h5>{{ item.subtitle }}</h5>
          </div>
        </a>
      </div>
    </div>
    <a href="/article">查看更多咨询师专栏→</a>
    <div style="height: 20px;"></div>
  </div>
</template>

<script>
import getAssetsFile from "../../../assets/getAssetsFile.js";

export default {
  name: "Article",
  data() {
    return {
      article: [{
        pic: '文章默认头图.png',
        title: '“人生的意义到底是什么？”来自11位心理咨询师的回答',
        subtitle: '最近一直在追《都挺好》，整部剧不同于以往的家庭伦理剧，它终于将那张遮盖在中国家庭表面的都挺好、和睦的「面子」撕开，让我们看到了它真实的、剑拔弩张的「里子」。',
        type: '活动预约',
        date: '2023-11-13'
      }, {
        pic: '文章默认头图.png',
        title: '《奇葩说》黄执中：我一辈子都讨厌小孩 | 那些被孤立过的人',
        subtitle: '最近一直在追《都挺好》，整部剧不同于以往的家庭伦理剧，它终于将那张遮盖在中国家庭表面的都挺好、和睦的「面子」撕开，让我们看到了它真实的、剑拔弩张的「里子」。',
        type: '活动预约',
        date: '2023-11-13'
      }, {
        pic: '文章默认头图.png',
        title: '这样的爱令人窒息，却难以逃离',
        subtitle: '最近一直在追《都挺好》，整部剧不同于以往的家庭伦理剧，它终于将那张遮盖在中国家庭表面的都挺好、和睦的「面子」撕开，让我们看到了它真实的、剑拔弩张的「里子」。',
        type: '活动回顾',
        date: '2023-11-13'
      }, {
        pic: '文章默认头图.png',
        title: '焦虑的本质是什么？',
        subtitle: '最近一直在追《都挺好》，整部剧不同于以往的家庭伦理剧，它终于将那张遮盖在中国家庭表面的都挺好、和睦的「面子」撕开，让我们看到了它真实的、剑拔弩张的「里子」。',
        type: '活动回顾',
        date: '2023-11-13'
      }],
      isHoverEvent: [],
      isHoverPoison: []
    }
  },
  methods: {
    getImg(name) {
      return getAssetsFile(name)
    }
  }
}
</script>

<style scoped>
#main-frame {
  width: 100%;
  padding: 0 200px;
  box-sizing: border-box;
}

#flex-frame {
  display: flex;
  justify-content: space-evenly;
}

#poison-frame {
  width: calc((100vw - 400px) / 2 - 10px);
  position: relative;
}

#poison-frame #poison-text {
  position: absolute;
  bottom: 0;
  left: 0;
  color: white;
}

#poison-frame #poison-text h6 {
  margin: 0 0 10px 0;
  font-size: 20px;
  text-align: center;
  font-weight: normal;
}

#poison-frame #poison-text p {
  margin: 0 10px 20px 10px;
  font-size: 30px;
  text-align: center;
}

#poison-frame img {
  width: 100%;
  object-fit: cover;
}

#ver-division-line {
  background-image: linear-gradient(to bottom, var(--pink) 20%, var(--blue) 80%);
  width: 1px;
  margin: 0 10px;
  /*height: 300px;*/
}

#event-article-frame {
  width: calc((100vw - 400px) / 2 - 10px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#event-article-frame .event-article-item, #event-article-frame .event-article-item a {
  display: flex;
  color: black;
  text-decoration: none;
  width: 100%;
  /*height: 300px;*/
}

#event-article-frame .event-article-item img {
  width: 220px;
  border-radius: 10px;
  object-fit: contain;
  transition: box-shadow 0.2s linear;
}

#event-article-frame .event-article-item img.is-hover {
  box-shadow: 0 0 10px grey;
}

#event-article-frame .event-article-item .event-article-item-text {
  width: calc(100% - 220px);
  margin-left: 10px;
}

#event-article-frame .event-article-item p {
  display: inline-block;
  font-size: 13px;
  margin: 0;
}

#event-article-frame .event-article-item .event-article-item-text .book-event {
  color: var(--blue);
}

#event-article-frame .event-article-item h4 {
  font-size: 20px;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#event-article-frame .event-article-item h5 {
  font-size: 13px;
  font-weight: normal;
  margin: 5px 0 0 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

#event-article-frame > a {
  text-decoration: none;
  font-size: 13px;
  color: black;
  text-align: right;
}

#event-article-frame > a:hover {
  text-decoration: underline;
}

#hr-division-line {
  margin: 10px 0;
  height: 1px;
  background-image: -webkit-linear-gradient(bottom left, var(--pink) 20%, var(--blue) 80%);
}

#poison-article-frame {
  /*width: calc((100vw - 400px) / 2 - 10px);*/
  margin-top: 10px;
  display: flex;
  justify-content: space-evenly;
}

#poison-article-frame .poison-article-item {
  display: flex;
  flex-direction: column;
  width: calc((100vw - 400px) / 4 - 40px);
}

#poison-article-frame .poison-article-item a {
  color: black;
  text-decoration: none;
}

#poison-article-frame .poison-article-item img {
  width: 250px;
  border-radius: 10px;
  object-fit: contain;
  transition: box-shadow 0.2s linear;
}

#poison-article-frame .poison-article-item img.is-hover {
  box-shadow: 0 0 10px grey;
}

#poison-article-frame .poison-article-item .poison-article-item-text {
  margin-left: 10px;
}

#poison-article-frame .poison-article-item p {
  display: inline-block;
  font-size: 13px;
  margin: 0;
}

#poison-article-frame .poison-article-item h4 {
  height: 60px;
  font-size: 20px;
  margin: 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

#poison-article-frame .poison-article-item h5 {
  margin: 5px 0 0 0;
  font-size: 13px;
  font-weight: normal;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

#poison-article-frame + a {
  padding-top: 20px;
  text-decoration: none;
  font-size: 13px;
  color: black;
  text-align: right;
  display: block;
}

#poison-article-frame + a:hover {
  text-decoration: underline;
}
</style>