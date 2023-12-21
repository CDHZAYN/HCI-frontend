<template>
  <div id="main-frame">
    <div id="search-frame">
      <el-input v-model="searchTitle" placeholder="搜索文章标题" maxlength="10">
        <template #prefix>
          <el-icon>
            <Search></Search>
          </el-icon>
        </template>
      </el-input>
      <BlockSelector :list="type" :color="'blue'"></BlockSelector>
    </div>
    <div id="event-article-frame">
      <div v-for="(item, index) in article" class="event-article-item"
           @mouseenter="isHoverEvent[index] = true" @mouseleave="isHoverEvent[index] = false">
        <a :href="'/article/0'">
          <img :src="getImg(item.pic)" :class="{'is-hover': isHoverEvent[index]}"/>
          <div class="event-article-item-text">
            <p :class="{'book-event': item.type === '活动预约'}">{{ item.type }}&nbsp;</p>
            <p> | {{ item.date }}</p>
            <h4>{{ item.title }}</h4>
            <h5>{{item.subtitle}}</h5>
          </div>
        </a>
      </div>
    </div>
    <div id="bottom-frame">
      <div v-if="hasGetAll"><p>已经到底啦~</p></div>
      <div v-else>
        <div v-loading="true"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {Search} from '@element-plus/icons-vue'
import {nextTick} from "vue";
import getAssetsFile from "../../assets/getAssetsFile.js";
import BlockSelector from "../util/BlockSelector.vue";

export default {
  name: "Article",
  components: {BlockSelector, Search},
  data() {
    return {
      searchTitle: '',
      type: ['全部类型', '活动预约', '活动回顾', '咨询师专栏'],
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
      hasGetAll: false
    }
  },
  methods: {
    getImg(name) {
      return getAssetsFile(name)
    }
  },
  mounted() {
    // 观察底部
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // console.log('reached bottom')
      } else {
        // console.log('left bottom')
      }
    }, { threshold: .6 });
    const bottomFrame = document.getElementById("bottom-frame")
    observer.observe(bottomFrame)
  }
}
</script>

<style scoped>

#main-frame {
  padding: 30px 200px 50px 200px;
}


#search-frame {
  display: flex;
  align-items: center;
}

#search-frame :deep(.el-input) {
  width: 200px;
  display: inline-block;
  margin-right: 30px;
}
#event-article-frame {
  margin-top: 20px;
  width: calc(100vw - 400px);
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

#event-article-frame .event-article-item, #event-article-frame .event-article-item a {
  display: flex;
  color: black;
  text-decoration: none;
  /*height: 300px;*/
  width: calc((100vw - 400px) / 2 - 20px);
  margin-top: 5px;
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

#bottom-frame {
  text-align: center;
  font-size: 13px;
  margin-top:30px;
}

#bottom-frame :deep(.el-loading-mask){
  transform: scale(70%, 70%);
  z-index: 0;
}

</style>