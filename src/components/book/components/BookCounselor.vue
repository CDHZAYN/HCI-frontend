<template>
  <div v-if="type <=1" style="margin-top: 30px">
    <div id="head-search-frame">
      <el-input v-model="searchName" placeholder="搜索咨询师名称" maxlength="10"
                @blur="filterChange({type: 'searchName'})">
        <template #prefix>
          <el-icon>
            <Search></Search>
          </el-icon>
        </template>
      </el-input>
      <span><b>费用区间</b></span>
      <el-slider v-model="range" range show-stops :step="100" :max="1600" @change="filterChange({type: 'range'})"/>
      <p>{{ range[0] }}元 ~ {{ range[1] }}元</p>
    </div>
    <BlockSelector :list="field" :type="'field'" :color="'blue'"
                   @change-select="filterChange"></BlockSelector>
    <BlockSelector :list="location" :type="'location'" :color="'pink'"
                   @change-select="filterChange"></BlockSelector>
    <BlockSelector :list="sex" :type="'sex'" :color="'blue'"
                   @change-select="filterChange"></BlockSelector>
    <BlockSelector :list="position" :type="'position'" :color="'pink'"
                   @change-select="filterChange"></BlockSelector>
    <div id="hr-division-line"></div>
  </div>
  <div id="calendar-frame">
    <el-calendar :range="[rangeStart, rangeEnd]">
      <template #date-cell="{ data }">
        <div class="date-item" @click="selectDate(data)">
          <p :class="{'date-selecting' : data.isSelected,
           'date-not-available': availableDateList.indexOf(parseInt(data.day.split('-')[2])) === -1}">
            {{ data.day.split('-')[2] }}
          </p>
        </div>
      </template>
    </el-calendar>
    <div id="book-list-frame" v-loading="isListLoading || !hasFirstFetch">
      <div v-for="(item, index) in bookList" v-if="bookList.length"
           class="book-item-frame"
           @click="bookItemSelecting = index">
        <div :class="{'selecting-background': true, 'book-item-selecting': index === bookItemSelecting}"></div>
        <img :src="getImg('counselor1.png')">
        <div class="info-item">
          <h2>{{ item.name }}</h2>
          <h4>{{ item.location }} |
            {{ item.startTime.substring(item.startTime.indexOf(' '), item.startTime.lastIndexOf(':')) }} ~
            {{ item.endTime.substring(item.endTime.indexOf(' '), item.endTime.lastIndexOf(':')) }}</h4>
        </div>
        <div class="price-frame">
          <h4>￥{{ item.price }} {{ type === 2 ? '/ 人' : '' }}</h4>
        </div>
      </div>
      <div v-else style="text-align: center">
        <p style="font-size: 13px; color: grey">该日不如改日，请选择其他高亮日期~</p>
      </div>
    </div>
  </div>
  <div id="confirm-button-frame">
    <el-button type="primary" :disabled="bookItemSelecting === -1"
               @click="$emit('nextTo', 2, {type, ...bookList[bookItemSelecting]})">确认选择
    </el-button>
  </div>
</template>

<script>
import BlockSelector from "../../util/BlockSelector.vue";
import {Search} from "@element-plus/icons-vue";
import getAssetsFile from "../../../assets/getAssetsFile.js";

