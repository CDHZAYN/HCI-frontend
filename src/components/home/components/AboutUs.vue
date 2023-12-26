<template>
  <div id="main-frame">
    <div id="flex-frame">
      <div>
        <img :src="getImg('认可.png')"/>
        <div class="text-frame">
          <h1>认可</h1>
          <p><b>99%</b> 好评率</p>
          <p><b>13W+</b> 全平台关注量</p>
          <p>与知名高校、企业深度合作</p>
        </div>
      </div>
      <div class="division-line"></div>
      <div>
        <img :src="getImg('专业.png')"/>
        <div class="text-frame">
          <h1>专业</h1>
          <p><b>20000h+</b> 人均咨询时长</p>
          <p><b>100%</b> 重点高校硕士</p>
          <p><b>100%</b> 持专业资质证书</p>
        </div>
      </div>
      <div class="division-line"></div>
      <div>
        <img :src="getImg('信赖.png')"/>
        <div class="text-frame">
          <h1>信赖</h1>
          <p><b>全流程</b> 保障来访者隐私</p>
          <p>支持线上视频/线下咨询</p>
          <p>支持随时取消预约</p>
        </div>
      </div>
    </div>
  </div>
  <!--  <div id="counselor-shadow-frame">-->
  <!--    <div id="counselor-shadow">-->
  <!--    </div>-->
  <!--  </div>-->
  <!--  <div id="counselor-frame">-->
  <!--    <div>-->
  <!--      <div v-for="(item, index) in counselorList"-->
  <!--           :class="{'counselor-item': true, 'counselor-item-border-show': isShow[index]}"-->
  <!--           >-->
  <!--        <div :class="{ 'item-hover-not-show': !isShow[index], 'counselor-item-title': true}">-->
  <!--          <h1>{{ item.name }}</h1>-->
  <!--          <h2>{{ positionMap[item.position] }}</h2>-->
  <!--        </div>-->
  <!--        <a :href="/counselor/ + item.id">-->
  <!--          <div class="img-frame">-->
  <!--            <img :src="item.profile" @mouseenter="mouseEnterItem(index)" @mouseleave="mouseLeaveItem(index)"/>-->
  <!--          </div>-->
  <!--        </a>-->
  <!--        <div :class="{'item-hover-not-show': !isShow[index], 'counselor-item-field':true}">-->
  <!--          <p v-for="fieldItem in item.fieldLabel">{{ fieldItem }}</p>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
  <Transition appear>
    <div class="counselor-hover" v-show="hoverDisplay" @mouseleave="mouseLeaveItem()"
         :style="{'transform': `translate(${hoverX}px, ${hoverY - 100}px)`}" :key="showingCounselor.name">
      <div id="counselor-hover-title">
        <h1>{{ showingCounselor.name }}</h1>
        <h2>{{ positionMap[showingCounselor.position] }}</h2>
      </div>
      <a :href="'/counselor/' + showingCounselor.id">
        <div style="width: 300px; height: 300px;">
          <img :src="showingCounselor.profile"/>
        </div>
      </a>
      <div id="counselor-hover-field">
        <p v-for="item in showingCounselor.fieldLabel">{{ item }}</p>
      </div>
    </div>
  </Transition>
  <div class="counselor-row-frame">
    <div class="banner-frame">
      <div class="shadow">
      </div>
    </div>
    <Transition name="row" appear :duration="400">
      <div class="counselor-entry-frame">
        <div :style="{'transform': `translate(-${(timeCnt) % (320 * counselorList.length / 2 - 50)}px, 0)`}">
          <div v-for="(item, index) in counselorList"
               class="counselor-item" :ref="'counselor' + index">
            <img :src="item.profile"
                 @mouseenter="mouseEnterItem(index)"/>
          </div>
        </div>
      </div>
    </Transition>
  </div>

</template>

<script>
import getAssetsFile from "../../../assets/getAssetsFile.js";

export default {
  name: "AboutUs",
  data() {
    return {

      hoverX: 0,
      hoverY: 0,
      hoverDisplay: false,
      showingCounselor: {},
      timer: null,

      counselorList: [],
      positionMap: ['专业咨询师', '专家级咨询师', '资深级咨询师', '督导级咨询师'],
      isShow: [],
      timeCnt: 0,
    }
  },
  methods: {
    getImg(name) {
      return getAssetsFile(name)
    },
    mouseEnterItem(index) {
      this.isHover = true
      clearInterval(this.timer)
      setTimeout(() => {
        this.showingCounselor = this.counselorList[index]

        console.log(index)

        this.hoverX = this.$refs['counselor' + index][0].getBoundingClientRect().left
        // 这里不必要减最左元素的边距，减了反而会出错（可能是因为flex内获取的left不准确）
        this.hoverY = this.$refs['counselor' + index][0].getBoundingClientRect().top
            - this.$refs['counselor' + 0][0].getBoundingClientRect().top + 60
        this.hoverDisplay = true
      }, 100)

    },
    mouseLeaveItem() {
      this.timer = setInterval(() => ++this.timeCnt, 50)
      this.isHover = false
      setTimeout(() => {
        // console.log(this.isHover)
        if (!this.isHover)
          this.hoverDisplay = false
      }, 10)
    },
  },
  mounted() {
    this.timer = setInterval(() => ++this.timeCnt, 50)
    this.counselorList = []
    this.$request.post('/counselor/list', {
      position: 3,
      skip: 0,
    }).then((res) => {
      this.counselorList.push(...res.msg, ...res.msg)
    })
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
  padding: 0 200px;
}

#flex-frame {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.division-line {
  background-image: linear-gradient(to bottom, var(--pink) 20%, var(--blue) 80%);
  width: 4px; /*设置宽高*/
  height: 300px;
}

#flex-frame :nth-child(n) {
  text-align: center;
}

#flex-frame :nth-child(1) img, #flex-frame :nth-child(5) img {
  margin: 40px 0;
  width: 100px;
}

#flex-frame :nth-child(3) img {
  width: 180px;
}

#flex-frame h1 {
  text-align: center;
  font-size: 30px;
}

#flex-frame p {
  text-align: center;
  font-size: 20px;
  line-height: 20px;
}

.counselor-hover {
  width: 300px;
  /*height: 500px;*/
  position: absolute;
  z-index: 3;
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
  padding: 10px 10px 20px 10px;
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
  padding: 60px 0;
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
  /*  100margin+100title+300img*/
  width: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  transform: translateY(-300px);
}

.counselor-entry-frame > div {
  display: flex;
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

</style>