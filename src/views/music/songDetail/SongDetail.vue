<template>
  <div>
      <ItemTop  :song="info" />
      <ItemMusic :item-list = "songList" />

 </div>
</template>

<script>
import {reqDetail,reqMusicItem ,SongDetails} from '@/api/index.js'
import ItemTop from '@/views/music/songDetail/itemTop/ItemTop.vue'
import ItemMusic from '@/views/music/songDetail/itemMusic/ItemMusic.vue'


export default {
  name: 'SongDetail',
 data() { 
    return {
        info:{}, 
        songList:[]
    }
  },
  components:{
    ItemTop,
   
    ItemMusic
  },
  methods:{
        //获取歌单详情页 store 集中处理更好?不会分别显示
         async  getDetail (){
               let id = this.$route.query.id
               let res =  await reqDetail(id)
             if (res.code == 200 && res.playlist != null){  
                //数据整理,执行顺序 ,原因:组件挂载完毕,会执行传值打印, 类函数才创建完毕? 
                //数据更新后再次渲染 视图,所以能用
               this.info =  new  SongDetails(res.playlist)  
               //这里保存 undefinend  构造函数执行比这  慢
                // sessionStorage.setItem('songDetail',JSON.stringify(this.data))
                     
             }else{
              return new Promise.reject(new Error("fail"))
             }

             //获取歌单歌曲
             let result = await reqMusicItem (id)
               
              if(result.code == 200){       
                this.songList = result.songs
                //数据到达再展示组件 ,加个转场/加载条?
                 if(this.songList !== '') {
                   this.$store.state.music.isShow = false;
                 }     
              }
          } 
  },
  mounted() {
    //获取页面展示数据
     this.getDetail() 
 
  },
  beforeDestroy(){
    //切换到音乐主界面
      this.$store.state.music.isShow = true;
  }
  
   
  
 }
</script>

<style lang="less" scoped>

</style>