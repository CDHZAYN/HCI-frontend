<template>
  <div style="height: 30px"></div>
  <BlockSelector :list="bookType" :color="'blue'"></BlockSelector>
  <el-collapse accordion>
    <el-collapse-item v-for="(item, index) in bookList" :name="index">
      <template #title>
        <img :src="getImg(item.profile)">
        <h1>{{ item.title }}</h1>
        <div class="info-item">
          <h3>{{ item.time }}</h3>
          <h3>{{ item.location }}</h3>
        </div>
      </template>
      <div style="height: 10px;"></div>
      <div id="hr-division-line"></div>
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
      </div>
      <div style="height: 10px;"></div>
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
      <div id="confirm-button-frame">
        <el-button type="primary">保存更改</el-button>
        <el-button type="danger">取消预约</el-button>
      </div>
    </el-collapse-item>
  </el-collapse>
  <div style="height: 30px"></div>
</template>

<script>
import BlockSelector from "../../util/BlockSelector.vue";
import getAssetsFile from "../../../assets/getAssetsFile.js";

export default {
  name: "BookHistory",
  components: {BlockSelector},
  data() {
    return {
      bookType: ['全部预约', '待进行', '已完成', '已取消'],
      fellowList: ['黄宝俊', '大B', '小B', '超级无敌大B黄B俊'],
      bookList: [{
        title: '陈铿-单人咨询',
        time: '5天前 20:00 - 21:00',
        location: '静安咨询室',
        profile: 'counselor1.png'
      }, {
        title: '杨坚-多人咨询',
        time: '5天前 20:00 - 21:00',
        location: '静安咨询室',
        profile: 'counselor2.png'
      }, {
        title: '张园园-单人咨询',
        time: '已取消',
        location: '静安咨询室',
        profile: 'counselor3.png'
      }, {
        title: '陈铿-单人咨询',
        time: '5天前 20:00 - 21:00',
        location: '静安咨询室',
        profile: 'counselor1.png'
      }],
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
    getImg(name) {
      return getAssetsFile(name)
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

</style>