<template>
  <div style="height: 30px"></div>
  <BlockSelector :list="bookType" :color="'blue'" :type="'bookType'" @change-select="filterChange"></BlockSelector>
  <BlockSelector :list="stateType" :color="'pink'" :type="'stateType'" @change-select="filterChange"></BlockSelector>
  <el-collapse accordion v-if="bookList.length" @change="changeShowingBook">
    <el-collapse-item v-for="(item, index) in bookList" :name="index">
      <template #title>
        <img :src="getImg('counselor'+(index % 4 + 1)+'.png')">
        <div class="info-item">
          <h1>{{ item.book.name }}</h1>
          <h3>{{ item.book.location }} | {{item.book.diff}}
            {{ item.book.startTime.substring(item.book.startTime.indexOf(' '), item.book.startTime.lastIndexOf(':')) }} ~
            {{ item.book.endTime.substring(item.book.endTime.indexOf(' '), item.book.endTime.lastIndexOf(':')) }}</h3>
        </div>
        <div class="price-frame">
          <h4>￥{{ item.book.totalPrice }}</h4>
        </div>
      </template>
      <BookHistoryItem :bookInfo="bookList[showingBookIndex].book" :extraInfo="bookList[showingBookIndex].userBook"
          :fellowListOld="bookList[showingBookIndex].userFellow" :index="showingBookIndex" v-if="showingBookIndex >= 0"></BookHistoryItem>
    </el-collapse-item>
  </el-collapse>
  <div id="bottom-frame">
    <div v-if="hasGetAll"><p>已经到底啦~</p></div>
    <div v-else>
      <div v-loading="true"></div>
    </div>
  </div>
  <div style="height: 30px"></div>
</template>

<script>
import BlockSelector from "../../util/BlockSelector.vue";
import getAssetsFile from "../../../assets/getAssetsFile.js";
import {dayjs} from 'element-plus'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import BookHistoryItem from "./BookHistoryItem.vue";

dayjs.extend(customParseFormat)
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

export default {
  name: "BookHistory",
  components: {BookHistoryItem, BlockSelector},
  props: {
    userInfo: Object,
  },
  data() {
    return {
      bookType: ['全部类型', '单人咨询', '多人咨询', '活动预约'],
      stateType: ['全部状态', '待进行', '已取消', '已完成',],
      showingBookIndex: -1,

      bookList: [],
      conditionForm: {},
      queueingId: 0,
      earliestDateTime: null,
      hasGetAll: false,
    }
  },
  methods: {
    getImg(name) {
      return getAssetsFile(name)
    },
    dateToString(date) {
      // const Y = date.getFullYear() + '-';
      // const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      // const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
      // const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      // const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      // const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      // return Y + M + D + h + m + s;
      return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
    },
    getDiffFromNow(startTime) {
      startTime = dayjs(startTime, "YYYY-MM-DD HH:mm:ss")
      let diffStr = null
      if (dayjs().isAfter(startTime))
        diffStr = startTime.toNow(true).replace(' ', '') + '前'
      else
        diffStr = startTime.fromNow(true).replace(' ', '') + '后'
      return diffStr
    },
    changeShowingBook(activeName){
      if(isNaN(activeName)){
        this.showingBookIndex = -1
      }
      this.showingBookIndex = parseInt(activeName)
    },
    fetchSearch() {
      let bookType = undefined
      if (this.conditionForm.bookType)
        bookType = this.conditionForm.bookType.index === 0 ? undefined : this.conditionForm.bookType.text
      let type = undefined
      if (this.conditionForm.stateType)
        type = this.conditionForm.stateType.index === 0 ? undefined : this.conditionForm.stateType.index - 1
      this.$request.post('/user/bookRecord', {
        userId: this.userInfo.userId,
        bookType,
        type,
        date: this.dateToString(this.earliestDateTime)
      }).then((res) => {
        let bookListTemp = res.msg.bookRecord
        if (bookListTemp.length <= 10) {
          this.hasGetAll = true
          if(bookListTemp.length === 0)
            return
        }
        bookListTemp.forEach(e => {
          e.book.diff = this.getDiffFromNow(e.book.startTime)
          e.book.totalPrice = e.book.price * e.userFellow.length
          let name = e.book.name
          if(name.indexOf('单人') !== -1)
            e.book.bookType = 0
          else if(name.indexOf('多人') !== -1)
            e.book.bookType = 1
          else
            e.book.bookType = 2
          const startTime = dayjs(e.book.startTime, "YYYY-MM-DD HH:mm:ss")
          if(e.userBook.cancel)
            e.book.stateType = 1
          else if (dayjs().isAfter(startTime))
            e.book.stateType = 2
          else
            e.book.stateType = 0
          if(e.book.isOnline === 1 || e.userBook.isOnline === 0){
            e.book.location = '线上'
          }
        })
        console.log(bookListTemp[bookListTemp.length - 1])
        const startTime = bookListTemp[bookListTemp.length - 1].book.startTime
        this.earliestDateTime = dayjs(startTime, "YYYY-MM-DD HH:mm:ss")
        this.bookList.push(...bookListTemp)
      })
    },
    filterChange(selectBlock) {

      this.conditionForm[selectBlock.type] = selectBlock
      this.fetchSearchWrapper(true)
    },
    fetchSearchWrapper(isToClear){
      this.queueingId++
      const queueingIdFrozen = this.queueingId

      setTimeout(() => {
        if (this.queueingId === queueingIdFrozen) {
          if(isToClear){
            this.skip = 0
            this.hasGetAll = false
            this.bookList = []
            this.earliestDateTime = new Date()
            this.earliestDateTime.setDate(this.earliestDateTime.getDate() + 14)
            this.showingBookIndex = -1
          }
          this.fetchSearch()
        }
      }, 1000)
    },
    searchFellowName(query) {
      this.candidateFellow = ['CDH', '大葛老师', '葛家辰', '大C老师'].filter((item) => {
        return item.includes(query)
      })
    },
    addFellow() {
      this.fellowList = this.fellowList.concat(this.fellowAdding)
      this.fellowAdding = []
    },
    selectFellow(index) {
      if (this.fellowDeleting.indexOf(index) !== -1) {
        this.fellowDeleting.splice(this.fellowDeleting.indexOf(index), 1)
      } else {
        this.fellowDeleting.push(index)
      }
    }
  },
  mounted() {
    this.earliestDateTime = new Date()
    this.earliestDateTime.setDate(this.earliestDateTime.getDate() + 14)

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !this.hasGetAll) {
        this.fetchSearchWrapper()
      } else {
        // console.log('left bottom')
      }
    }, {threshold: .6});
    const bottomFrame = document.getElementById("bottom-frame")
    observer.observe(bottomFrame)
    // this.fetchSearch()
  }
}
</script>

