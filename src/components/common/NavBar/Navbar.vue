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
    width: 100%;
    height: 64px;
    display: flex;
    justify-content: space-between;
    line-height: 64px;
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