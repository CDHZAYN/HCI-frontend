<template>
  <div id="banner-frame">
    <div id="shadow">
      <img :src="getImg('counselor1.png')"/>
      <div id="text-frame">
        <div id="title-frame">
          <h1>陈铿</h1>
          <div>
            <h2>资深级咨询师</h2>
            <h2>静安咨询室</h2>
          </div>
        </div>
        <div id="award-frame">
          <div v-for="item in award" class="award-item-frame"
               :style="{'background-image': `URL(${getImg('麦穗.png')})`}">
            <p v-html="item"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="main-frame">
    <h1>个人简介</h1>
    <p v-html="introduction.replaceAll('\n', '<br/>')"></p>
    <h1>擅长领域</h1>
    <p v-html="field.replaceAll('\n', '<br/>')"></p>
    <h1>咨询流派与方式</h1>
    <p v-html="method.replaceAll('\n', '<br/>')"></p>
    <h1>费用说明</h1>
    <p v-html="price.replaceAll('\n', '<br/>')"></p>
    <h1>给来访者的话</h1>
    <p v-html="poison.replaceAll('\n', '<br/>')"></p>
    <div id="button-frame">
      <el-button @click="login()" id="button" type="primary">现在预约</el-button>
    </div>
  </div>
</template>

<script>
import getAssetsFile from "../../assets/getAssetsFile.js";

export default {
  name: "CounselorDetail",
  data() {
    return {
      award: ['华东师大<br>应用心理硕士', '国家二级<br>心理咨询师', '上海市<br>心理学会会员', '加州健康研究院<br>认证正念师资'],
      introduction: '华东师大应用心理硕士（临床咨询方向）\n' +
          '国家二级心理咨询师\n' +
          '上海市心理学会会员\n' +
          'CIH加州健康研究院认证正念师资\n' +
          '学习7年，执业4年\n' +
          '累计个体咨询1000+h，团体咨询500+h\n' +
          '持续接受个体督导80+h，团体督导200+h，\n' +
          '朋辈督导100+h 持续接受个人分析100+h，\n' +
          '团体成长200+h\n' +
          '服务于社会机构、企业、高校、医院、社区、部队、司法系统等\n' +
          '退伍军人，长期社会心理服务志愿者',
      field: '1、抑郁情绪及其引发的各种状态，包括：失去兴趣、自我评价低、容易疲惫、失眠、退缩、无意义感、记忆力减退等。\n' +
          '2、焦虑情绪及其引发的各种状态，包括：持续担心、注意力不集中、失眠、完美主义等。\n' +
          '3、青少年成长议题：情绪问题、考试焦虑、压力管理、自我认同问题、适应问题、厌学。\n' +
          '4、个人成长类议题。',
      method: '动力取向咨询、焦点解决短程咨询\n' +
          '咨询开始：咨询开始的1－4次为咨询准备阶段，主要工作包括评估咨询师与来访的匹配度；介绍咨询设置与咨询方式；讨论和明确咨询目标。\n' +
          '咨询过程：根据已确认的咨询目标、来访人格发展水平及个人意愿等，进行低频（每周1－2次）或高频（每周3－4次）的一对一咨询。\n' +
          '咨询结束：咨询结束阶段，根据来访的实际情况，缓慢降频直至咨询结束，并在结束前预留1－4次对咨询过程进行回顾，并对由结束咨询引发的情绪感受进行讨论。',
      price: '1 伴侣治疗 通常750元/1小时，首访通常为90分钟，运用精神分析伴侣治疗的疗法，比较注重伴侣之间的关系互动，已婚及未婚的伴侣，同性及异性的伴侣均可进行伴侣咨询。\n' +
          '2 个体咨询: 通常每次50份，收费500元，首访可能需要90分钟，收费750元。',
      poison: '与其看管1000头羊，不如找寻回一只迷途羔羊\n' +
          '在你迷途的路上，有我'
    }
  },
  methods: {
    getImg(name) {
      return getAssetsFile(name)
    }
  }
}
</script>

<style scoped>

#banner-frame {
  width: 100%;
  height: 400px;
  margin: 40px 0;
  overflow: hidden;
}

#shadow {
  height: 400px;
  width: 106vw;
  transform: translate(-3vw);
  display: flex;
  justify-content: center;
  box-shadow: inset 0 0 10px grey;
}

#banner-item-frame img {
  width: 400px;
  height: 400px;
  object-fit: cover;
}

#text-frame {
  width: 600px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#title-frame {
  display: flex;
  align-items: center;
  margin: 0 auto
}

#title-frame h1 {
  font-size: 80px;
  margin: 0 20px 0 0;
}

#title-frame h2 {
  font-size: 26px;
  font-weight: normal;
  margin: 0;
}

#award-frame {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.award-item-frame {
  width: 250px;
  height: 100px;
  background-size: contain;
  background-repeat: no-repeat;
}

#award-frame p {
  text-align: center;
}

#main-frame {
  padding: 0 200px 50px 200px;
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