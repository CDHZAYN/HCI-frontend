<template>
  <div style="height: 10px;"></div>
  <div id="hr-division-line"></div>
  <div class="detail-item-frame">
    <h2 style="display: inline-block;margin: 0;">
      咨询者
    </h2>
    <p style="display: inline-block;margin-left: 10px;color: grey; font-size: 13px;">
      剩余可添加咨询者人数：{{ fellowNumRemain }}
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
    <div class="fellow-control-frame" v-if="bookInfo.stateType === 0">
      <el-select multiple filterable reserve-keyword :filter-method="searchFellowName" v-model="fellowAdding"
                 @blur="addFellow" placeholder="添加咨询者" value-key="nickname">
        <el-option
            v-for="(item, index) in candidateFellow"
            :key="item.nickname"
            :label="item.nickname"
            :value="item"
        >
          <span style="float: left">{{ item.nickname }}</span>
          <span style="float: right;color: var(--el-text-color-secondary);font-size: 13px;">{{
              item.note
            }}</span
          >
        </el-option>
      </el-select>
      <el-button type="danger" :disabled="fellowDeleting.length === 0" @click="deleteFellowFromList">删除选中咨询者
      </el-button>
    </div>
  </div>
  <div style="height: 10px;"></div>
  <div id="hr-division-line"></div>
  <div class="detail-item-frame">
    <h2>
      额外信息
    </h2>
    <div v-for="(item, index) in inputList">
      <div class="input-item-frame" v-if="item.bookTypeList.indexOf(bookInfo.bookType) !== -1">
        <!--      <div class="input-item-frame">-->
        <h3>{{ item.inputTitle }}</h3>
        <div v-if="item.inputType === 'input'">
          <el-input v-model="item.input" maxlength="256" show-word-limit type="textarea"
                    :autosize="{ maxRows: 6 }" :disabled="bookInfo.stateType !== 0"/>
        </div>
        <div v-else-if="item.inputType === 'select'">
          <el-select v-model="item.input" :disabled="bookInfo.stateType !== 0" placeholder=" ">
            <el-option
                v-for="(sitem, index) in item.selectItem"
                :key="sitem"
                :label="sitem"
                :value="index"
            />
          </el-select>
        </div>
        <div v-else-if="item.inputType === 'selectAndInput'">
          <el-select v-model="item.input1" :disabled="bookInfo.stateType !== 0" placeholder=" ">
            <el-option
                v-for="(sitem, index) in item.selectItem"
                :key="sitem"
                :label="sitem"
                :value="index"
            />
          </el-select>
          <el-input v-model="item.input2" maxlength="10" show-word-limit
                    v-if="item.input1 === item.inputCondition" :disabled="bookInfo.stateType !== 0"/>
        </div>
        <div v-else-if="item.inputType === 'selectAndSelectAndInput'">
          <el-select v-model="item.input1" :disabled="bookInfo.stateType !== 0" placeholder=" ">
            <el-option
                v-for="(sitem, index) in item.selectItem1"
                :key="sitem"
                :label="sitem"
                :value="index"
            />
          </el-select>
          <el-select v-model="item.input2" v-if="item.input1 === item.select2Condition"
                     :disabled="bookInfo.stateType !== 0" placeholder=" ">
            <el-option
                v-for="(sitem, index) in item.selectItem2"
                :key="sitem"
                :label="sitem"
                :value="index"
            />
          </el-select>
          <el-input v-model="item.input3" maxlength="10" show-word-limit
                    v-if="item.input2 === item.inputCondition" :disabled="bookInfo.stateType !== 0"/>
        </div>
        <div v-else-if="item.inputType === 'multiSelect'">
          <el-select v-model="item.input" multiple :disabled="bookInfo.stateType !== 0" placeholder=" ">
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
    <div class="price-item-frame">
      <h3>{{ bookInfo.bookType === 2 ? '活动名称' : '咨询名称' }}</h3>
      <p>{{ bookInfo.name }}</p>
    </div>
    <div class="price-item-frame" v-if="bookInfo.bookType === 2 && bookInfo.stateType === 0">
      <h3>{{ '活动单价' }}</h3>
      <p>{{ bookInfo.price }}.00 元/人</p>
    </div>
    <div class="price-item-frame">
      <h3>已付金额</h3>
      <p>{{ bookInfo.totalPrice }}.00 元</p>
    </div>
    <div class="price-item-frame" v-if="priceDiffFromBefore">
      <h3>{{ priceDiffFromBefore > 0 ? '修改应补' : '修改应退' }}</h3>
      <p>{{ Math.abs(priceDiffFromBefore) }}.00 元</p>
    </div>
    <div class="price-item-frame">
      <h3>{{ bookInfo.bookType === 2 ? '活动地点' : '咨询地点' }}</h3>
      <p>{{ bookInfo.location }}</p>
    </div>
    <div class="price-item-frame">
      <h3>{{ bookInfo.bookType === 2 ? '活动时间' : '咨询时间' }}</h3>
      <p>{{ bookInfo.startTime }} ~ {{ bookInfo.endTime }}</p>
    </div>
    <div class="price-item-frame" v-if="extraInfo.cancel">
      <h3>取消原因</h3>
      <p>{{extraInfo.cancel}}</p>
    </div>
    <div class="price-item-frame" v-if="priceDiffFromBefore > 0">
      <h3>支付方式</h3>
      <el-select v-model="test">
        <el-option
            v-for="(sitem, index) in ['支付宝', '微信支付', 'payPal', 'applePay']"
            :key="sitem"
            :label="sitem"
            :value="index"/>
      </el-select>
    </div>
  </div>
  <div id="confirm-button-frame" v-if="bookInfo.stateType === 0">
    <el-button type="primary" @click="modifyBook()">保存更改</el-button>
    <el-button type="danger" @click="deleteBook()">{{ isDeletingBook ? '确认取消' : '取消预约' }}</el-button>
    <el-select v-model="cancel" v-if="isDeletingBook" placeholder="请选择取消原因">
      <el-option
          v-for="(sitem, index) in ['行程变动', '更换咨询师', '对预约流程不满意', '与咨询师提前沟通不满意', '保密']"
          :key="sitem"
          :label="sitem"
          :value="sitem"/>
    </el-select>
  </div>
