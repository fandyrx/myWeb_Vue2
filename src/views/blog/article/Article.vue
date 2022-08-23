<template>
  <div>
    

    <ul>
      <li v-for="(item,index) in showLis" :key="index">
        {{index+1}}.{{item}}
      </li>
    </ul>
  
    <el-input 
      type="text"
        v-model="text"
       placeholder="showSomething" 
       @change="handleChange">
    </el-input>
 </div>
</template>

<script>
export default {
  name: 'Article',
  data() { 
    return {  
     text:'',
     showLis:[]
    }
  },
  methods:{
    handleChange(value){
     
      if(this.showLis.length > 19){
        return    this.$message('最大输入20条信息')
      
      }else{
         let str = value.trim()

          str != '' ? this.showLis.push(str): this.$message('输入不能为空')
          this.text = ''
      }
          
    }
  },
  mounted() {
      
  },
 }
</script>

<style scoped>
.el-input{
  
  width: 300px;
}
</style>