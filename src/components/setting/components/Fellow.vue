<template>
  <div style="height: 30px;"></div>
  <h2>咨询者列表</h2>
  <p v-for="(item, index) in fellowList" @click="selectFellow(index)"
     :class="{'fellow-item-frame': true, 'selecting': index === selectingFellowIndex}">
    {{ item.nickname || '新咨询者' }}
  </p>
  <p class="fellow-item-add" @click="addOne">+</p>
  <div id="hr-division-line"/>
  <h2>咨询者信息</h2>
  <el-form v-loading="isLoading" :disabled="disable">
    <el-form-item label="姓名/昵称">
      <el-input v-model="fellowList[selectingFellowIndex].nickname" maxlength="16" show-word-limit
                placeholder="必填"/>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="detail.email"/>
    </el-form-item>
    <el-form-item label="性别">
      <el-select v-model="detail.sex" :default-first-option="false">
        <el-option
            v-for="(item, index) in ['男', '女', '其他', '保密']"
            :key="item"
            :label="item"
            :value="item"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="出生年月">
      <el-date-picker v-model="detail.birth" type="month"/>
      <p style="margin: 0 0 0 25px;">{{ age === '保密' ? age : age + '岁' }}</p>
    </el-form-item>
    <el-form-item label="职业">
      <el-input v-model="detail.vocation" maxlength="16" show-word-limit/>
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="detail.note" maxlength="30" show-word-limit type="textarea" :autosize="{ maxRows: 3 }"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitDetail">确认</el-button>
      <el-button type="danger" @click="deleteDetail">删除</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  name: "Fellow",
  data() {
    return {
      fellowList: [{nickname: 'shabi'}, {nickname: '你是煞笔'}, {nickname: '我也是'}],
      selectingFellowIndex: 0,
      detail: {
        nickname: 'shabi',
        email: '',
        sex: '保密',
        birth: 0,
        age: 0,
        vocation: '',
        note: ''
      },
      isLoading: false,
      disable: false
    }
  },
  computed: {
    age() {
      if (!this.detail.birth) {
        return '保密'
      }
      const age = Math.floor((Date.now() - this.detail.birth) / 24 / 3600 / 1000 / 365)
      console.log(age, !age, age <= 0)
      if (age < 0)
        return '保密'
      else
        return age
    }
  },
  methods: {
    clearDetail() {
      this.detail.nickname = ''
      this.detail.email = ''
      this.detail.sex = '保密'
      this.detail.birth = 0
      this.detail.age = 0
      this.detail.vocation = ''
      this.detail.note = ''
    },
    selectFellow(index) {
      this.disable = false
      this.selectingFellowIndex = index
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
        this.clearDetail()
        this.detail.nickname = this.fellowList[this.selectingFellowIndex].nickname
      }, 1000)
    },
    addOne() {
      this.fellowList.push({nickname: '新咨询者'})
      this.selectFellow(this.fellowList.length - 1)
    },
    submitDetail() {

    },
    deleteDetail() {
      ElMessageBox.confirm(
          '确认删除此咨询者信息吗？',
          '',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          }
      ).then(() => {
        ElMessage({
          type: 'success',
          message: '咨询者信息已删除',
        })
        this.fellowList.splice(this.selectingFellowIndex, 1)
        if (this.fellowList.length !== 0) {
          if (this.selectingFellowIndex === this.fellowList.length) {
            --this.selectingFellowIndex
          }
          this.selectFellow(this.selectingFellowIndex)
        } else {
          this.clearDetail()
          this.disable = true
        }
      })
    }
  }
}
</script>

<style scoped>
.fellow-item-frame {
  display: inline-block;
  padding: 5px 8px;
  margin: 5px;
  border-radius: 3px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s linear;
  /*background-color: rgba(115, 204, 255, .1);*/
}

.fellow-item-add {
  display: inline-block;
  padding: 5px 8px;
  margin: 5px;
  border-radius: 3px;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid lightslategrey;
}

.fellow-item-frame:hover:not(.selecting) {
  background-color: rgba(115, 204, 255, .3);
}

.selecting {
  border: 0;
  color: white;
  padding: 5px 9px;
  background-color: rgb(115, 204, 255);
}

#hr-division-line {
  margin: 20px 0;
  height: 1px;
  background-image: -webkit-linear-gradient(bottom left, rgb(225, 94, 145) 30%, rgb(115, 204, 255) 50%);
}

:deep(label) {
  justify-content: left;
  width: 100px;
}

:deep(.el-input), :deep(.el-textarea) {
  width: 300px;
}

:deep(.el-textarea__inner){
  max-height: 80px;
}

</style>