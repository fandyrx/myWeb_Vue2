<template>
  <div class="nav-bar">
      <div class="left"><slot name="left"></slot></div>
      <div class="middle"><slot name="middle" ></slot></div>
      <div class="right"><slot name="right" ></slot></div>
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
    line-height: 100%;
    display: flex;
    justify-content: space-between;
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