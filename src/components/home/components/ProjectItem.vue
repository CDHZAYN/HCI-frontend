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
import getAssetsFile from "../../../assets/getAssetsFile.js";

export default {
  name: "ProjectItem",
  props:{
    title: String,
    img: String,
    description: String
  },
  data(){
    return{
      isHover: false
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
    background-image: linear-gradient(to bottom, rgb(225, 94, 145) 20%, rgb(115, 204, 255) 80%);
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