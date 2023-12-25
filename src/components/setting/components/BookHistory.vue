<template>
  <div style="height: 30px"></div>
  <BlockSelector :list="bookType" :color="'blue'" :type="'bookType'" @change-select="filterChange"></BlockSelector>
  <BlockSelector :list="stateType" :color="'pink'" :type="'stateType'" @change-select="filterChange"></BlockSelector>
  <el-collapse accordion v-if="bookList.length">
    <el-collapse-item v-for="(item, index) in bookList" :name="index">
      <template #title>
        <img :src="getImg('counselor'+(index % 4 + 1)+'.png')">
        <h1>{{ item.book.name }}</h1>
        <div class="info-item">
          <h3>{{ item.book.diff }}</h3>
          <h3>{{ item.location }}</h3>
        </div>
      </template>
      <div style="height: 10px;"></div>
      <div id="hr-division-line"></div>
      <div class="detail-item-frame">
        <h2>
          咨询者
        </h2>

        <p style="display: inline-block;margin-left: 10px;color: grey; font-size: 13px;">
          <!--          指寻求心理咨询的客户。剩余可添加咨询者人数：{{ fellowNumRemain }}-->
        </p>
        <div style="display: flex;flex-wrap: wrap;">
          <div v-for="(item, index) in fellowList" class="fellow-item-frame"
               @click="selectFellow(index)">
            <div :class="{'deleting-background': true,
          'deleting-fellow': fellowDeleting.indexOf(index) !== -1}"></div>
            <h3>{{ item.nickname }}</h3>
            <p>{{ item.note }}</p>
          </div>
        </div>
        <!--        <div class="fellow-control-frame">-->
        <!--                    <el-select multiple filterable reserve-keyword :filter-method="searchFellowName" v-model="fellowAdding"-->
        <!--                               @blur="addFellow" placeholder="添加咨询者" value-key="nickname" @focus="fetchAllFellowList">-->
        <!--                      <el-option-->
        <!--                          v-for="(item, index) in candidateFellow"-->
        <!--                          :key="item.nickname"-->
        <!--                          :label="item.nickname"-->
        <!--                          :value="item"-->
        <!--                      >-->
        <!--                        <span style="float: left">{{ item.nickname }}</span>-->
        <!--                        <span style="float: right;color: var(&#45;&#45;el-text-color-secondary);font-size: 13px;">{{ item.note }}</span-->
        <!--                        >-->
        <!--                      </el-option>-->
        <!--                    </el-select>-->
        <!--                    <el-button type="danger" :disabled="fellowDeleting.length === 0" @click="deleteFellowFromList">删除选中咨询者-->
        <!--                    </el-button>-->
        <!--        </div>-->
      </div>
      <div style="height: 10px;"></div>
      <div id="hr-division-line"></div>
      <div class="detail-item-frame">
        <h2>
          额外信息
        </h2>
        <div v-for="(item, index) in inputList">
          <!--          <div class="input-item-frame" v-if="item.bookTypeList.indexOf(info.type) !== -1">-->
          <div class="input-item-frame">
            <h3>{{ item.inputTitle }}</h3>
            <div v-if="item.inputType === 'input'">
              <el-input v-model="item.input" maxlength="256" show-word-limit type="textarea"
                        :autosize="{ maxRows: 6 }"/>
            </div>
            <div v-else-if="item.inputType === 'select'">
              <el-select v-model="item.input">
                <el-option
                    v-for="(sitem, index) in item.selectItem"
                    :key="sitem"
                    :label="sitem"
                    :value="index"
                />
              </el-select>
            </div>
            <div v-else-if="item.inputType === 'selectAndInput'">
              <el-select v-model="item.input1">
                <el-option
                    v-for="(sitem, index) in item.selectItem"
                    :key="sitem"
                    :label="sitem"
                    :value="index"
                />
              </el-select>
              <el-input v-model="item.input2" maxlength="10" show-word-limit
                        v-if="item.input1 === item.inputCondition"/>
            </div>
            <div v-else-if="item.inputType === 'selectAndSelectAndInput'">
              <el-select v-model="item.input1">
                <el-option
                    v-for="(sitem, index) in item.selectItem1"
                    :key="sitem"
                    :label="sitem"
                    :value="index"
                />
              </el-select>
              <el-select v-model="item.input2" v-if="item.input1 === item.select2Condition">
                <el-option
                    v-for="(sitem, index) in item.selectItem2"
                    :key="sitem"
                    :label="sitem"
                    :value="index"
                />
              </el-select>
              <el-input v-model="item.input3" maxlength="10" show-word-limit
                        v-if="item.input2 === item.inputCondition"/>
            </div>
            <div v-else-if="item.inputType === 'multiSelect'">
              <el-select v-model="item.input" multiple>
                <el-option
                    v-for="(sitem, index) in item.selectItem"
                    :key="sitem"
                    :label="sitem"
                    :value="index"
                />
              </el-select>
            </div>
          </div>
        </div>
      </div>
      <div id="hr-division-line"></div>
      <div class="detail-item-frame">
        <h2 style="display: inline-block">
          支付信息
        </h2>
        <p style="display: inline-block;margin-left: 10px;color: grey; font-size: 13px;">
          您在支付后，方可提交本次预约。
        </p>
        <!--        <div class="price-item-frame">-->
        <!--          <h3>{{ info.type === 2 ? '活动名称' : '咨询名称' }}</h3>-->
        <!--          <p>{{ info.name }}</p>-->
        <!--        </div>-->
        <!--        <div class="price-item-frame" v-if="info.type === 2">-->
        <!--          <h3>{{ '活动单价' }}</h3>-->
        <!--          <p>{{ info.price }}.00 元/人</p>-->
        <!--        </div>-->
        <!--        <div class="price-item-frame">-->
        <!--          <h3>{{ info.type === 2 ? '活动总价' : '咨询价格' }}</h3>-->
        <!--          <p>{{ info.price * fellowList.length }}.00 元</p>-->
        <!--        </div>-->
        <!--        <div class="price-item-frame">-->
        <!--          <h3>{{ info.type === 2 ? '活动地点' : '咨询地点' }}</h3>-->
        <!--          <p>{{ info.location }}</p>-->
        <!--        </div>-->
        <!--        <div class="price-item-frame">-->
        <!--          <h3>{{ info.type === 2 ? '活动时间' : '咨询时间' }}</h3>-->
        <!--          <p>{{ info.startTime }} ~ {{ info.endTime }}</p>-->
        <!--        </div>-->
        <div class="price-item-frame">
          <h3>支付方式</h3>
          <!--          <el-select v-model="test">-->
          <!--            <el-option-->
          <!--                v-for="(sitem, index) in ['支付宝', '微信支付', 'payPal', 'applePay']"-->
          <!--                :key="sitem"-->
          <!--                :label="sitem"-->
          <!--                :value="index"/>-->
          <!--          </el-select>-->
        </div>
      </div>
      <div id="confirm-button-frame">
        <el-button type="primary">保存更改</el-button>
        <el-button type="danger">取消预约</el-button>
      </div>
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

