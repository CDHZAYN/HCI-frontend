<template>
  <div style="height: 30px"></div>
  <BlockSelector :list="bookType" :color="'blue'"></BlockSelector>
  <el-collapse accordion>
    <el-collapse-item name="1">
      <template #title>
        <img :src="getImg('counselor1.png')">
        <h1>陈铿-单人咨询</h1>
        <div class="info-item">
          <h3>3天后 20:00 - 21:00</h3>
          <h3>静安咨询室</h3>
        </div>
      </template>
      <div style="height: 10px;"></div>
      <div class="detail-item-frame">
        <h2>
          咨询者
        </h2>
        <p v-for="(item, index) in fellowList" :class="{'deleting-fellow': fellowDeleting.indexOf(index) !== -1}"
           @click="selectFellow(index)">{{ item }}</p>
        <div id="fellow-control-frame">
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
      <div class="detail-item-frame">
        <h2>
          额外信息
        </h2>
        <div v-for="item in inputList">
          <h3>{{ item.inputTitle }}</h3>
          <el-input v-model="item.inputAnswer" maxlength="256" show-word-limit type="textarea"
                    :autosize="{ maxRows: 6 }"/>
        </div>

      </div>
      <div style="height: 30px;"></div>
      <el-button type="primary">保存更改</el-button>
      <el-button type="danger">取消预约</el-button>
    </el-collapse-item>
    <el-collapse-item name="2">
      <template #title>
        <img :src="getImg('counselor1.png')">
        <h1  style="color: grey">陈铿-单人咨询</h1>
        <div class="info-item">
          <h3 style="color: grey">已取消</h3>
<!--          <h3>静安咨询室</h3>-->
        </div>
      </template>
      <div style="height: 10px;"></div>
      <div class="detail-item-frame">
        <h2>
          咨询者
        </h2>
        <p v-for="(item, index) in fellowList" :class="{'deleting-fellow': fellowDeleting.indexOf(index) !== -1}"
           @click="selectFellow(index)">{{ item }}</p>
        <div id="fellow-control-frame">
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
      <div class="detail-item-frame">
        <h2>
          额外信息
        </h2>
        <div v-for="item in inputList">
          <h3>{{ item.inputTitle }}</h3>
          <el-input v-model="item.inputAnswer" maxlength="256" show-word-limit type="textarea"
                    :autosize="{ maxRows: 6 }"/>
        </div>

      </div>
      <div style="height: 30px;"></div>
      <el-button type="primary">保存更改</el-button>
      <el-button type="danger">取消预约</el-button>
    </el-collapse-item>
    <el-collapse-item name="3">
    <template #title>
      <img :src="getImg('counselor1.png')">
      <h1>陈铿-单人咨询</h1>
      <div class="info-item">
        <h3>5天前 20:00 - 21:00</h3>
        <h3>静安咨询室</h3>
      </div>
    </template>
    <div style="height: 10px;"></div>
    <div class="detail-item-frame">
      <h2>
        咨询者
      </h2>
      <p v-for="(item, index) in fellowList" :class="{'deleting-fellow': fellowDeleting.indexOf(index) !== -1}"
         @click="selectFellow(index)">{{ item }}</p>
      <div id="fellow-control-frame">
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
    <div class="detail-item-frame">
      <h2>
        额外信息
      </h2>
      <div v-for="item in inputList">
        <h3>{{ item.inputTitle }}</h3>
        <el-input v-model="item.inputAnswer" maxlength="256" show-word-limit type="textarea"
                  :autosize="{ maxRows: 6 }"/>
      </div>

    </div>
    <div style="height: 30px;"></div>
    <el-button type="primary">保存更改</el-button>
    <el-button type="danger">取消预约</el-button>
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
      candidateFellow: [],
      fellowDeleting: [],
      fellowAdding: [],
      inputList: [{
        inputTitle: '额外信息1',
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

:deep(.el-collapse-item__content .detail-item-frame) {
  border-left: 4px solid rgba(0, 0, 0, 0.2);
  padding-left: 10px;
}

:deep(.el-collapse-item__content h2) {
  margin-bottom: 0;
}


:deep(.el-collapse-item__content p) {
  display: inline-block;
  padding: 5px 8px;
  margin: 5px;
  /*border: 1px solid lightslategrey;*/
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s linear, color 0.2s linear;
}

:deep(.el-collapse-item__content p.deleting-fellow) {
  background-color: rgb(115, 204, 255);
  color: white;
}

:deep(.el-collapse-item__content #fellow-control-frame) {
  /*margin-top: 20px;*/
}

:deep(#fellow-control-frame .el-button) {
  margin-left: 20px;
}

:deep(.el-textarea__inner) {
  max-height: 200px;
}

</style>