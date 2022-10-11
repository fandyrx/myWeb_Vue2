<template>
  <div>
      测试demo输入框
    <ul>
      <li v-for="(item,index) in showLis" :key="index">
        <span class="context"> {{index+1}}.{{item}} </span>
        <button @click="deleteLi(index)" >删除</button> 
      </li>
    </ul>
     

    <InputDemo  
        type="text" 
        v-model="text"
        input-name="名字"
        placeholder="20Max showSomething" 
        @change="handleChange" 
        class="demo"
         />
   


   
 </div>
</template>

<script>
import InputDemo from  "../inputDemo/InputDemo.vue"
export default {
  name: 'Article',
  data() { 
    return {  
     text:'',
    
     showLis:[]
    }
  },
  components:{
      InputDemo
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
          
    },

    handleInput(value){
      
    
      this.text = value
      // console.log("input事件存储的数据",this.text)
    },
    deleteLi(index) {
      
      this.showLis.splice(index,1)
      
    }

  },



 }
</script>

<style lang="less" scoped>
.demo{
    width:300px;
}
li{
    padding: 5px 10px;
    position: relative;  
    margin-bottom: 5px;
    border-bottom: 1px solid lightslategrey;
    width: 100%;
    
  

     .context{
        padding:0  30px 0 20px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        text-overflow: ellipsis;
        word-wrap:break-word;
        overflow: hidden;
     }
      button{
     
        position: absolute;
        top:0;
        right: 20px;
      }
 }



</style>