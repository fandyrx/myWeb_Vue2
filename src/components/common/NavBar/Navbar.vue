<template>
  <div class="nav-bar">
      <div class="left"><slot name="left">左侧图标</slot></div>
      <div class="middle"><slot name="middle" >分类</slot></div>
      <div class="right"><slot name="right" >登录</slot></div>
 </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() { 
    return {

    }
  },
  mounted() {

  },
 }
</script>

<style scoped>
  .nav-bar{
    height: 64px;
    line-height: 64px;
    display: flex;
    width: 100%;
    /* background-color: pink; */
  }
  .left, .right{
    padding: 0 20px;
    /* background-color: lightblue; */
  }
  .middle {
    flex:1
  }
</style>