dayjs.extend(customParseFormat)
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

export default {
  name: "BookHistory",
  components: {BlockSelector},
  props: {
    userInfo: Object,
  },
  data() {
    return {
      bookType: ['全部类型', '单人咨询', '多人咨询', '活动预约'],
      stateType: ['全部状态', '待进行', '已取消', '已完成',],

      conditionForm: {},
      queueingId: 0,
      earliestDateTime: null,
      hasGetAll: false,

      fellowList: ['黄宝俊', '大B', '小B', '超级无敌大B黄B俊'],
      bookList: [],
      candidateFellow: [],
      fellowDeleting: [],
      fellowAdding: [],

      inputList: [{
        inputTitle: '[必填]请问您选择在线下门店咨询还是线上渠道咨询？',
        bookTypeList: [0, 1],
        inputType: 'select',
        selectItem: ['线上渠道', '线下门店'],
        input: null,
      }, {
        inputTitle: '[必填]请问您在为他人预约吗？您所帮助预约的对象和您是什么关系？',
        bookTypeList: [0, 1],
        inputType: 'selectAndSelectAndInput',
        selectItem1: ['为他人预约', '为自己预约'],
        select2Condition: 0,
        selectItem2: ['亲属', '朋友', '同事', '其他'],
        inputCondition: 3,
        input1: null,
        input2: null,
        input3: null,
      }, {
        inputTitle: '[必填]请问咨询者之间是什么关系？',
        bookTypeList: [1],
        inputType: 'selectAndInput',
        selectItem: ['亲属', '朋友', '同事', '其他'],
        inputCondition: 3,
        input1: null,
        input2: null,
      }, {
        inputTitle: '[多选]请问您/咨询者遇到了什么类型的问题？',
        bookTypeList: [0, 1],
        inputType: 'multiSelect',
        selectItem: ['行为异常疾病（多动症、双向情感障碍等）', '悲观情绪（情绪失控、压力、焦虑、沮丧、绝望等）',
          '社会关系（社交压力、家庭冲突、职场冲突等）', '创伤经历（身体虐待、性虐待等）'],
        input: null,
      }, {
        inputTitle: '除了上述问题，您还有什么想要告诉我们的吗？',
        bookTypeList: [0, 1],
        inputType: 'input',
        input: null,
      }, {
        inputTitle: '请问您想从活动中了解一些什么？',
        bookTypeList: [2],
        inputType: 'input',
        input: null,
      }, {
        inputTitle: '请问您有什么想问活动嘉宾的吗？',
        bookTypeList: [2],
        inputType: 'input',
        input: null,
      }, {
        inputTitle: '请问您怎么知道我们的？',
        bookTypeList: [0, 1, 2],
        inputType: 'select',
        selectItem: ['网络搜索', '朋友推荐', '社交媒体', '曾参与过我们组织的活动'],
        input: null,
      }, {
        inputTitle: '[多选]请问您选择我们的原因是？',
        bookTypeList: [0, 1, 2],
        inputType: 'multiSelect',
        selectItem: ['拥有专业资质和丰富经验', '秉持个性化和综合性的咨询方法', '网站详实的介绍', '注重隐私和尊重客户'],
        input: null,
      }],
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
        diffStr = startTime.toNow(true) + '前'
      else
        diffStr = startTime.fromNow(true) + '后'
      return diffStr
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
        }
        bookListTemp.forEach(e => {
          e.book.diff = this.getDiffFromNow(e.book.startTime)
        })
        const startTime = bookListTemp[bookListTemp.length - 1].book.startTime
        console.log(startTime)
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
          }
          this.fetchSearch()
        }
      }, 200)
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
        this.fetchSearch()
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
  justify-content: space-between;
}

