<template>
  <div id="main-frame">
    <div id="search-frame">
      <div id="head-search-frame">
        <el-input v-model="searchName" placeholder="搜索文章标题" maxlength="10">
          <template #prefix>
            <el-icon>
              <Search></Search>
            </el-icon>
          </template>
        </el-input>
        <span><b>费用区间</b></span>
        <el-slider v-model="range" range show-stops :step="100" :max="1000"/>
      </div>
      <BlockSelector :list="field" :color="'blue'"></BlockSelector>
      <BlockSelector :list="location" :color="'pink'"></BlockSelector>
      <BlockSelector :list="sex" :color="'blue'"></BlockSelector>
      <BlockSelector :list="rank" :color="'pink'"></BlockSelector>
      <BlockSelector :list="counselType" :color="'blue'"></BlockSelector>
    </div>
  </div>
  <div v-for="(item, index1) in Math.ceil(counselorList.length / 4)">
    <div class="counselor-shadow-frame">
      <div class="counselor-shadow">
      </div>
    </div>
    <div class="counselor-frame">
      <div v-for="(item, index2) in counselorList.slice(index1 * 4, index1 * 4 + 4)"
           :class="{'counselor-item': true, 'counselor-item-border-show': isShow[index1 * 4 + index2]}">
        <div :class="{ 'item-hover-not-show': !isShow[index1 * 4 + index2], 'counselor-item-title': true}">
          <h1>{{ item.name }}</h1>
          <h2>{{ item.rank }}</h2>
        </div>
        <img :src="getImg(item.img)" @mouseenter="mouseEnterItem(index1, index2)"
             @mouseleave="mouseLeaveItem(index1, index2)"/>
        <div :class="{'item-hover-not-show': !isShow[index1 * 4 + index2], 'counselor-item-field':true}">
          <p v-for="fieldItem in item.field">{{ fieldItem }}</p>
        </div>
      </div>
    </div>
  </div>
  <div id="bottom-frame">
    <div v-if="hasGetAll"><p>已经到底啦~</p></div>
    <div v-else>
      <div v-loading="true"></div>
    </div>
  </div>
</template>

<script>
import {Search} from '@element-plus/icons-vue'
import {nextTick} from "vue";
import getAssetsFile from "../../assets/getAssetsFile.js";
import BlockSelector from "../util/BlockSelector.vue";

export default {
  name: "Counselor",
  components: {BlockSelector, Search},
  data() {
    return {
      searchName: '',
      range: [100, 900],
      field: ['全部领域', '亲密关系', '婚姻恋爱', '双相情感障碍', '青春期', '学业适应', '情绪困扰', '人际关系', '创伤心理', '个人成长', '家庭危机', '中年危机', '多文化群体',
        '焦虑强迫', '压力管理', '人本主义', '精神动力学', '亲子沟通', '游戏治疗'],
      location: ['全部地点', '静安寺店', '陆家嘴店'],
      sex: ['全部性别', '男咨询师', '女咨询师'],
      rank: ['全部职位', '专业咨询师', '专家级咨询师', '资深级咨询师', '督导级咨询师'],
      counselType: ['全部形式', '个体咨询', '多人咨询', '团体活动', '企业EAP'],
      counselorList: [{
        name: '陈铿',
        rank: '资深级咨询师',
        img: 'counselor1.png',
        field: ['抑郁', '个人探索', '关系困扰', '情感问题']
      }, {
        name: '杨楠',
        rank: '资深级咨询师',
        img: 'counselor2.png',
        field: ['抑郁', '焦虑', '亲密关系', '个人成长', '分析心理学', '自体心理学']
      }, {
        name: '马圆圆',
        rank: '资深级咨询师',
        img: 'counselor3.png',
        field: ['婚姻恋爱问题', '双相情感障碍', '青少年问题']
      }, {
        name: '马圆圆',
        rank: '资深级咨询师',
        img: 'counselor3.png',
        field: ['婚姻恋爱问题', '双相情感障碍', '青少年问题']
      }, {
        name: '马圆圆',
        rank: '资深级咨询师',
        img: 'counselor2.png',
        field: ['婚姻恋爱问题', '双相情感障碍', '青少年问题']
      }, {
        name: '陈铿',
        rank: '资深级咨询师',
        img: 'counselor1.png',
        field: ['抑郁', '个人探索', '关系困扰', '情感问题']
      }, {
        name: '杨楠',
        rank: '资深级咨询师',
        img: 'counselor2.png',
        field: ['抑郁', '焦虑', '亲密关系', '个人成长', '分析心理学', '自体心理学']
      }, {
        name: '马圆圆',
        rank: '资深级咨询师',
        img: 'counselor3.png',
        field: ['婚姻恋爱问题', '双相情感障碍', '青少年问题']
      }, {
        name: '马圆圆',
        rank: '资深级咨询师',
        img: 'counselor3.png',
        field: ['婚姻恋爱问题', '双相情感障碍', '青少年问题']
      }, {
        name: '马圆圆',
        rank: '资深级咨询师',
        img: 'counselor2.png',
        field: ['婚姻恋爱问题', '双相情感障碍', '青少年问题']
      }],
      isShow: [],
      isHoverEvent: [],
      hasGetAll: false
    }
  },
  methods: {
    getImg(name) {
      return getAssetsFile(name)
    },
    mouseEnterItem(index1, index2) {
      this.isShow[index1 * 4 + index2] = true
    },
    mouseLeaveItem(index1, index2) {
      this.isShow[index1 * 4 + index2] = false
    }
  },
  mounted() {// 观察底部
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // console.log('reached bottom')
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
}

#head-search-frame {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 30px;
}

