<template>
  <div class="detail-item-frame">
    <h2>
      咨询者
    </h2>
    <div v-for="(item, index) in fellowList" class="fellow-item-frame"
         @click="selectFellow(index)">
      <div :class="{'deleting-background': true,
          'deleting-fellow': fellowDeleting.indexOf(index) !== -1}"></div>
      <h3>{{ item }}</h3>
      <p>这是备注这是备注</p>
    </div>
  </div>
  <div class="fellow-control-frame">
    <el-select multiple filterable remote reserve-keyword :remote-method="searchFellowName" v-model="fellowAdding"
               @blur="addFellow" placeholder="添加咨询者">
      <el-option
          v-for="item in candidateFellow"
          :key="item"
          :label="item"
          :value="item"
      />
    </el-select>
    <el-button type="danger" :disabled="fellowDeleting.length === 0">删除选中咨询者</el-button>
  </div>
  <div id="hr-division-line"></div>
  <div class="detail-item-frame">
    <h2>
      额外信息
    </h2>
    <div v-for="item in inputList" class="input-item-frame">
      <h3>{{ item.inputTitle }}</h3>
      <el-input v-model="item.inputAnswer" maxlength="256" show-word-limit type="textarea"
                :autosize="{ maxRows: 6 }"/>
    </div>

  </div>
  <div id="hr-division-line"></div>
  <div id="button-frame">
    <el-button @click="submit" id="button" type="primary">预约</el-button>
  </div>
</template>

<script>
import {ElMessageBox} from "element-plus";

export default {
  name: "BookInfo",
  data() {
    return {
      fellowList: ['黄宝俊', '大B', '小B', '超级无敌大B黄B俊'],
      candidateFellow: [],
      fellowDeleting: [],
      fellowAdding: [],
      inputList: [{
        inputTitle: '请描述一下您近期的精神状况',
        inputAnswer: ''
      }, {
        inputTitle: '您是精神有问题吗？',
        inputAnswer: '我是大傻逼我是大傻逼我是大傻逼我是大傻逼'
      }]
    }
  },
  methods: {
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
    },
    submit(){
      ElMessageBox.confirm(
          '您确认所填信息真实无误，并确认进行本次预约吗？',
          '',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          }
      ).then(() => {
        this.$emit('nextTo', 3, {})
      })
    }
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
  background-image: linear-gradient(45deg, rgb(115, 204, 255) 0, transparent 30%);
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
  background-color: rgb(115, 204, 255);
  color: white;
}

.fellow-control-frame {
  margin-top: 20px;
}

.fellow-control-frame :deep(.el-button) {
  margin-left: 20px;
}

#hr-division-line {
  margin: 20px 0;
  height: 1px;
  background-image: -webkit-linear-gradient(bottom left, rgb(225, 94, 145) 30%, rgb(115, 204, 255) 50%);
}

.input-item-frame {
  display: inline-block;
  width: calc(100% - 2px);
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ebeef5;
}

.input-item-frame h3 {
  margin: 0 0 5px 0;
  font-weight: normal;
  font-size: 16px;
}

:deep(.el-textarea__inner) {
  max-height: 200px;
}

#button-frame{
  text-align: center;
}

#button {
  margin-top: 10px;
  width: 200px;
  height: 50px;
  font-size: 20px;
  border-color: unset;
  background-image: -webkit-linear-gradient(bottom left, rgb(225, 94, 145) 30%, rgb(115, 204, 255) 70%);
  font-weight: bold;
}

#button-frame #button:hover {
  background-image: -webkit-linear-gradient(bottom left, rgb(224, 119, 159) 30%, rgb(148, 213, 252) 70%);
}

#button-frame #button:active {
  background-image: -webkit-linear-gradient(bottom left, rgb(194, 80, 125) 30%, rgb(76, 135, 168) 70%);
}

</style>