<template>
  <div class="blank"></div>
  <div id="games-background">
    <div class="games">
      <a class="game" v-for="item in items" @mouseenter="item.isHover = true" @mouseleave="item.isHover = false"
         :href="item.src? item.src: 'javascript:void(0);'">
        <img :src="item.avatar? item.avatar : getUrl('studio.png')" :alt="item.name">
        <div class="name">
          <h1>{{ item.name }}</h1>
        </div>
        <div class="keywords">
          <p v-for="(keyword, index) in item.keywords">
            {{ keyword }}<span v-show="index!==item.keywords.length-1">&nbsp;/&nbsp;</span>
          </p>
        </div>
        <Transition name="border1">
          <div class="game-border1" v-show="item.isHover"></div>
        </Transition>
        <Transition name="border2">
          <div class="game-border2" v-show="item.isHover"></div>
        </Transition>
      </a>
    </div>
  </div>
  <div class="blank"></div>
</template>

<script>
import getAssetsFile from "../../assets/getAssetsFile.js";

export default {
  name: "Games",
  data() {
    return {
      items: []
    }
  },
  methods: {
    getUrl(name) {
      return getAssetsFile(name)
    }
  },
  // created() {
  mounted() {
    this.$request.get('/game/get',
        {}).then((response) => {
      // this.items.push({
      //   name: 'BAG',
      //   keywords: ['component', 'opensource'],
      //   src: '../bag'
      // })
      this.items = this.items.concat(response.msg)
    });
  }
}
</script>

<style scoped>

.border1-leave-active {
  transition-delay: 0.3s;
}

.border2-enter-active,
.border2-leave-active {
  transition: opacity 0.3s linear;
}

.border2-enter-from,
.border2-leave-to {
  opacity: 0
}

.blank {
  height: 50px;
}

#games-background {
  /*position: relative;*/
  width: 100vw;
  background: linear-gradient(#FAFAF4 0, #FAFAF4 80%, rgba(255, 202, 2, 0.2) 100%);
  background-size: 100% 370px;
  background-position-y: -110px;
  /*z-index: -2;*/
}

.games {
  display: flex;
  flex-wrap: wrap;
  width: 80vw;
  margin: 0 auto;
  justify-content: space-around;
}

.games .game {
  width: 250px;
  height: 350px;
  margin: 10px;
  position: relative;
  background: #FAFAF4;
  border-radius: 10px;
  z-index: 2;
}

.games .game .game-border1 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #FAFAF4;
  border-radius: 10px;
  z-index: -1;
  transition: display 0.3s linear;
}

.games .game .game-border2 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(255, 202, 2, 1) 0, rgba(232, 58, 55, 1) 100%);
  filter: blur(7px);
  border-radius: 10px;
  z-index: -2;
  transition: all 0.3s linear;
  text-decoration: none;
}

.games .game img {
  width: 250px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}

.games .game .name {
  display: block;
  text-align: center;
  text-decoration: none;
}

.games .game .name h1 {
  display: inline-block;
  margin: 8px;
  font-size: 23px;
  color: black;
}

.games .game .keywords {
  text-align: center;
}

.games .game .keywords p {
  display: inline-block;
  margin: 0;
  color: black;
}

.games .game .keywords p span {
  color: #FFCA02;
}

</style>