export default {
  name: "BookCounselor",
  components: {BlockSelector, Search},
  emits: {
    nextTo: null,
  },
  props: {
    type: Number
  },
  data() {
    return {
      searchName: '',
      range: [0, 1600],
      field: ['全部领域', '亲密关系', '情绪困扰', '人际关系', '个人成长', '女性成长', '抑郁焦虑', '精神动力学', '亲子沟通'],
      location: ['全部地点', '静安寺店', '陆家嘴店'],
      sex: ['全部性别', '男咨询师', '女咨询师'],
      position: ['全部职位', '专业咨询师', '专家级咨询师', '资深级咨询师', '督导级咨询师'],
      dateInfo: {},
      isListLoading: false,
      hasFirstFetch: false,

      availableDateList: [],

      conditionForm: {},
      queueingId: 0,
      counselorIdList: [],
      counselTypeMap: ['单人咨询', '多人咨询', undefined],

      bookList: [],
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
    dateToString(date) {
      const Y = date.getFullYear() + '-';
      const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
      const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
    selectDate(data) {
      this.dateInfo = data
      this.bookList = []
      this.bookItemSelecting = -1
      if (this.type !== 2 && this.availableDateList.indexOf(parseInt(data.day.split('-')[2])) !== -1)
        this.fetchCounselorBookWrapper(true)
      if (this.type === 2) {
        this.fetchEventBookWrapper(true)
      }
    },
    getSearchCondition() {

      let fieldLabel = undefined
      if (this.conditionForm['field'] && this.conditionForm['field'].text.indexOf('全部') !== -1)
        fieldLabel = this.conditionForm['field'].text
      let location = undefined
      if (this.conditionForm['location'] && this.conditionForm['location'].text.indexOf('全部') !== -1)
        location = this.conditionForm['location'].text

      let sex = undefined
      if (this.conditionForm['sex'] && this.conditionForm['sex'].index !== 0)
        sex = this.conditionForm['sex'].index - 1
      let position = undefined
      if (this.conditionForm['position'] && this.conditionForm['position'].index !== 0)
        position = this.conditionForm['position'].index - 1

      return {
        counselorName: this.searchName,
        priceLowerBound: this.range[0] - 1,
        priceUpperBound: this.range[1] + 1,
        fieldLabel,
        location,
        sex,
        position,
        skip: this.skip
      }
    },
    fetchCounselorBookWrapper(isToClear){
      this.queueingId++
      const queueingIdFrozen = this.queueingId

      setTimeout(() => {
        if (this.queueingId === queueingIdFrozen) {
          if(isToClear){
            this.skip = 0
            this.hasGetAll = false
            this.counselorIdList = []
          }
          this.fetchCounselorBook()
        }
      }, 200)
    },
    fetchCounselorBook() {
      this.isListLoading = true
      if (!this.skip)
        this.counselorIdList = []
      this.$request.post('/counselor/list', {
        ...this.getSearchCondition()
      }).then((res) => {
        res.msg.forEach((e) => {
          this.counselorIdList.push(e.id)
        })
        if (res.msg.length < 8 && this.counselorIdList.length !== 0) {
          return Promise.reject()
        } else {
          this.skip++
          this.fetchCounselorBook()
        }
      }).catch(() => {
        let date = undefined
        if (this.dateInfo && this.dateInfo.day) {
          let dateStrSplit = this.dateInfo.day.split('-')
          dateStrSplit[0] = Number.parseInt(dateStrSplit[0])
          dateStrSplit[1] = Number.parseInt(dateStrSplit[1]) - 1
          dateStrSplit[2] = Number.parseInt(dateStrSplit[2])
          if (this.availableDateList.indexOf(dateStrSplit[2]) === -1) {
            this.isListLoading = false
            return
          }
          date = new Date(...dateStrSplit)
          if (date.getTime() < Date.now()) {
            date = new Date()
          }
        } else {
          date = new Date()
        }
        date = this.dateToString(date)
        this.$request.post('/counselorBook/list', {
          counselorId: this.counselorIdList,
          form: this.counselTypeMap[this.type],
          date
        }).then((res) => {
          this.bookList = res.msg
        }).finally(() => {
          this.hasFirstFetch = true
          this.skip = 0
          this.isListLoading = false
        })
      })
    },
    filterChange(selectBlock) {
      this.conditionForm[selectBlock.type] = selectBlock
      this.fetchCounselorBookWrapper(true)
    },
    fetchEventBookWrapper(isToClear){
      this.queueingId++
      const queueingIdFrozen = this.queueingId

      setTimeout(() => {
        if (this.queueingId === queueingIdFrozen) {
          if(isToClear){
            this.skip = 0
            this.hasGetAll = false
          }
          this.fetchEventBook()
        }
      }, 200)
    },
    fetchEventBook() {
      this.isListLoading = true
      let date = undefined
      if (this.dateInfo && this.dateInfo.day) {
        let dateStrSplit = this.dateInfo.day.split('-')
        dateStrSplit[0] = Number.parseInt(dateStrSplit[0])
        dateStrSplit[1] = Number.parseInt(dateStrSplit[1]) - 1
        dateStrSplit[2] = Number.parseInt(dateStrSplit[2])
        date = new Date(...dateStrSplit)
        if (date.getTime() < Date.now()) {
          date = new Date()
        }
      } else {
        date = new Date()
      }
      date = this.dateToString(date)
      this.$request.get('/eventBook/list', {
        params: {
          date
        }
      }).then((res) => {
        this.bookList = res.msg
      }).finally(() => {
        this.hasFirstFetch = true
        this.isListLoading = false
      })
    }
  },
  mounted() {
    if (this.type === 2) {
      this.fetchEventBookWrapper()
      this.$request.get('/eventBook/date').then((res) => {
        res.msg.forEach(e => {
          this.availableDateList.push(parseInt(e.split('-')[2]))
        })
      })
    } else {
      this.fetchCounselorBookWrapper()
      this.$request.get('/counselorBook/date', {
        params: {
          type: this.type === 0 ? '单人咨询' : '多人咨询',
        }
      }).then((res) => {
        res.msg.forEach(e => {
          this.availableDateList.push(parseInt(e.split('-')[2]))
        })
      })
    }
  }
}
</script>

<style scoped>

@keyframes scroll {
  0% {
    margin-left: 0;
    transform: translateX(0);
  }
  10% {
    margin-left: 0;
    transform: translateX(0);
  }
  90% {
    margin-left: 100%;
    transform: translateX(-100%);
  }
  100% {
    margin-left: 100%;
    transform: translateX(-100%);
  }
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

#hr-division-line {
  margin: 20px 0;
  height: 1px;
  background-image: -webkit-linear-gradient(bottom left, var(--pink) 30%, var(--blue) 70%);
}

#calendar-frame {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

#calendar-frame :deep(.el-calendar__header) {
  justify-content: center;
}

#calendar-frame :deep(.is-selected){
  background-color: unset;
}

