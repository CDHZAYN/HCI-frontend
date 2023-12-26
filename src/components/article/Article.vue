<template>
  <div id="main-frame">
    <div id="search-frame">
      <el-input v-model="searchTitle" placeholder="搜索文章标题" maxlength="10"
                @blur="filterChange({type: 'searchTitle'})">
        <template #prefix>
          <el-icon>
            <Search></Search>
          </el-icon>
        </template>
      </el-input>
      <BlockSelector :list="type" :type="'type'" :color="'blue'"></BlockSelector>
    </div>
    <div id="event-article-frame">
      <div v-for="(item, index) in articleList" class="event-article-item"
           @mouseenter="isHoverEvent[index] = true" @mouseleave="isHoverEvent[index] = false">
        <a :href="'/article/0'">
          <img :src="item.pic" :class="{'is-hover': isHoverEvent[index]}"/>
          <div class="event-article-item-text">
            <p :class="{'book-event': item.type === 1}">{{ type[item.type] }}&nbsp;</p>
            <p> | {{ item.date }}</p>
            <h4>{{ item.title }}</h4>
            <h5>{{ item.subtitle }}</h5>
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
      type: ['全部类型', '咨询师专栏', '活动预约', '活动回顾'],
      articleList: [],
      isHoverEvent: [],

      conditionForm: {},

      isFetching: false,

      skip: 0,
      hasGetAll: false
    }
  },
  methods: {
    getImg(name) {
      return getAssetsFile(name)
    },
    filterChange(selectBlock) {
      this.conditionForm[selectBlock.type] = selectBlock
      this.filterSearchWrapper(true)
    },
    filterSearchWrapper(isToClear) {
      if (this.isFetching)
        return
      this.isFetching = true

      if (isToClear) {
        this.skip = 0
        this.hasGetAll = false
        this.showingCounselor = {}
        this.counselorList = []
      }
      this.fetchSearch()
    },
    fetchSearch() {
      let title = undefined
      if (this.conditionForm.searchTitle)
        title = this.conditionForm.searchTitle
      let type = undefined
      if (this.conditionForm.type)
        type = this.conditionForm.type - 1

      this.$request.post('/article/list', {
        title,
        type,
        skip: this.skip
      }).then((res) => {
        this.skip++
        this.articleList.push(...res.msg)
        if (res.msg.length < 8) {
          this.hasGetAll = true
        }
      }).finally(()=>{
        this.isFetching = false
      })
    }
  },
  mounted() {
    // 观察底部
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.filterSearchWrapper()
      } else {
        // console.log('left bottom')
      }
    }, {threshold: .6});
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
  margin-top: 30px;
}

#bottom-frame :deep(.el-loading-mask) {
  transform: scale(70%, 70%);
  z-index: 0;
}

</style>