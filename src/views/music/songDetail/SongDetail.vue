<template>
  <div>
      <ItemTop  :song="info" />
      <ItemMusic :item-list = "songList" />

 </div>
</template>

<script>
import {reqDetail,reqMusicItem ,reqAlbumDetail,SongDetails,AlbumDetail} from '@/api/index.js'
import ItemTop from '@/views/music/songDetail/itemTop/ItemTop.vue'
import ItemMusic from '@/views/music/songDetail/itemMusic/ItemMusic.vue'
import { mapMutations } from 'vuex'



export default {
  name: 'SongDetail',
 data() { 
    return {
        info:{}, 
        songList:[],

        
    }
  },
  components:{
    ItemTop,
   
    ItemMusic
  },
  methods:{
        //获取歌单详情页 store 集中处理更好?不会分别显示
          getDetail (){
            let type = this.$route.query.type;
            let id = this.$route.query.id

            if(type === '专辑'){
              this.albumDetail(id)
            }else{
              this.hotDetail(id)
            }
            
          } ,

          //1.获取专辑信息
         async  albumDetail(id){
             //专辑内容请求
              let res = await  reqAlbumDetail(id)
              
               if(res.code === 200){
                this.info = new AlbumDetail(res.album);
                this.songList= res.songs;
                if(this.songList !== '') {
                   this.$store.state.music.isShow = false;
                 }     
               }else{
                return new Promise.reject(new Error("fail"))
               }

          },
          

          //2.获取热门推荐歌单信息
         async  hotDetail(id){
        
               let res =  await reqDetail(id)
              
              if (res.code == 200 && res.playlist != null){  
                //数据整理,执行顺序 ,原因:组件挂载完毕,会执行传值打印, 类函数才创建完毕? 
                //数据更新后再次渲染 视图,所以能用
               this.info =  new  SongDetails(res.playlist)  
                   
             }else{
              return new Promise.reject(new Error("fail"))
             }

             //获取歌单歌曲
             let result = await reqMusicItem (id)
               
              if(result.code == 200){       
                this.songList = result.songs
                //  if(this.songList !== '') {
                //     //数据到达再展示组件 会阻塞,直接跳转就没问题
                //  }     

                
              }
          },
          ...mapMutations("music",["CHANGE_IsShow"])
  },
  // watch:{
  //   $route:{
  //     immediate: true,
  //     deep:true,
  //     handler(){
  //         console.log('SDchange');
          
  //     }
  //   }    
    
  // },

  mounted(){
      this.getDetail()
      
  },
  beforeDestroy(){
    //切换到音乐主界面
    this.CHANGE_IsShow(true)
    
  }

 


 
}
   


 
</script>

<style lang="less" scoped>

</style>