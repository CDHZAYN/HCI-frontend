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
  <el-form v-loading="isLoading" :disabled="disable" ref="detailRef" :model="detail" :rules="detailRules"
           :hide-required-asterisk="true">
    <el-form-item label="姓名/昵称" prop="nickname">
      <el-input v-model="detail.nickname" maxlength="16" show-word-limit
                placeholder="必填"/>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="detail.email"/>
    </el-form-item>
    <el-form-item label="性别">
      <el-select v-model="detail.sex" :default-first-option="false">
        <el-option
            v-for="(item, index) in ['男', '女', '其他', '保密']"
            :key="item"
            :label="item"
            :value="index"
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
      <el-input v-model="detail.note" maxlength="10" show-word-limit placeholder="仅便于识别，对咨询师保密"/>
    </el-form-item>
    <el-form-item>
      <div id="confirm-button-frame">
        <el-button type="primary" @click="submitDetail">确认</el-button>
        <el-button type="danger" @click="deleteDetail">删除</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
import {ElMessage, ElMessageBox} from "element-plus";
import {syncScrypt} from "scrypt-js";
import buffer from "buffer";

export default {
  name: "Fellow",
  props: {
    userInfo: Object
  },
  data() {
    return {
      fellowList: [],
      selectingFellowIndex: -1,
      detail: {
        nickname: '',
        email: '',
        sex: 3,
        birth: 0,
        age: 0,
        vocation: '',
        note: ''
      },
      detailTemp: {},
      detailRules: {
        nickname: [
          {required: true, message: '输入不能为空', trigger: 'blur'},
          {validator: this.nicknameValidator, trigger: 'blur'},
        ],
        email: [
          {validator: this.emailValidator, trigger: 'blur'},
        ],
      },
      isLoading: false,
      disable: true
    }
  },
  computed: {
    age() {
      console.log(this.detail.birth)
      if (!this.detail.birth) {
        return '保密'
      }
      const age = Math.floor((Date.now() - this.detail.birth) / 24 / 3600 / 1000 / 365)
      if (age < 0)
        return '保密'
      else
        return age
    }
  },
  methods: {
    clearDetail() {
      this.detail.id = undefined
      this.detail.fellowId = undefined
      this.detail.nickname = ''
      this.detail.email = ''
      this.detail.sex = 3
      this.detail.birth = 0
      this.detail.age = 0
      this.detail.vocation = ''
      this.detail.note = ''
    },
    isFellowEqual(fellow1, fellow2) {
      console.log(fellow1, fellow2)
      return fellow1.nickname === fellow2.nickname && fellow1.email === fellow2.email && fellow1.sex === fellow2.sex
          && fellow1.birth.toString() === fellow2.birth.toString() && fellow1.age === fellow2.age && fellow1.vocation === fellow2.vocation
          && fellow1.note === fellow2.note
    },
    requestDetail(index) {
      this.isLoading = true
      this.selectingFellowIndex = index
      console.log(this.fellowList[index].fellowId)

      if (this.fellowList[index].fellowId) {
        this.$request.get('/fellow/detail', {
          params: {
            userId: this.userInfo.userId,
            fellowId: this.fellowList[index].fellowId
          }
        }).then((res) => {
          let detail = res.msg
          detail.fellowId = detail.id
          detail.birth = new Date(detail.birthYear, detail.birthMonth, 1)
          detail.sex = Number.parseInt(detail.sex)
          this.detailTemp = JSON.parse (JSON.stringify (detail))
          this.detailTemp.birth = new Date(this.detailTemp.birth)
          this.detail = JSON.parse (JSON.stringify (detail))
          this.detail.birth = new Date(this.detail.birth)
          this.fellowList[index].nickname = this.detail.nickname
          this.isLoading = false
        }).catch((err) => {
          ElMessage.error('获取咨询者信息失败：' + err.msg)
        })
      } else {
        this.isLoading = false
        this.detailTemp = {}
        this.clearDetail()
      }
    },
    selectFellow(index) {
      this.disable = false

      if (this.selectingFellowIndex === -1 || !this.fellowList[index].nickname) {
        this.requestDetail(index)
      } else if (!this.isFellowEqual(this.detail, this.detailTemp)) {
        ElMessageBox.confirm(
            '确认不保存已修改信息，查看新的咨询者？',
            '请确认',
            {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              typeList: 'warning',
            }
        ).then(() => {
          if (!this.detail.fellowId) {
            this.deleteDetailReal()
            return
          }
          this.requestDetail(index)
        })
      } else {
        this.requestDetail(index)
      }
    },
    addOne() {
      this.fellowList.push({nickname: ''})
      this.selectFellow(this.fellowList.length - 1)
    },
    submitDetail() {
      this.$refs.detailRef.validate((valid, invalidFields) => {
        if (valid) {
          let birthYear = undefined
          let birthMonth = undefined
          if(this.detail.birth){
            let birthYear = this.detail.birth.getFullYear()
            let birthMonth = this.detail.birth.getMonth() + 1
            if (this.detail > Date.now()) {
              birthYear = undefined
              birthMonth = undefined
            }
          }
          this.$request.post('/fellow/add', {
            ...this.detail,
            userId: this.userInfo.userId,
            birthYear,
            birthMonth,
            birth: undefined,
            id: this.detail.fellowId,
            fellowId: undefined
          }).then((res) => {
            ElMessage.success('添加成功')
            this.fellowList[this.selectingFellowIndex].fellowId = res.msg.id
            this.detail.fellowId = res.msg.id
            this.detailTemp = this.detail
            this.selectFellow(this.selectingFellowIndex)
          }).catch((response) => {
            ElMessage.error('添加失败：\n' + response.msg)
          })
        } else {
          console.log(invalidFields)
        }
      })
    },
    deleteDetailReal() {
      this.fellowList.splice(this.selectingFellowIndex, 1)
      this.selectingFellowIndex = -1
      this.clearDetail()
      this.disable = true
    },
    deleteDetail() {
      ElMessageBox.confirm(
          '确认删除此咨询者信息吗？',
          '请确认',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            typeList: 'warning',
          }
      ).then(() => {
        if (!this.detail.fellowId) {
          this.deleteDetailReal()
        } else {
          this.$request.post('/fellow/delete', {},{
            params: {
              fellowId: this.detail.fellowId
            }
          }).then(() => {
            ElMessage({
              type: 'success',
              message: '咨询者信息已删除',
            })
            this.deleteDetailReal()
          })
        }
      })
    },
    nicknameValidator(rule, value, callback) {
      let hasIdentical = false
      for (let i = 0; i < this.fellowList.length; ++i) {
        if (value === this.fellowList[i].nickname && i !== this.selectingFellowIndex)
          hasIdentical = true
      }
      if (hasIdentical)
        return callback(new Error('已有相同姓名/昵称的咨询者信息'))
      return callback()
    },
    emailValidator(rule, value, callback) {
      if (!value.match(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/))
        return callback(new Error('异常的邮箱格式'))
      return callback()
    },
  }
  ,
  mounted() {
    console.log(this.userInfo.userId)
    this.$request.get('/fellow/list', {
      params: {
        userId: this.userInfo.userId
      }
    }).then((res) => {
      this.fellowList = res.msg
    })
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
  background-image: -webkit-linear-gradient(bottom left, rgb(255, 94, 155) 30%, rgb(115, 204, 255) 50%);
}

:deep(label) {
  justify-content: left;
  width: 100px;
}

:deep(.el-input), :deep(.el-textarea) {
  width: 300px;
}

:deep(.el-textarea__inner) {
  max-height: 80px;
}

#confirm-button-frame :deep(.el-button--danger) {
  margin-left: 20px;
  background-color: var(--pink);
}

#confirm-button-frame :deep(.el-button--danger:hover) {
  background-color: var(--light-pink);
}

#confirm-button-frame :deep(.el-button--danger:active) {
  background-color: #d04e77;
}

#confirm-button-frame :deep(.el-button--danger[disabled]) {
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