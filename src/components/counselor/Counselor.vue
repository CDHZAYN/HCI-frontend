<template>
  <div id="main-frame">
    <div id="search-frame">
      <div id="head-search-frame">
        <el-input v-model="searchName" placeholder="搜索咨询师名称" maxlength="10"
                  @blur="filterChange({type: 'searchName'})">
          <template #prefix>
            <el-icon>
              <Search></Search>
            </el-icon>
          </template>
        </el-input>
        <span><b>最低费用区间</b></span>
        <el-slider v-model="range" range show-stops :step="100" :max="1600" @change="filterChange({type: 'range'})"/>
        <p>{{ range[0] }}元 ~ {{ range[1] }}元</p>
      </div>
      <BlockSelector :list="field" :type="'field'" :color="'blue'"
                     @change-select="filterChange"></BlockSelector>
      <BlockSelector :list="location" :type="'location'" :color="'pink'"
                     @change-select="filterChange"></BlockSelector>
      <BlockSelector :list="sex" :type="'sex'" :color="'blue'"
                     @change-select="filterChange"></BlockSelector>
      <BlockSelector :list="position" :type="'position'" :color="'pink'"
                     @change-select="filterChange"></BlockSelector>
      <BlockSelector :list="counselType" :type="'counselType'" :color="'blue'"
                     @change-select="filterChange"></BlockSelector>
    </div>
  </div>
  <Transition appear>
    <div class="counselor-hover" v-show="hoverDisplay" @mouseleave="mouseLeaveItem()"
         :style="{'transform': `translate(${hoverX}px, ${hoverY - 100}px)`}" :key="showingCounselor.name">
      <div id="counselor-hover-title">
        <h1>{{ showingCounselor.name }}</h1>
        <h2>{{ position[showingCounselor.position + 1] }}</h2>
      </div>
      <a href="/counselor/0">
        <div style="width: 300px; height: 300px;">
          <img :src="getImg(showingCounselor.avatar)"/>
        </div>
      </a>
      <div id="counselor-hover-field">
        <p v-for="item in showingCounselor.fieldLabel">{{ item }}</p>
      </div>
    </div>
  </Transition>
  <div v-for="(item, index1) in Math.ceil(counselorList.length / 4)" class="counselor-row-frame">
    <div class="banner-frame">
      <div class="shadow">
      </div>
    </div>
    <Transition name="row" appear :duration="400">
      <div class="counselor-entry-frame">
        <div v-for="(item, index2) in counselorList.slice(index1 * 4, index1 * 4 + 4)"
             class="counselor-item" :ref="'counselor' + (index1 * 4 + index2)">
          <img :src="getImg('counselor' + ((index1 * 4 + index2) % 4 + 1) + '.png')"
               @mouseenter="mouseEnterItem(index1, index2)"/>
        </div>
      </div>
    </Transition>
  </div>
  <div id="bottom-frame">
    <div v-if="hasGetAll"><p>已经到底啦~</p></div>
    <div v-else>
      <div v-loading="true"></div>
    </div>
  </div>
  <div style="height: 50px;"></div>
</template>

<script>
import {Search} from '@element-plus/icons-vue'
import {nextTick} from "vue";
import getAssetsFile from "../../assets/getAssetsFile.js";
import BlockSelector from "../util/BlockSelector.vue";
import {ElMessage} from "element-plus";