#calendar-frame :deep(.is-today.is-selected) {
  font-weight: bold;
}

#calendar-frame :deep(.is-today:not(.is-selected)) {
  color: black;
  font-weight: normal;
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
}

.date-item .date-selecting {
  color: var(--blue);
  font-weight: bold;
}

.date-item .date-not-available {
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
  background-image: -webkit-linear-gradient(bottom left, var(--light-pink) 30%, var(--light-blue) 70%);
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
  background-image: linear-gradient(45deg, var(--blue) 0, transparent 30%);
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


#book-list-frame .book-item-frame .info-item {
  width: 200px;
  margin-right: 30px;
  overflow: hidden;
}

#book-list-frame .book-item-frame .info-item h2 {
  min-width: 100%;
  white-space: nowrap;
  margin: 0;
  animation: scroll ease-in-out 3s alternate infinite;
  position: relative;
  float: left;
}

#book-list-frame .book-item-frame .info-item h4 {
  color: grey;
  line-height: 30px;
  margin: 0;
  font-weight: normal;
}

#book-list-frame .book-item-frame .price-frame {
  font-weight: normal;
  margin-right: 30px;
}

#confirm-button-frame {
  margin-top: 30px;
  width: 100%;
  text-align: center;
}

#confirm-button-frame :deep(.el-button) {
  border-color: unset;
  background-color: var(--blue);
}

#confirm-button-frame :deep(.el-button:hover) {
  background-color: var(--light-blue);
}

#confirm-button-frame :deep(.el-button:active) {
  background-color: #3594c5;
}

#confirm-button-frame :deep(.el-button[disabled]) {
  background-color: var(--light-blue);
}

</style>