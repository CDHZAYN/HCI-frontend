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
      <div class="input-item-frame" v-if="item.bookTypeList.indexOf(bookInfo.bookType) !== -1">
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
</template>

<script>
export default {
  name: "BookHistoryItem",
  props: {
    bookInfo: Object,
    extraInfo: Object,
    fellowList: Array,
    index: Number
  },
  data() {
    return {
      candidateFellow: [],
      fellowDeleting: [],
      fellowAdding: [],

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
    }
  },
  methods:{
    clearInput(){
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
    parseInput(){
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
        if(this.extraInfo.isOnline === 0 || this.extraInfo.isOnline === 1)
          this.inputList[0].input = this.extraInfo.isOnline
        else if(this.bookInfo.isOnline === 0 || this.bookInfo.isOnline === 1)
          this.inputList[0].input = this.bookInfo.isOnline
        if (this.extraInfo.basicInfo){
          let temp = JSON.parse(this.extraInfo.basicInfo)
          this.inputList[1].input1 = temp.input1
          this.inputList[1].input2 = temp.input2
          this.inputList[1].input3 = temp.input3
        }
        if (this.extraInfo.relation){
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
    }
  },
  watch:{
    index:{
      handler() {
        this.clearInput()
        this.parseInput()
      }
    }
  },
  mounted() {
    this.clearInput()
    this.parseInput()
  }
}
</script>

<style scoped>
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
</style>