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
</template>

<script>
import getAssetsFile from "../../../assets/getAssetsFile.js";

export default {
  name: "AboutUs",
  data() {
    return {}
  },
  methods: {
    getImg(name) {
      return getAssetsFile(name)
    }
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
  background-image: linear-gradient(to bottom, rgb(225, 94, 145) 20%, rgb(115, 204, 255) 80%);
  width: 5px; /*设置宽高*/
  height: 300px;
}

#flex-frame :nth-child(n){
  text-align: center;
}

#flex-frame :nth-child(1) img, #flex-frame :nth-child(5) img{
  margin: 40px 0;
  width: 100px;
}
#flex-frame :nth-child(3) img{
  width: 180px;
}

#flex-frame h1{
  text-align: center;
  font-size: 30px;
}

#flex-frame p{
  text-align: center;
  font-size: 20px;
  line-height: 20px;
}

</style>