</template>

<script>
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  name: "BookHistoryItem",
  props: {
    bookInfo: Object,
    extraInfo: Object,
    fellowListOld: Array,
    index: Number
  },
  data() {
    return {
      fellowList: [],
      candidateFellow: [],
      fellowDeleting: [],
      fellowAdding: [],
      allFellowList: [],

      test: null,

      isDeletingBook: false,
      cancel: '',

      inputList: [],
    }
  },
  computed: {
    fellowNumRemain() {
      if (this.bookInfo.remain) {
        return this.bookInfo.remain - this.fellowList.length
      } else {
        return this.bookInfo.upLimit - this.fellowList.length
      }
    },
    priceDiffFromBefore() {
      return this.bookInfo.price * this.fellowList.length - this.bookInfo.totalPrice
    }
  },
  methods: {
    clearInput() {
      this.inputList = [{
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
      }]
    },
    parseInput() {
      if (this.bookInfo.bookType === 2) {
        if (this.extraInfo.expectation)
          this.inputList[5].input = this.extraInfo.expectation
        if (this.extraInfo.question)
          this.inputList[6].input = this.extraInfo.question
        if (this.extraInfo.road === 0 || (this.extraInfo.road && this.extraInfo.road.isNumber()))
          this.inputList[7].input = this.extraInfo.road
        if (this.extraInfo.reason) {
          this.inputList[8].input = JSON.parse(this.extraInfo.reason)
        }
      } else {
        if (this.extraInfo.isOnline === 0 || this.extraInfo.isOnline === 1)
          this.inputList[0].input = this.extraInfo.isOnline
        else if (this.bookInfo.isOnline === 0 || this.bookInfo.isOnline === 1)
          this.inputList[0].input = this.bookInfo.isOnline
        if (this.extraInfo.basicInfo) {
          let temp = JSON.parse(this.extraInfo.basicInfo)
          this.inputList[1].input1 = temp.input1
          this.inputList[1].input2 = temp.input2
          this.inputList[1].input3 = temp.input3
        }
        if (this.extraInfo.relation) {
          let temp = JSON.parse(this.extraInfo.relation)
          this.inputList[2].input1 = temp.input1
          this.inputList[2].input2 = temp.input2
        }
        if (this.extraInfo.problem)
          this.inputList[3].input = JSON.parse(this.extraInfo.problem)
        if (this.extraInfo.addition)
          this.inputList[4].input = this.extraInfo.addition
        if (this.extraInfo.road === 0 || (this.extraInfo.road && this.extraInfo.road.isNumber()))
          this.inputList[7].input = this.extraInfo.road
        if (this.extraInfo.reason) {
          this.inputList[8].input = JSON.parse(this.extraInfo.reason)
        }
      }
    },
    selectFellow(index) {
      if (this.bookInfo.stateType !== 0) {
        return
      }
      if (this.fellowDeleting.indexOf(index) !== -1) {
        this.fellowDeleting.splice(this.fellowDeleting.indexOf(index), 1)
      } else {
        this.fellowDeleting.push(index)
      }
    },
    searchFellowName(query) {
      this.candidateFellow = []
      for (let i = 0; i < this.allFellowList.length; ++i) {
        if ((this.allFellowList[i].nickname.includes(query) || this.allFellowList[i].note.includes(query)) && !this.allFellowList[i].hasChosen) {
          this.candidateFellow.push(this.allFellowList[i])
        }
      }
    },
    addFellow() {
      if (this.fellowNumRemain < this.fellowAdding.length) {
        ElMessage.error('添加人数超过限制。')
        return
      }
      for (let i = 0; i < this.fellowAdding.length; ++i) {
        this.fellowAdding[i].hasChosen = true
      }
      this.fellowList = this.fellowList.concat(this.fellowAdding)
      this.fellowAdding = []
    },
    parseFellowList() {
      this.fellowList = this.fellowListOld
      this.fetchAllFellowList()
    },
    fetchAllFellowList() {
      this.isFetchingAllFellowList = true
      this.$request.get('/fellow/list', {
        params: {userId: this.extraInfo.userId}
      }).then((res) => {
        this.allFellowList = res.msg
        let newFellowList = []
        for (let i = 0; i < this.fellowList.length; ++i) {
          for (let j = 0; j < this.allFellowList.length; ++j) {
            if (this.fellowList[i].fellowId === this.allFellowList[j].fellowId) {
              this.allFellowList[j].hasChosen = true
              newFellowList.push(this.allFellowList[j])
            }
          }
        }
        this.fellowList = newFellowList
        this.searchFellowName('')
        this.isFetchingAllFellowList = false
      })
    },
    deleteFellowFromList() {
      let nextFellowList = []
      for (let i = 0; i < this.fellowList.length; ++i) {
        if (this.fellowDeleting.indexOf(i) === -1) {
          nextFellowList.push(this.fellowList[i])
        } else {
          this.fellowList[i].hasChosen = undefined
        }
      }
      this.fellowDeleting = []
      this.fellowList = nextFellowList
      this.searchFellowName('')
    },
    modifyBook() {
      if (this.fellowList.length === 0) {
        ElMessage.error('您暂未选择咨询者，请补充后重试')
        return
      } else if (this.bookInfo.bookType !== 2 && this.inputList[0].input === null) {
        ElMessage.error('您暂未选择线上或线下进行咨询，请补充后重试。')
        return
      } else if (this.bookInfo.bookType !== 2 &&
          (this.inputList[1].input === null || (this.inputList[1].input1 === 0 && this.inputList[1].input2 === null))) {
        ElMessage.error('您暂未填写咨询者相关的必填项，请补充后重试。')
        return
      } else if (this.test === null) {
        ElMessage.error('您暂未选择支付方式，请补充后重试。')
        return
      }
      ElMessageBox.confirm(
          '您确认所填信息真实无误，并确认修改本次预约吗？',
          '',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          }
      ).then(() => {
        if (this.bookInfo.bookType === 2) {
          this.submitEventBook()
        } else {
          this.submitCounselorBook()
        }
      })
    },
    submitEventBook() {
      let newFellowId = []
      this.fellowList.forEach(e => newFellowId.push(e.fellowId))
      let oldFellowId = []
      this.fellowListOld.forEach(e => oldFellowId.push(e.fellowId))

      let addIdList = newFellowId.filter(item => !oldFellowId.includes(item))
      let deleteIdList = oldFellowId.filter(item => !newFellowId.includes(item))

      let expectation = this.inputList[5].input

      let question = this.inputList[6].input

      let road = this.inputList[7].input

      let reason = JSON.stringify(this.inputList[8].input)

      this.$request.post('/eventBook/modify', {
        userId: this.extraInfo.userId,
        eventId: this.extraInfo.eventId,
        userEventId: this.extraInfo.id,
        expectation,
        question,
        road,
        reason
      }).then(() => {
        this.request.post('/eventBook/addFellow', {
          userId: this.extraInfo.userId,
          eventId: this.extraInfo.eventId,
          fellowId: addIdList
        })
      }).then(() => {
        this.request.post('/eventBook/deleteFellow', {
          userId: this.extraInfo.userId,
          eventId: this.extraInfo.eventId,
          fellowId: deleteIdList
        })
      }).then(() => {
        ElMessage.success('修改成功！')
      }).catch((err) => {
        ElMessage.error('修改失败：' + err.msg)
      })

    },
    submitCounselorBook() {

      let newFellowId = []
      this.fellowList.forEach(e => newFellowId.push(e.fellowId))
      let oldFellowId = []
      this.fellowListOld.forEach(e => oldFellowId.push(e.fellowId))

      let addIdList = newFellowId.filter(item => !oldFellowId.includes(item))
      let deleteIdList = oldFellowId.filter(item => !newFellowId.includes(item))

      let basicInfo = JSON.stringify({
        input1: this.inputList[1].input1,
        input2: this.inputList[1].input2,
        input3: this.inputList[1].input3,
      })

      let relation = JSON.stringify({
        input1: this.inputList[2].input1,
        input2: this.inputList[2].input2,
      })

      let problem = JSON.stringify(this.inputList[3].input)

      let addition = this.inputList[4].input

      let road = this.inputList[7].input

      let reason = JSON.stringify(this.inputList[8].input)

      this.$request.post('/counselorBook/modify', {
        userId: this.extraInfo.userId,
        counselorBookId: this.extraInfo.counselorBookId,
        userCounselorId: this.extraInfo.id,
        isOnline: this.inputList[0].input,
        basicInfo,
        relation,
        problem,
        addition,
        road,
        reason
      }).then(() => {
        this.request.post('/counselorBook/addFellow', {
          userId: this.extraInfo.userId,
          eventId: this.extraInfo.eventId,
          fellowId: addIdList
        })
      }).then(() => {
        this.request.post('/counselorBook/deleteFellow', {
          userId: this.extraInfo.userId,
          eventId: this.extraInfo.eventId,
          fellowId: deleteIdList
        })
      }).then(() => {
        ElMessage.success('修改成功！')
      }).catch((err) => {
        ElMessage.error('预约失败：' + err.msg)
      })
    },
    deleteBook() {

      if (this.isDeletingBook === false)
        this.isDeletingBook = true
      else {
        if(!this.cancel){
          ElMessage.error('您还未选择取消原因，请选择后确认。')
          return
        }
        ElMessageBox.confirm(
            '一旦操作无法撤销，您确认取消本次预约吗？',
            '',
            {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              type: 'warning',
            }
        ).then(()=>{
          if(this.bookInfo.bookType === 2) {
            this.$request.post('/eventBook/cancel', {
              userId: this.extraInfo.userId,
              eventId: this.extraInfo.eventId,
              userEventId: this.extraInfo.id,
              cancel: this.cancel
            })
          } else{
            this.$request.post('/counselorBook/cancel', {
              userId: this.extraInfo.userId,
              counselorBookId: this.extraInfo.counselorBookId,
              userCounselorId: this.extraInfo.id,
              cancel: this.cancel
            })
          }
        }).then(() => {
          ElMessage.success('删除成功，期待与您的再次相遇。')
        }).catch((err) => {
          ElMessage.error('删除失败：' + err.msg)
        })
      }
    }
  },
  watch: {
    index: {
      handler() {
        this.parseFellowList()
        this.clearInput()
        this.parseInput()
        this.searchFellowName('')
      }
    }
  },
  mounted() {
    this.parseFellowList()
    this.clearInput()
    this.parseInput()
  }
}
</script>

