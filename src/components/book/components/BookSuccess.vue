<template>
  <div id="main-frame">
    <el-icon :size="80" :color="'rgb(115, 204, 255)'">
      <CircleCheck/>
    </el-icon>
    <h1>您的预约已提交</h1>
      <el-button @click="$emit('nextTo', 0)">进行新预约</el-button>
  </div>
</template>

<script>

import {CircleCheck} from "@element-plus/icons-vue";

export default {
  name: "BookSuccess",
  components: {CircleCheck}
}
</script>

<style scoped>
#main-frame{
  padding: 30px 200px 50px 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>