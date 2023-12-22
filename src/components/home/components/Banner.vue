<template>
  <div id="main-frame">
    <div id="banner">
      <div id="banner-decoration">
        <img id="dec2" :src="getImg('蓝圆.png')">
        <img id="dec1" :src="getImg('蓝圆.png')">
        <img id="dec3" :src="getImg('粉圆.png')">
        <img id="dec4" :src="getImg('粉圆.png')">
      </div>
      <Transition mode="out-in" name="text">
        <div id="banner-text" :key="list[showingIndex].title">
          <h1 v-html="list[showingIndex].title"></h1>
          <h2>——{{ list[showingIndex].subtitle }}</h2>
        </div>
      </Transition>
      <Transition mode="out-in" name="avatar">
        <div id="avatar-frame" :key="list[showingIndex].title">
          <img id="avatar" :src="getImg(list[showingIndex].avatar)" alt="counselor"/>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>
import getAssetsFile from "../../../assets/getAssetsFile.js";

export default {
  name: "Banner",
  data() {
    return {
      showingIndex: 0,
      list: [
        {
          title: '遇到悲伤，<br>可以信赖一个人，<br>信赖当下的环境。',
          subtitle: '泽恩资深咨询师 程冰',
          avatar: 'counselor4.png'
        }, {
          title: '生命是<br>一个体验的过程，<br>你并不孤单。',
          subtitle: '泽恩资深咨询师 陈铿',
          avatar: 'counselor1.png'
        }, {
          title: '无论经历什么困难，<br>我会一直在这里<br>陪伴着你。',
          subtitle: '泽恩资深咨询师 李诗淼',
          avatar: 'counselor3.png'
        }
      ]
    }
  },
  methods: {
    getImg(name) {
      return getAssetsFile(name)
    }
  },
  mounted() {
    setInterval(() => {
      this.showingIndex = (this.showingIndex + 1) % this.list.length
    }, 4000)
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

.text-enter-active {
  transition: transform 0.7s ease-in-out, opacity 0.7s linear;
}

.text-leave-active {
  transition: transform 0.3s ease-in-out, opacity 0.3s linear;
}

.text-enter-from,
.text-leave-to {
  transform: translateX(-30%);
  opacity: 0;
}

.avatar-enter-active,
.avatar-leave-active {
  transition: transform 0.3s ease-in-out, opacity 0.3s linear;
}

.avatar-enter-from,
.avatar-leave-to {
  opacity: 0;
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
    scale: .8;
    opacity: 40;
  }
  66% {
    transform: translate(20%, -10%);
    opacity: 80;
    scale: .5;
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
  background-image: -webkit-linear-gradient(bottom left, var(--pink) 30%, var(--blue) 50%);
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