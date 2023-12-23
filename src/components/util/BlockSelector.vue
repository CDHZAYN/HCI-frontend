<template>
  <div id="list-frame" ref="listFrame">
    <div id="list-select-block"
         :style="{width: `${blockWidth}px`,transform: `translate(${blockOffsetX}px, ${blockOffsetY - 4}px)`,
         'background-color': colorMap[color]}"></div>
    <p v-for="(item, index) in list" :ref="'item'+index" @click="changeHover(index)">{{ item }}</p>
  </div>
</template>

<script>
export default {
  name: "BlockSelector",
  props: {
    list: Array,
    type: String,
    color: String
  },
  data() {
    return {
      itemSelecting: 0,
      blockOffsetX: 0,
      blockOffsetY: 0,
      blockWidth: 0,
      colorMap: {
        'blue': 'var(--light-blue)',
        'pink': 'var(--light-pink)',
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
  methods: {
    changeHover(index) {
      this.isHover = true
      this.itemSelecting = index
      this.$emit('changeSelect', {
        index,
        type: this.type,
        text: this.list[index]
      })
    }
  },
  mounted() {
    this.$refs['item' + 0][0].style.color = 'white'
    this.blockWidth = this.$refs['item' + 0][0].clientWidth + 20
    this.$emit('changeSelect', {
      index: 0,
      type: this.type,
      text: this.list[0]
    })
  }
}
</script>

<style scoped>

#list-frame {
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
  transition: all 0.2s ease-in-out;
  border-radius: 3px;
}
</style>