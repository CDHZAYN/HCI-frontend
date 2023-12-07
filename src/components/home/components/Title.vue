<template>
  <div id="frame">
    <div id="sub-frame">
      <h1>{{ title }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "Title",
  props: {
    title: String
  }
}
</script>

<style scoped>
#frame {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 80px;
  background-image: linear-gradient(to right, rgb(225, 94, 145) 20%, rgb(115, 204, 255) 70%);
  padding: 0 200px;
  box-sizing: border-box;
}

#sub-frame{
  height: 100%;
  display: flex;
  align-items: center;
}

#frame h1 {
  line-height: 60px;
  color: white;
}
</style>