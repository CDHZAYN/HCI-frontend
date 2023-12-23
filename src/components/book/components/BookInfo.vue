<template>
  <div class="detail-item-frame">
    <h2 style="display: inline-block">
      咨询者
    </h2>
    <p style="display: inline-block;margin-left: 10px;color: grey; font-size: 13px;">
      指寻求心理咨询的客户。剩余可添加咨询者人数：{{ fellowNumRemain }}
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
  </div>
  <div class="fellow-control-frame">
    <el-select multiple filterable reserve-keyword :filter-method="searchFellowName" v-model="fellowAdding"
               @blur="addFellow" placeholder="添加咨询者" value-key="nickname">
      <el-option
          v-for="(item, index) in candidateFellow"
          :key="item.nickname"
          :label="item.nickname"
          :value="item"
      >
        <span style="float: left">{{ item.nickname }}</span>
        <span
            style="
          float: right;
          color: var(--el-text-color-secondary);
          font-size: 13px;
        "
        >{{ item.note }}</span
        >
      </el-option>
    </el-select>
    <el-button type="danger" :disabled="fellowDeleting.length === 0" @click="deleteFellowFromList">删除选中咨询者
    </el-button>
  </div>
  <div id="hr-division-line"></div>
  <div class="detail-item-frame">
    <h2 style="display: inline-block">
      额外信息
    </h2>
    <p style="display: inline-block;margin-left: 10px;color: grey; font-size: 13px;">
      您的信息将会成为咨询者/活动嘉宾为您提供针对性建议的重要依据
    </p>
    <div v-for="(item, index) in inputList">
      <div class="input-item-frame" v-if="item.bookTypeList.indexOf(info.type) !== -1">
        <!--      <div class="input-item-frame">-->
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
    <div class="price-item-frame">
      <h3>咨询名称</h3>
      <p>{{ info.name }}</p>
    </div>
    <div class="price-item-frame">
      <h3>咨询价格</h3>
      <p>{{ info.price }}.00 元</p>
    </div>
    <div class="price-item-frame">
      <h3>咨询地点</h3>
      <p>{{ info.location }}</p>
    </div>
    <div class="price-item-frame">
      <h3>咨询时间</h3>
      <p>{{ info.startTime }} ~ {{ info.endTime }}</p>
    </div>
    <div class="price-item-frame">
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
  <div id="confirm-button-frame">
    <el-button @click="submit" id="button" type="primary">支付并预约</el-button>
  </div>
</template>