#head-search-frame :deep(.el-input) {
  width: 200px;
  /*display: inline-block;*/
  margin-right: 50px;
}

#head-search-frame span {
  margin-right: 20px;
}

#head-search-frame :deep(.el-slider) {
  width: 500px;
  margin-right: 30px;
}

.counselor-shadow-frame {
  width: 100%;
  /*height: 300px;*/
  padding: 10px 0 100px 0;
  transform: translateY(5px);
  overflow: hidden;
}

.counselor-shadow {
  height: 300px;
  width: 106vw;
  transform: translate(-3vw);
  box-shadow: inset 0 0 10px grey;
}

.counselor-frame {
  position: absolute;
  z-index: 2;
  transform: translateY(-500px);
  /*  100margin+100title+300img*/
  display: flex;
  width: 100%;
  /*flex-wrap: wrap;*/
  justify-content: center;
}

.counselor-item {
  width: 300px;
  height: 550px;
  margin: 0 10px;
  position: relative;
  z-index: 1;
  /*border-radius: 20px;*/
  transform: translateY(5px);
  transition: background-color 0.2s linear, box-shadow 0.2s linear;
}

.counselor-item-border-show {
  background-color: white;
  z-index: 10;
  box-shadow: -2px 2px 3px rgb(225, 94, 145), 2px -2px 3px rgb(115, 204, 255);
}

.item-hover-not-show {
  opacity: 0;
}


.counselor-item .counselor-item-title {
  padding-top: 10px;
  height: 100px;
  box-sizing: border-box;
  text-align: center;
  transition: opacity 0.2s linear;
}

.counselor-item .counselor-item-title h1 {
  margin: 10px 0 0 0;
  font-size: 24px;
}

.counselor-item .counselor-item-title h2 {
  margin: 5px 0 0 0;
  font-size: 16px;
  font-weight: normal;
}

.counselor-item img {
  height: 300px;
  object-fit: cover;
}

.counselor-item .counselor-item-field {
  padding: 0 10px;
  height: 150px;
  transition: opacity 0.2s linear;
  overflow-y: hidden;
}

.counselor-item .counselor-item-field p {
  display: inline-block;
  padding: 5px 8px;
  margin: 5px;
  border: 1px solid lightslategrey;
  border-radius: 10px;
  font-size: 16px;
}

#bottom-frame {
  text-align: center;
  font-size: 13px;
  margin-top: 30px;
}

#bottom-frame :deep(.el-loading-mask) {
  transform: scale(70%, 70%);
}

</style>