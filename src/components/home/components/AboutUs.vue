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
  <div id="counselor-shadow-frame">
    <div id="counselor-shadow">
    </div>
  </div>
  <div id="counselor-frame">
    <div v-for="(item, index) in counselorList"
         :class="{'counselor-item': true, 'counselor-item-border-show': isShow[index]}"
         :style="{'transform': `translate(-${(timeCnt) % (320 * counselorList.length / 2 - 50)}px, 5px)`}">
      <div :class="{ 'item-hover-not-show': !isShow[index], 'counselor-item-title': true}">
        <h1>{{ item.name }}</h1>
        <h2>{{ positionMap[item.position] }}</h2>
      </div>
      <a href="/counselor/0">
        <div class="img-frame">
          <img :src="getImg('counselor' + (index % 4 + 1) + '.png')" @mouseenter="mouseEnterItem(index)" @mouseleave="mouseLeaveItem(index)"/>
        </div>
      </a>
      <div :class="{'item-hover-not-show': !isShow[index], 'counselor-item-field':true}">
        <p v-for="fieldItem in item.fieldLabel">{{ fieldItem }}</p>
      </div>
    </div>
  </div>

</template>

<script>
import getAssetsFile from "../../../assets/getAssetsFile.js";

export default {
  name: "AboutUs",
  data() {
    return {
      counselorList: [],
      positionMap: ['专业咨询师', '专家级咨询师', '资深级咨询师', '督导级咨询师'],
      isShow: [],
      timeCnt: 0,
      timer: null
    }
  },
  methods: {
    getImg(name) {
      return getAssetsFile(name)
    },
    mouseEnterItem(index) {
      this.isShow[index] = true
      clearInterval(this.timer)
    },
    mouseLeaveItem(index) {
      this.isShow[index] = false
      this.timer = setInterval(() => ++this.timeCnt, 50)
    }
  },
  mounted() {
    this.timer = setInterval(() => ++this.timeCnt, 50)
    this.counselorList = []
    this.$request.post('/counselor/list', {
      position: 3,
      skip: 0,
    }).then((res)=>{
      this.counselorList.push(...res.msg, ...res.msg)
    })
  }
}
</script>

<style scoped>

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

#counselor-shadow-frame {
  width: 100%;
  height: 300px;
  margin: 50px 0 100px 0;
  transform: translateY(5px);
  overflow: hidden;
}

#counselor-shadow {
  height: 300px;
  width: 106vw;
  transform: translate(-3vw);
  box-shadow: inset 0 0 10px grey;
}

#counselor-frame {
  position: absolute;
  z-index: 2;
  transform: translateY(-500px);
  display: flex;
  width: 100%;
  height: 600px;
  overflow-x: hidden;
  /*overflow-y: visible;*/
  /*  100margin+100title+300img*/
}

.counselor-item {
  width: 300px;
  height: 550px;
  margin: 0 10px;
  /*border-radius: 20px;*/
  transform: translateY(5px);
  transition: background-color 0.2s linear, box-shadow 0.2s linear;
}

.counselor-item-border-show {
  background-color: white;
  box-shadow: -2px 2px 3px var(--pink), 2px -2px 3px var(--blue);
}

.item-hover-not-show {
  opacity: 0;
}


.counselor-item .counselor-item-title {
  padding-top: 10px;
  height: 100px;
  box-sizing: border-box;
  text-align: center;
  transition: opacity 0.2s linear;
}

.counselor-item .counselor-item-title h1 {
  margin: 10px 0 0 0;
  font-size: 24px;
}

.counselor-item .counselor-item-title h2 {
  margin: 5px 0 0 0;
  font-size: 16px;
  font-weight: normal;
}

.counselor-item .img-frame {
  width: 300px;
  height: 300px;
}

.counselor-item .img-frame img {
  width: 300px;
  height: 300px;
  object-fit: cover;
}

.counselor-item .counselor-item-field {
  padding: 0 10px;
  height: 150px;
  transition: opacity 0.2s linear;
  overflow-y: hidden;
}

.counselor-item .counselor-item-field p {
  display: inline-block;
  padding: 5px 8px;
  margin: 5px;
  border: 1px solid lightslategrey;
  border-radius: 10px;
  font-size: 16px;
}

</style>