<template>
  <div class="footer">
    <div class="left">  
       <slot name="left">footer</slot>
    </div>
    <div class="middle"> 
         <slot name="middle">
           ©版权声明 XXXXX 

         </slot> 
    </div>
    <div class="right">
        <slot name="right">
          link / text
        </slot>
    </div>
   
 
     
 </div>
</template>

<script>
export default {
  name: 'Footer',
  data() { 
    return {

    }
  },
  components:{
  },
  methods:{

  },
  mounted() {

  },
 }
</script>

<style scoped>
  .footer{
    display: flex;
    width: 100%;  
    background-color: gold;
  }
  .left,.right{
    width: 200px;
  }
  .middle{
    flex:1
  }

</style>