:deep(.el-collapse-item__header img) {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

:deep(.el-collapse-item__header h1) {
  width: 250px;
  margin: 0 30px;
  display: inline-block;
  line-height: 30px;
  text-align: left;
}

:deep(.el-collapse-item__header .info-item) {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 150px;
  margin-right: 50px;
}

:deep(.el-collapse-item__header .info-item h3) {
  line-height: 30px;
  margin: 0;
}

#hr-division-line {
  margin: 20px 0;
  height: 1px;
  background-image: -webkit-linear-gradient(bottom left, rgb(255, 94, 155) 30%, rgb(115, 204, 255) 50%);
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

.fellow-control-frame :deep(.el-button), #confirm-button-frame :deep(.el-button--danger) {
  margin-left: 20px;
  background-color: var(--pink);
}

.fellow-control-frame :deep(.el-button:hover), #confirm-button-frame :deep(.el-button--danger:hover) {
  background-color: var(--light-pink);
}

.fellow-control-frame :deep(.el-button:active), #confirm-button-frame :deep(.el-button--danger:active) {
  background-color: #d04e77;
}

.fellow-control-frame :deep(.el-button[disabled]), #confirm-button-frame :deep(.el-button--danger[disabled]) {
  background-color: var(--light-pink);
}

#confirm-button-frame :deep(.el-button--primary) {
  border-color: unset;
  background-color: var(--blue);
  /*font-weight: bold;*/
}

#confirm-button-frame :deep(.el-button--primary:hover) {
  background-color: var(--light-blue);
}

#confirm-button-frame :deep(.el-button--primary:active) {
  background-color: #3594c5;
}

#confirm-button-frame :deep(.el-button--primary[disabled]) {
  background-color: var(--light-blue);
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