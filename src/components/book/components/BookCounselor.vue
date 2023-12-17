<template>
  <div v-if="type <=1" style="margin-top: 30px">
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
  <div id="hr-division-line"></div>
  <div id="calendar-frame">
    <el-calendar :range="[rangeStart, rangeEnd]">
      <template #date-cell="{ data }">
        <div class="date-item" @click="selectDate(data)">
          <p :class="{'date-selecting' : data.isSelected,
           'date-has-available': parseInt(data.day.split('-')[2]) % 3 === 0}">{{ data.day.split('-')[2] }}</p>
        </div>
      </template>
    </el-calendar>
    <div id="book-list-frame" v-loading="isListLoading">
      <div v-for="(item, index) in bookList"
           class="book-item-frame"
           @click="bookItemSelecting = index">
        <div :class="{'selecting-background': true, 'book-item-selecting': index === bookItemSelecting}"></div>
        <img :src="getImg('counselor1.png')">
        <h2>{{ item.title }}</h2>
        <div class="info-item">
          <h4>{{ item.time }}</h4>
          <h4>{{ item.position }}</h4>
        </div>
      </div>
    </div>
  </div>
  <div style="margin-top: 30px; width: 100%; text-align: center">
    <el-button type="primary" :disabled="bookItemSelecting === -1"
               @click="$emit('nextTo', 2, {})">确认选择</el-button>
  </div>
</template>

<script>
import BlockSelector from "../../util/BlockSelector.vue";
import {Search} from "@element-plus/icons-vue";
import getAssetsFile from "../../../assets/getAssetsFile.js";

export default {
  name: "BookCounselor",
  components: {BlockSelector, Search},
  props: {
    type: Number
  },
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
      isListLoading: false,
      bookList: [
        {
          title: '陈铿-单人咨询',
          time: '20:00 - 21:00',
          position: '静安咨询室'
        }, {
          title: '陈铿三-单人咨询',
          time: '20:00 - 21:00',
          position: '静安咨询室'
        }, {
          title: '陈铿四-单人咨询',
          time: '20:00 - 21:00',
          position: '静安咨询室'
        }, {
          title: '陈铿-单人咨询',
          time: '20:00 - 21:00',
          position: '静安咨询室'
        }, {
          title: '陈铿-单人咨询',
          time: '20:00 - 21:00',
          position: '静安咨询室'
        }, {
          title: '陈铿-单人咨询',
          time: '20:00 - 21:00',
          position: '静安咨询室'
        },
      ],
      bookItemSelecting: -1
    }
  },
  computed: {
    rangeStart() {
      let now = new Date() //获取当前时间
      now.setDate(now.getDate() + 0)
      return now
    },
    rangeEnd() {
      let now = new Date() //获取当前时间
      now.setDate(now.getDate() + 13)
      return now
    }
  },
  methods: {
    getImg(name) {
      return getAssetsFile(name)
    },
    selectDate(data) {
      this.bookItemSelecting = -1
      this.isListLoading = true
      let bookListTemp = this.bookList
      this.bookList = []
      setTimeout(() => {
        this.bookList = bookListTemp
        this.isListLoading = false
      }, 1000)
    }
  }
}
</script>

<style scoped>
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

#hr-division-line {
  margin: 20px 0;
  height: 1px;
  background-image: -webkit-linear-gradient(bottom left, rgb(225, 94, 145) 30%, rgb(115, 204, 255) 50%);
}

#calendar-frame {
  display: flex;
  justify-content: space-evenly;
}

#calendar-frame :deep(.el-calendar__header) {
  justify-content: center;
}

#calendar-frame :deep(.el-calendar) {
  width: 48%;
  /*height: 300px;*/
  --el-calendar-selected-bg-color: rgb(240, 249, 254);
}

.date-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: black;
}

.date-item .date-selecting {
  color: rgb(115, 204, 255);
}

.date-item .date-has-available {
  color: #ebeef5;
}

#book-list-frame {
  width: 48%;
  height: 400px;
  border: 1px solid #ebeef5;
  overflow-y: scroll;
  overflow-x: hidden;
}

#book-list-frame::-webkit-scrollbar {
  width: 5px;
}

#book-list-frame::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: white;
}

#book-list-frame::-webkit-scrollbar-thumb {
  border-radius: 10px;
  /*-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);*/
  background-image: -webkit-linear-gradient(bottom left, rgb(225, 94, 145) 30%, rgb(115, 204, 255) 50%);
}

#book-list-frame .book-item-frame {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ebeef5;
  cursor: pointer;
  position: relative;
}

#book-list-frame .selecting-background {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  width: 100%;
  background-image: linear-gradient(45deg, rgb(115, 204, 255) 0, transparent 30%);
  transition: opacity 0.2s linear;
  opacity: 0;
}

#book-list-frame .selecting-background.book-item-selecting {
  opacity: 1;
}

#book-list-frame .book-item-frame.book-item-selecting {
  /*background-image: linear-gradient(45deg, rgba(115, 204, 255, .3) 0, transparent 30%);*/
  /*background-color: rgb(240, 249, 254);*/
  /*transition: background-color 0.1s linear;*/
  /*background-position: 0 0;*/
  /*color: rgb(115, 204, 255);*/
  /*transition: color 0.1s linear;*/

}

#book-list-frame .book-item-frame img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

#book-list-frame .book-item-frame h2 {
  width: 250px;
  margin: 0 50px;
  display: inline-block;
  line-height: 30px;
  text-align: left;
}

#book-list-frame .book-item-frame .info-item {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 150px;
  margin-right: 10px;
}

#book-list-frame .book-item-frame .info-item h4 {
  line-height: 30px;
  margin: 0;
  font-weight: normal;
}


</style>