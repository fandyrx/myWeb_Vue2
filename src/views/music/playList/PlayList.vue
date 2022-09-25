<template>
  <div>
       <div class="detail" id="div1" ref="playList" @drop="drop" @dragover="allowDrop" @click="toPlay">
      
      </div>   
 </div>
</template>

<script>
// import draggable from "vuedraggable"
import { mapMutations } from "vuex";
export default {
  name: 'PlayList',
  data() { 
    return {

    }
  },
  components:{
    // draggable
  },
  methods:{
       allowDrop(ev){
        ev.preventDefault();
      },
      drop(e){  
        //  console.log(e,'drop');
             e.preventDefault();
             //获取id 
              var data = e.dataTransfer.getData("text");   
              //克隆节点,添加  
              // e.target.appendChild();
              const nodeList = [...this.$refs.playList.childNodes]
              
              if(nodeList.findIndex( item => item.id == data) == -1){
                  this.$refs.playList.appendChild(document.getElementById(data).cloneNode(true))
              }else{
                  return
              }
           
      },
      toPlay(e){
        // console.log(e.currentTarget);
          const index = e.target.parentNode.parentNode.dataset.index
     
        // 只能点击图片
        // 获取不到 自定义index  
        this.getMusicUrl(index);
        //   const nodeList = [...this.$refs.playList.childNodes]
        //  console.log(nodeList[0]);

      },
      ...mapMutations("music", ["getMusicUrl"]),
   
  },
 
  mounted() {
 
  },
 }
</script>

<style lang="less" scoped>
 #div1{
  border: 1px solid black;
  padding: 10px;
  width: 20vw;
  height: 100vh;
   
  display: flex;
  flex-direction: column;
 }
 

//拖拽歌曲的样式
.detail {
	margin-bottom: 10px;
	font-size: 14px;
	display: flex;

	span {
		width: 20px;
		text-align: center;
		line-height: 40px;
	}
	img {
		width: 50px;
		height: 50px;
	}
	.aut {
		display: flex;
		margin-left: 5px;
		.songInfo {
			margin-left: 15px;
			line-height: 100%;
			display: flex;
			flex-direction: column;
		}
	}
}

</style>