export default {
  name: "Counselor",
  components: {BlockSelector, Search},
  data() {
    return {
      searchName: '',
      range: [0, 1600],
      field: ['全部领域', '亲密关系', '情绪困扰', '人际关系', '个人成长', '女性成长', '抑郁焦虑', '精神动力学', '亲子沟通'],
      location: ['全部地点', '静安寺店', '陆家嘴店'],
      sex: ['全部性别', '男咨询师', '女咨询师'],
      position: ['全部职位', '专业咨询师', '专家级咨询师', '资深级咨询师', '督导级咨询师'],
      counselType: ['全部形式', '单人咨询', '多人咨询', '团体活动', '企业EAP'],
      conditionForm: {},
      queueingId: 0,

      counselorList: [],
      isShow: [],
      isHoverEvent: [],
      skip: 0,
      hasGetAll: false,

      showingCounselor: {},
      hoverX: 0,
      hoverY: 0,
      hoverDisplay: false,
      isHover: false,
    }
  },
  methods: {
    getImg(name) {
      return getAssetsFile(name)
    },
    mouseEnterItem(index1, index2) {
      this.isHover = true
      const index = index1 * 4 + index2
      setTimeout(() => {
        this.showingCounselor = this.counselorList[index1 * 4 + index2]

        this.showingCounselor.avatar = 'counselor' + ((index1 * 4 + index2) % 4 + 1) + '.png'

        this.hoverX = this.$refs['counselor' + index][0].getBoundingClientRect().left
        // 这里不必要减最左元素的边距，减了反而会出错（可能是因为flex内获取的left不准确）
        this.hoverY = this.$refs['counselor' + index][0].getBoundingClientRect().top
            - this.$refs['counselor' + 0][0].getBoundingClientRect().top
        this.hoverDisplay = true
      }, 100)

    },
    mouseLeaveItem() {
      this.isHover = false
      setTimeout(() => {
        // console.log(this.isHover)
        if (!this.isHover)
          this.hoverDisplay = false
      }, 500)
    },
    getSearchCondition() {


      let fieldLabel = undefined
      if (this.conditionForm['field'] && this.conditionForm['field'].text.indexOf('全部') !== -1)
        fieldLabel = this.conditionForm['field'].text
      let location = undefined
      if (this.conditionForm['location'] && this.conditionForm['location'].text.indexOf('全部') !== -1)
        location = this.conditionForm['location'].text
      let form = undefined
      if (this.conditionForm['counselType'] && this.conditionForm['counselType'].text.indexOf('全部') !== -1)
        form = this.conditionForm['counselType'].text

      let sex = undefined
      if (this.conditionForm['sex'] && this.conditionForm['sex'].index !== 0)
        sex = this.conditionForm['sex'].index - 1
      let position = undefined
      if (this.conditionForm['position'] && this.conditionForm['position'].index !== 0)
        position = this.conditionForm['position'].index - 1

      return {
        counselorName: this.searchName,
        priceLowerBound: this.range[0] - 1,
        priceUpperBound: this.range[1] + 1,
        fieldLabel,
        location,
        sex,
        position,
        form,
        skip: this.skip
      }
    },
    filterChange(selectBlock) {
      this.conditionForm[selectBlock.type] = selectBlock
      this.filterSearchWrapper(true)
    },
    filterSearchWrapper(isToClear) {
      this.queueingId++
      const queueingIdFrozen = this.queueingId

      setTimeout(() => {
        if (this.queueingId === queueingIdFrozen) {
          if(isToClear){
            this.skip = 0
            this.hasGetAll = false
            this.isHover = false
            this.showingCounselor = {}
            this.counselorList = []
          }
          this.fetchSearch()
        }
      }, 1000)
    },
    fetchSearch() {
      this.$request.post('/counselor/list', {
        ...this.getSearchCondition()
      }).then((res) => {
        this.skip++
        this.counselorList.push(...res.msg)
        if (res.msg.length < 8) {
          this.hasGetAll = true
        }
      })
    }
  },
  mounted() {// 观察底部
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !this.hasGetAll) {
        this.filterSearchWrapper()
        // this.fetchSearch()
      } else {
        // console.log('left bottom')
      }
    }, {threshold: .6});
    const bottomFrame = document.getElementById("bottom-frame")
    observer.observe(bottomFrame)

  }
}
</script>

<style scoped>

.v-enter-active {
  transition: opacity 0.2s ease-in-out;
}

.v-leave-active {
  transition: opacity 0.1s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.row-enter-active,
.row-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.row-enter-from,
.row-leave-to {
  opacity: 0;
}

#main-frame {
  padding: 30px 200px 50px 200px;
}


#search-frame {
}

#head-search-frame {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 30px;
}

#head-search-frame :deep(.el-input) {
  width: 200px;
  /*display: inline-block;*/
  margin-right: 50px;
}

#head-search-frame span {
  margin-right: 20px;
}

#head-search-frame :deep(.el-slider) {
  width: 500px;
  margin-right: 30px;
}

#head-search-frame :deep(.el-slider__bar) {
  background-color: var(--blue);
}

.counselor-hover {
  width: 300px;
  /*height: 500px;*/
  position: absolute;
  z-index: 1;
  background-color: white;
  box-shadow: -2px 2px 3px var(--pink), 2px -2px 3px var(--blue);
  text-align: center;
  /*transition: opacity 0.2s ease-in-out;*/
}

.counselor-hover img {
  width: 300px;
  height: 300px;
  object-fit: cover;
}


#counselor-hover-title {
  padding-top: 10px;
  height: 100px;
  box-sizing: border-box;
  text-align: center;
}

#counselor-hover-title h1 {
  margin: 10px 0 0 0;
  font-size: 24px;
}

#counselor-hover-title h2 {
  margin: 5px 0 0 0;
  font-size: 16px;
  font-weight: normal;
}

#counselor-hover-field {
  padding: 10px 15px 20px 15px;
  /*height: 150px;*/
  overflow-y: hidden;
  text-align: left;
}

#counselor-hover-field p {
  display: inline-block;
  padding: 5px 8px;
  margin: 5px;
  border: 1px solid lightslategrey;
  border-radius: 10px;
  font-size: 16px;
}

.counselor-row-frame {
  padding-bottom: 60px;
}

.banner-frame {
  width: 100%;
  height: 300px;
  /*margin: 20px 0 40px 0;*/
  /*transform: translateY(5px);*/
  overflow: hidden;
}

.shadow {
  height: 300px;
  width: 106vw;
  transform: translate(-3vw);
  box-shadow: inset 0 0 10px grey;
}

.counselor-entry-frame {
  position: absolute;
  z-index: 0;
  transform: translateY(-300px);
  /*  100margin+100title+300img*/
  display: flex;
  width: 100%;
  /*flex-wrap: wrap;*/
  justify-content: center;
}

.counselor-item {
  width: 300px;
  height: 300px;
  margin: 0 10px;
  position: relative;
  z-index: 2;
  /*border-radius: 20px;*/
  /*transform: translateY(5px);*/
  transition: background-color 0.2s linear, box-shadow 0.2s linear;
}

.counselor-item img {
  width: 300px;
  height: 300px;
  object-fit: cover;
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