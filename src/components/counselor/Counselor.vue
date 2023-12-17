<template>
  <div id="main-frame">
    <div id="search-frame">
      <div id="head-search-frame">
        <el-input v-model="searchName" placeholder="搜索咨询师名称" maxlength="10">
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
  <Transition appear>
    <div class="counselor-hover" v-show="hoverDisplay"
         :style="{'transform': `translate(${hoverX}px, ${hoverY - 100}px)`}">
      <div id="counselor-hover-title">
        <h1>{{ showingCounselor.name }}</h1>
        <h2>{{ showingCounselor.rank }}</h2>
      </div>
      <a href="/counselor/0">
        <div style="width: 300px; height: 300px;">
          <img :src="getImg(showingCounselor.img)"/>
        </div>
      </a>
      <div id="counselor-hover-field">
        <p v-for="item in showingCounselor.field">{{ item }}</p>
      </div>
    </div>
  </Transition>
  <div v-for="(item, index1) in Math.ceil(counselorList.length / 4)" class="counselor-row-frame">
    <div class="banner-frame">
      <div class="shadow">
      </div>
    </div>
    <div class="counselor-entry-frame">
      <div v-for="(item, index2) in counselorList.slice(index1 * 4, index1 * 4 + 4)"
           class="counselor-item" :ref="'counselor' + (index1 * 4 + index2)">
        <img :src="getImg(item.img)" @mouseenter="mouseEnterItem(index1, index2)"
             @mouseleave="mouseLeaveItem(index1, index2)"/>
      </div>
    </div>
  </div>
  <div id="bottom-frame">
    <div v-if="hasGetAll"><p>已经到底啦~</p></div>
    <div v-else>
      <div v-loading="true"></div>
    </div>
  </div>
  <div style="height: 50px;"></div>
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
      location: ['全部地点', '静安寺店', '陆家嘴店', '线上'],
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
      hasGetAll: false,

      showingCounselor: {},
      hoverX: 0,
      hoverY: 0,
      hoverDisplay: false,
    }
  },
  methods: {
    getImg(name) {
      return getAssetsFile(name)
    },
    mouseEnterItem(index1, index2) {
      this.hoverDisplay = false
      const index = index1 * 4 + index2
      setTimeout(() => {
        this.showingCounselor = this.counselorList[index1 * 4 + index2]
        this.hoverX = this.$refs['counselor' + index][0].getBoundingClientRect().left
        // 这里不必要减最左元素的边距，减了反而会出错（可能是因为flex内获取的left不准确）
        this.hoverY = this.$refs['counselor' + index][0].getBoundingClientRect().top
            - this.$refs['counselor' + 0][0].getBoundingClientRect().top
        this.hoverDisplay = true

        console.log(this.hoverX)
      }, 100)

    },
    mouseLeaveItem(index1, index2) {
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

.v-enter-active {
  transition: opacity 0.2s ease-in-out;
}

.v-leave-active {
  transition: opacity 0.1s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

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

.counselor-hover {
  width: 300px;
  /*height: 500px;*/
  position: absolute;
  z-index: 1;
  background-color: white;
  box-shadow: -2px 2px 3px rgb(225, 94, 145), 2px -2px 3px rgb(115, 204, 255);
  text-align: center;
}

.counselor-hover img {
  width: 300px;
  height: 300px;
  object-fit: cover;
}


#counselor-hover-title {
  padding-top: 10px;
  height: 100px;
  box-sizing: border-box;
  text-align: center;
  transition: opacity 0.2s linear;
}

#counselor-hover-title h1 {
  margin: 10px 0 0 0;
  font-size: 24px;
}

#counselor-hover-title h2 {
  margin: 5px 0 0 0;
  font-size: 16px;
  font-weight: normal;
}

#counselor-hover-field {
  padding: 10px 15px 20px 15px;
  /*height: 150px;*/
  transition: opacity 0.2s linear;
  overflow-y: hidden;
  text-align: left;
}

#counselor-hover-field p {
  display: inline-block;
  padding: 5px 8px;
  margin: 5px;
  border: 1px solid lightslategrey;
  border-radius: 10px;
  font-size: 16px;
}

.counselor-row-frame {
  padding-bottom: 60px;
}

.banner-frame {
  width: 100%;
  height: 300px;
  /*margin: 20px 0 40px 0;*/
  /*transform: translateY(5px);*/
  overflow: hidden;
}

.shadow {
  height: 300px;
  width: 106vw;
  transform: translate(-3vw);
  box-shadow: inset 0 0 10px grey;
}

.counselor-entry-frame {
  position: absolute;
  z-index: 0;
  transform: translateY(-300px);
  /*  100margin+100title+300img*/
  display: flex;
  width: 100%;
  /*flex-wrap: wrap;*/
  justify-content: center;
}

.counselor-item {
  width: 300px;
  height: 300px;
  margin: 0 10px;
  position: relative;
  z-index: 2;
  /*border-radius: 20px;*/
  /*transform: translateY(5px);*/
  transition: background-color 0.2s linear, box-shadow 0.2s linear;
}

.counselor-item img {
  width: 300px;
  height: 300px;
  object-fit: cover;
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