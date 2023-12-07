<template>
  <div id="main-frame">
    <div id="banner">
      <div id="banner-decoration">
        <img id="dec2" :src="getImg('蓝圆.png')">
        <img id="dec1" :src="getImg('蓝圆.png')">
        <img id="dec3" :src="getImg('粉圆.png')">
        <img id="dec4" :src="getImg('粉圆.png')">
      </div>
      <div id="banner-text">
        <h1>生命是<br>一个体验的过程，<br>你并不孤单。</h1>
        <h2>——泽恩资深咨询师 陈铿</h2>
      </div>
      <div id="avatar-frame">
        <img id="avatar" :src="getImg('counselor1.png')" alt="counselor"/>
      </div>
    </div>
  </div>
</template>

<script>
import getAssetsFile from "../../../assets/getAssetsFile.js";

export default {
  name: "Banner",
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

#banner {
  height: 90vh;
  overflow: hidden;
  /*display: flex;*/
  /*justify-content: space-around;*/
}

@keyframes move1 {
  0% {
    transform: translate(0, 0);
    width: 300px;
  }
  33% {
    transform: translate(-30%, 20%);
    width: 200px;
  }
  66% {
    transform: translate(10%, -10%);
    width: 150px;
  }
  100% {
    transform: translate(0, 0);
    width: 300px;
  }
}

@keyframes move2 {
  0% {
    transform: translate(0, 0);
    opacity: 100;
  }
  33% {
    transform: translate(5%, 20%);
    opacity: 60;
  }
  66% {
    transform: translate(20%, -10%);
    opacity: 80;
  }
  100% {
    transform: translate(0, 0);
    opacity: 100;
  }
}

@keyframes move3 {
  0% {
    transform: translate(0, 0);
    opacity: 100;
  }
  33% {
    transform: translate(0, 20%);
    opacity: 60;
  }
  66% {
    transform: translate(15%, -5%);
    opacity: 80;
  }
  100% {
    transform: translate(0, 0);
    opacity: 100;
  }
}

@keyframes move4 {
  0% {
    transform: translate(0, 0);
    width: 300px;
  }
  50% {
    transform: translate(-15%, 20%);
    width: 400px;
  }
  100% {
    transform: translate(0, 0);
    width: 300px;
  }
}


#banner-decoration {
}

#banner-decoration #dec1 {
  width: 300px;
  position: absolute;
  top: 325px;
  left: 125px;
  z-index: -1;
  object-fit: cover;
  animation: 10s infinite ease-in-out move1;
}

#banner-decoration #dec2 {
  width: 500px;
  position: absolute;
  top: 100px;
  left: 100px;
  z-index: -1;
  animation: 13s infinite ease-in-out move2;
}

#banner-decoration #dec3 {
  width: 250px;
  position: absolute;
  top: 50px;
  left: 100px;
  z-index: -1;
  animation: 9s infinite ease-in-out move3;
}

#banner-decoration #dec4 {
  width: 300px;
  position: absolute;
  top: 150px;
  left: 450px;
  z-index: -1;
  animation: 11s infinite ease-in-out move4;
}

#banner #banner-text {
  /*padding: 100px 0 0 20px;*/
  position: absolute;
  top: 50px;
  left: 200px;
  background-image: -webkit-linear-gradient(bottom left, rgb(225, 94, 145) 30%, rgb(115, 204, 255) 50%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

#banner h1 {
  font-size: 80px;
  line-height: 120px;
  font-weight: normal;
}

#banner h2 {
  padding-top: 0;
  font-size: 30px;
  font-weight: normal;
}

#banner #avatar-frame {
  width: 700px;
  position: absolute;
  top: 10px;
  right: 200px;
  transform: translateX(10%);
}

#banner #avatar {
  width: 100%;
  object-fit: cover;
}
</style>