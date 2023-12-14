<template>
  <div id="list-frame" ref="listFrame">
    <div id="list-select-block"
         :style="{width: `${blockWidth}px`,transform: `translate(${blockOffsetX}px, ${blockOffsetY - 4}px)`,
         'background-color': colorMap[color]}"></div>
    <p v-for="(item, index) in list" :ref="'item'+index" @click="itemSelecting=index">{{ item }}</p>
  </div>
</template>

<script>
export default {
  name: "BlockSelector",
  props:{
    list: Array,
    color: String
  },
  data(){
    return{
      itemSelecting: 0,
      blockOffsetX: 0,
      blockOffsetY: 0,
      blockWidth: 0,
      colorMap:{
        'blue': 'rgb(115, 204, 255)',
        'pink': 'rgb(225, 94, 145)',
      }
    }
  },
  watch: {
    itemSelecting: {
      handler(newVal, oldVal) {

        this.$refs['item' + oldVal][0].style.color = 'black'
        this.$refs['item' + newVal][0].style.color = 'white'

        this.blockOffsetX = this.$refs['item' + newVal][0].getBoundingClientRect().left
            - this.$refs['item' + 0][0].getBoundingClientRect().left
        this.blockOffsetY = this.$refs['item' + newVal][0].getBoundingClientRect().top
            - this.$refs['item' + 0][0].getBoundingClientRect().top
        this.blockWidth = this.$refs['item' + newVal][0].clientWidth + 20
      }
    }
  },
  mounted() {
    this.$refs['item' + 0][0].style.color = 'white'
    this.blockWidth = this.$refs['item' + 0][0].clientWidth + 20
  }
}
</script>

<style scoped>

#list-frame{
  margin: 10px 0;
}

#list-frame p {
  margin: 0 10px;
  box-sizing: border-box;
  display: inline-block;
  height: 30px;
  cursor: pointer;
  transition: color 0.2s linear;
}

#list-select-block {
  position: absolute;
  z-index: -1;
  height: 30px;
  background-color: rgb(115, 204, 255);
  transition: all 0.2s ease-in-out;
  border-radius: 3px;
}
</style>