<style scoped>

:deep(.el-collapse-item__header) {
  height: 100px;
  font-family: 'Montserrat', PingFang SC, Microsoft YaHei, Arial, sans-serif;
  justify-content: space-between;
}

:deep(.el-collapse-item__header img) {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

:deep(.info-item) {
  width: 350px;
  margin-left: 30px;
  margin-right: 30px;
  overflow: hidden;
  text-align: left;
}

:deep(.info-item h1) {
  min-width: 100%;
  white-space: nowrap;
  margin: 0;
  animation: scroll ease-in-out 3s alternate infinite;
  position: relative;
  float: left;
}

:deep(.info-item h3) {
  color: grey;
  line-height: 30px;
  margin: 0;
  font-weight: normal;
}

:deep(.price-frame h4) {
  /*font-weight: normal;*/
  font-size: 16px;
  /*margin-right: 30px;*/
}

:deep(.el-collapse-item__content .detail-item-frame) {
  /*border-left: 4px solid rgba(0, 0, 0, 0.2);*/
  /*padding-left: 10px;*/
}

:deep(.el-collapse-item__content h2) {
  margin-bottom: 0;
}

:deep(.fellow-item-frame) {
  display: inline-flex;
  width: calc(50% - 2px);
  height: 80px;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  border: 1px solid #ebeef5;
  cursor: pointer;
  position: relative;
}

:deep(.fellow-item-frame .deleting-background) {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 2;
  width: 100%;
  background-image: linear-gradient(45deg, rgb(115, 204, 255) 0, transparent 30%);
  transition: opacity 0.2s linear;
  opacity: 0;
}

:deep(.fellow-item-frame .deleting-background.deleting-fellow) {
  opacity: 1;
}

:deep(.fellow-item-frame h3) {
  position: relative;
  z-index: 3;
  margin: 0;
  /*font-size: 14px;*/
}

:deep(.fellow-item-frame p) {
  position: relative;
  z-index: 3;
  margin: 0;
  /*font-size: 14px;*/
}

:deep(.el-collapse-item__content p.deleting-fellow) {
  background-color: rgb(115, 204, 255);
  color: white;
}

:deep(.el-collapse-item__content .fellow-control-frame) {
  margin-top: 20px;
}

:deep(.fellow-control-frame .el-button) {
  margin-left: 20px;
}

:deep(.input-item-frame) {
  width: calc(100% - 2px);
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ebeef5;
}

:deep(.input-item-frame h3) {
  margin: 0 0 5px 0;
}

:deep(.el-textarea__inner) {
  max-height: 200px;
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