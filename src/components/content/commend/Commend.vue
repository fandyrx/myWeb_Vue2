<template>
  <div class="commend-wrapper">
    <Navbar class="wrapper">
    <div  slot="left" class="title">
          <i></i>
         <h3>{{title}}</h3>
    </div>

      <div slot="middle" class="middle" >  
         <span v-for="item in List" :key="item.id">{{item.name}}</span>
       </div>

    <div slot="right" class="more">
       
        <div>更多<i>→</i></div>  
     
    </div>
    </Navbar>

    <!-- show -->
    <div class="show">
      <ul>
      
        <li v-for="item in Commend"  :key="item.id">

        
             <img :src="item.picUrl">
             <div class="bottom">bottom</div>
         
          <p> {{item.name}}</p>

        </li>

      </ul>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/common/NavBar/Navbar'
export default {
  name: 'Commend',
  props:{
    title:{
      type: String,
      default:""
    },
    List:{
      type: Array,
      default:[]
    },
    Commend:{
      type: Array,
      default:[]
    }
  },
  data() { 
    return {
      
    }
  },
  components:{
    Navbar
  },
  methods:{

  },
  mounted() {
     
  },
 }
</script>

<style  lang="less" scoped>
.wrapper{
  padding: 15px 0;
  border-bottom:1px  solid rgb(229, 79, 79);
  margin-bottom: 10px;
  
}
.middle{
  font-size: 12px;
  text-align: left;
  margin-left:10px;
 
  span{
    padding: 0 20px;
    border-right: 1px solid rgb(114, 70, 70);
    &:hover{
      cursor: pointer;
      
    }
  }
}
.more{
  font-size: 12px;
  width:40px;
   &:hover{
      cursor: pointer;
      
    }
}
.show {
  width:100%;
  
  ul {
  
    display: flex;
    flex-wrap: wrap;//自动换行
    justify-content: space-between;
    
    li{
      width: 140px;
      height: 200px;
      line-height: 100%;
      
      img{
         width: 100%;
         height: 140px;
         border-radius: 5px;
    } 
      .bottom{
        position: relative;
        top: -15px;
        bottom: 5px;

        height: 15px;
        line-height: 15px;
        
        background-color:  rgba(255, 255, 230, .3);
      }
      p{
        padding: 0 5px;
        font-size: 14px;


        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical
      }
   }
  }
}

</style>