<script>
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  name: "BookInfo",
  emits: {
    nextTo: null
  },
  props: {
    info: Object,
  },
  data() {
    return {
      fellowList: [],
      allFellowList: [],
      candidateFellow: [],
      fellowDeleting: [],
      fellowAdding: [],
      inputList: [{
        inputTitle: '[必填]请问你选择在线下门店咨询还是线上渠道咨询？',
        bookTypeList: [0, 1],
        inputType: 'select',
        selectItem: ['线上渠道', '线下门店'],
        input: null,
      }, {
        inputTitle: '[必填]请问你在为他人预约吗？你所帮助预约的对象和你是什么关系？',
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
        inputTitle: '[多选]请问你/咨询者遇到了什么类型的问题？',
        bookTypeList: [0, 1],
        inputType: 'multiSelect',
        selectItem: ['行为异常疾病（多动症、双向情感障碍等）', '悲观情绪（情绪失控、压力、焦虑、沮丧、绝望等）',
          '社会关系（社交压力、家庭冲突、职场冲突等）', '创伤经历（身体虐待、性虐待等）'],
        input: null,
      }, {
        inputTitle: '除了上述问题，你还有什么想要告诉我们的吗？',
        bookTypeList: [0, 1],
        inputType: 'input',
        input: null,
      }, {
        inputTitle: '请问你想从活动中了解一些什么？',
        bookTypeList: [2],
        inputType: 'input',
        input: null,
      }, {
        inputTitle: '请问你有什么想问活动嘉宾的吗？',
        bookTypeList: [2],
        inputType: 'input',
        input: null,
      }, {
        inputTitle: '请问你怎么知道我们的？',
        bookTypeList: [0, 1, 2],
        inputType: 'select',
        selectItem: ['网络搜索', '朋友推荐', '社交媒体', '曾参与过我们组织的活动'],
        input: null,
      }, {
        inputTitle: '[多选]请问你选择我们的原因是？',
        bookTypeList: [0, 1, 2],
        inputType: 'multiSelect',
        selectItem: ['拥有专业资质和丰富经验', '秉持个性化和综合性的咨询方法', '网站详实的介绍', '注重隐私和尊重客户'],
        input: null,
      }],
      test: null,
    }
  },
  computed: {
    fellowNumRemain() {
      if (this.info.remain) {
        return this.info.remain - this.fellowList.length
      } else {
        return this.info.upLimit - this.fellowList.length
      }
    }
  },
  methods: {
    searchFellowName(query) {
      this.candidateFellow = []
      for (let i = 0; i < this.allFellowList.length; ++i) {
        if (this.allFellowList[i].nickname.includes(query) && !this.allFellowList[i].hasChosen) {
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
    selectFellow(index) {
      if (this.fellowDeleting.indexOf(index) !== -1) {
        this.fellowDeleting.splice(this.fellowDeleting.indexOf(index), 1)
      } else {
        this.fellowDeleting.push(index)
      }
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
    submit() {
      if (this.fellowList.length === 0) {
        ElMessage.error('您暂未选择咨询者，请补充后重试')
        return
      } else if (this.info.type !== 2 && this.inputList[0].input === null) {
        ElMessage.error('您暂未选择线上或线下进行咨询，请补充后重试。')
        return
      } else if (this.info.type !== 2 &&
          (this.inputList[1].input === null || (this.inputList[1].input1 === 0 && this.inputList[1].input2 === null))) {
        ElMessage.error('您暂未填写第二项必填项，请补充后重试。')
        return
      } else if (this.test === null) {
        ElMessage.error('您暂未选择支付方式，请补充后重试。')
        return
      }
      ElMessageBox.confirm(
          '您确认所填信息真实无误，并确认进行本次预约吗？',
          '',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          }
      ).then(() => {
        if (this.type === 2) {
          this.submitEventBook()
        } else {
          this.submitCounselorBook()
        }
      })
    },
    submitEventBook() {
      let userFellowId = []
      this.fellowList.forEach(e => userFellowId.push(e.fellowId))

      let expectation = this.inputList[5].input

      let question = this.inputList[6].input

      let road = this.inputList[7].input

      let reason = JSON.stringify(this.inputList[8].input)

      this.$request.post('/counselorBook/book', {
        userId: this.userId,
        userFellowId,
        expectation,
        question,
        road,
        reason
      }).then(() => {
        this.$emit('nextTo', 3, {})
      }).catch((err) => {
        ElMessage.error('预约失败：' + err.msg)
      })

    },
    submitCounselorBook() {

      let userFellowId = []
      this.fellowList.forEach(e => userFellowId.push(e.fellowId))

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

      this.$request.post('/counselorBook/book', {
        userId: this.userId,
        isOnline: this.inputList[0].input,
        userFellowId,
        basicInfo,
        relation,
        problem,
        addition,
        road,
        reason
      }).then(() => {
        this.$emit('nextTo', 3, {})
      }).catch((err) => {
        ElMessage.error('预约失败：' + err.msg)
      })
    }
  },
  mounted() {
    this.userId = parseInt(localStorage.getItem('userId'))
    this.$request.get('/fellow/list', {
      params: {userId: this.userId}
    }).then((res) => {
      this.allFellowList = res.msg
      this.searchFellowName('')
    })
  }
}
</script>

<style scoped>
.detail-item-frame {
  /*border-left: 4px solid rgba(0, 0, 0, 0.2);*/
  /*padding-left: 10px;*/
}

.el-collapse-item__content h2 {
  margin-bottom: 0;
}

.fellow-item-frame {
  display: inline-flex;
  width: calc(33% - 2px);
  height: 80px;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  border: 1px solid #ebeef5;
  cursor: pointer;
  position: relative;
}

.fellow-item-frame .deleting-background {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 2;
  width: 100%;
  background-image: linear-gradient(45deg, var(--blue) 0, transparent 30%);
  transition: opacity 0.2s linear;
  opacity: 0;
}

.fellow-item-frame .deleting-background.deleting-fellow {
  opacity: 1;
}

.fellow-item-frame h3 {
  position: relative;
  z-index: 3;
  margin: 0;
  /*font-size: 14px;*/
}

.fellow-item-frame p {
  position: relative;
  z-index: 3;
  margin: 3px 0;
  font-size: 14px;
}

p.deleting-fellow {
  background-color: var(--blue);
  color: white;
}

.fellow-control-frame {
  margin-top: 20px;
}

.fellow-control-frame :deep(.el-button) {
  margin-left: 20px;
  background-color: var(--pink);
}

.fellow-control-frame :deep(.el-button:hover) {
  background-color: var(--light-pink);
}

.fellow-control-frame :deep(.el-button:active) {
  background-color: #d04e77;
}

.fellow-control-frame :deep(.el-button[disabled]) {
  background-color: var(--light-pink);
}

#hr-division-line {
  margin: 20px 0;
  height: 1px;
  background-image: -webkit-linear-gradient(bottom left, var(--pink) 30%, var(--blue) 70%);
}

.input-item-frame {
  margin: 15px 0;
  border-radius: 10px;
  display: inline-block;
  width: calc(100% - 2px);
  /*padding: 0 15px;*/
  padding: 15px;
  box-sizing: border-box;
  border-left: 5px solid var(--light-blue);
  border-right: 5px solid var(--light-blue);
}

.input-item-frame h3 {
  margin: 0 0 5px 0;
  font-weight: normal;
  font-size: 16px;
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

.price-item-frame {
  display: flex;
  align-items: center;
  margin: 20px 0;
}

.price-item-frame h3 {
  margin: 0;
  margin-right: 20px;
}

.price-item-frame p {
  margin: 0;
}

#confirm-button-frame {
  text-align: center;
}

#button {
  margin-top: 10px;
  width: 200px;
  height: 50px;
  font-size: 20px;
  border-color: unset;
  background-image: -webkit-linear-gradient(bottom left, var(--pink) 30%, var(--blue) 70%);
  font-weight: bold;
}

#confirm-button-frame #button:hover {
  background-image: -webkit-linear-gradient(bottom left, var(--light-pink) 30%, var(--light-blue) 70%);
}

#confirm-button-frame #button:active {
  background-image: -webkit-linear-gradient(bottom left, rgb(194, 80, 125) 30%, rgb(76, 135, 168) 70%);
}


</style>