<style scoped>

#hr-division-line {
  margin: 20px 0;
  height: 1px;
  background-image: -webkit-linear-gradient(bottom left, rgb(255, 94, 155) 30%, rgb(115, 204, 255) 50%);
}

.detail-item-frame :deep(.input-item-frame) {
  margin: 15px 0;
  border-radius: 10px;
  display: inline-block;
  width: calc(100% - 2px);
  /*padding: 0 15px;*/
  padding: 15px;
  box-sizing: border-box;
  border: unset;
  border-left: 5px solid var(--light-blue);
  border-right: 5px solid var(--light-blue);
}

.input-item-frame :deep(.el-select), .input-item-frame :deep(.el-input), .input-item-frame :deep(.el-textarea) {

  display: block;
  margin: 10px 0 5px 0;
}

.input-item-frame :deep(.el-select) {
  width: 200px;
}

.input-item-frame :deep(.el-textarea__inner) {
  max-height: 200px;
}

.detail-item-frame :deep(.input-item-frame h3) {
  margin: 0 0 15px 0;
  font-weight: normal;
  font-size: 16px;
}

.price-item-frame {
  display: flex;
  align-items: center;
  margin: 20px 0;
}

.price-item-frame h3 {
  margin: 0;
  margin-right: 20px;
  font-size: 16px;
}

.price-item-frame p {
  font-size: 16px;
  margin: 0;
}

.fellow-control-frame :deep(.el-button), #confirm-button-frame :deep(.el-button--danger) {
  margin-left: 20px;
  margin-right: 10px;
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
</style>