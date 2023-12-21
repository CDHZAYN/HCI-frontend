<template>
  <div id="frame" @mouseenter="isHover = true" @mouseleave="isHover = false">
    <img :src="getImg(img)"/>
    <h1>{{title}}</h1>
    <div id="gradient-bg" :class="{'is-hover': isHover}">
      <div>
        <p>{{description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import getAssetsFile from "../../assets/getAssetsFile.js";

export default {
  name: "ProjectItem",
  props:{
    title: String,
    img: String,
    description: String
  },
  data(){
    return{
      isHover: false,
      projectList: [
        {
          title: '单人咨询',
          description: '单人咨询服务旨在提供个性化的支持，帮助您表达内心的感受和想法，解决情绪管理、人际关系、压力和焦虑等方面的困扰，帮助您建立更健康、积极的心理模式，提升生活质量。',
          img: '预评估访谈.png',
        }, {
          title: '家庭/多人咨询',
          description: '家庭/多人咨询中，通过倾听您和他人的观点和感受，我们将共同探讨家庭或团队动态、沟通模式、以及可能存在的冲突或挑战。我们将致力于改善您和他人的关系，并帮助您和他人更好地应对生活中的各种挑战，增强情感共鸣。',
          img: '家庭多人咨询.png',
        }, {
          title: '企业EAP项目',
          description: '企业EAP项目致力于为员工提供个性化的支持，通过协作式对话，帮助他们有效应对情绪管理技巧、职业发展支持、工作与生活平衡等方面的问题。协助员工克服挑战，提高绩效，提高其在职场和生活中的整体满意度。',
          img: '企业EAP项目.png',
        }, {
          title: '团体活动',
          description: '我们定期举办团体心理辅导活动，邀请知名咨询师探讨各种主题，如人际关系、情绪管理、自我认知等。通过分享和倾听他人的经历，您将有机会更深入地了解自己，找到新的视角和解决问题的方法。',
          img: '团体活动.png',
        }, {
          title: '抑郁/性格自测',
          description: '通过我们提供的抑郁自测文章，您可以评估当前的情绪状态，发掘您的感受、思维模式和生活中的压力因素。性格自测文章则旨在帮助您了解自己的性格特点和倾向，帮助改善您的行为模式、应对压力的方式以及与他人互动的风格。',
          img: '抑郁性格自测.png',
        }
      ]
    }
  },
  methods:{
    getImg(name){
      return getAssetsFile(name)
    }
  }
}
</script>

<style scoped>
  #frame{
    width: 480px;
    height: 180px;
    overflow: hidden;
    margin: 10px;
  }

  #frame img{
    position: absolute;
    z-index: -2;
    width: 480px;
    height: 180px;
    object-fit: cover;
  }

  #frame #gradient-bg{
    position: relative;
    z-index: -1;
    width: 480px;
    height: 181px;
    opacity: .8;
    background-image: linear-gradient(to bottom, var(--pink) 20%, var(--blue) 80%);
    transform: translateY(180px);
    transition: transform 0.5s ease-in-out;
  }

  #frame #gradient-bg.is-hover{
    transform: translateY(-51px);
  }

  #frame h1{
    height: 50px;
    font-size: 26px;
    padding: 20px 0 0 20px;
    box-sizing: border-box;
    color: white;
    text-shadow: 2px 2px 10px black;
    margin: 0;
    /*margin-bottom: 20px;*/
  }

  #frame p{
    margin: 0;
    padding: 70px 20px;
  }
</style>