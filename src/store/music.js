import {reqBanner,reqCommend,reqPlayTags,reqTopAlbum } from "@/api/index.js"

const state = {
  banner:[],
  commend:[],//推荐歌单
  tags:[], //分类标签
  newAlbums:[], //新碟
  isShow: true, //跳转详情页,控制其他组件是否展示
  playInfo:[{
    al:{
      name:"道理的道理",
      picUrl:"https://p2.music.126.net/9jpTVsOLNKifSeYSuYq6Rg==/109951163606230392.jpg",
    },
    id:1318156992, //播放器id 用于音乐播放
    name:"道理的道理",
    ar:[{
      name:"张以诚"
    }]

  }],
  playIndex:0,
  isPlay:false, //播放状态

  userPlayList:[]//左侧的播放列表 持久化存储，后端数据查看
  
  
}
const mutations = {
  GET_BANNER(state,banners){   
      state.banner = banners
  },
  GET_CARLIST(state,tags){
    state.tags = tags
  },
  GET_COMMEND(state,commend){
    
    state.commend = commend
  },
  SET_MUSICITEM(state,item){
    state.playInfo = item
  },
  SET_NEWALBUMS(state,albums){
  
    state.newAlbums = albums
  },

  getMusicUrl(state,index){
    // console.log(index,'index获取');
    state.playIndex = index
  },
  upDatePlay(state,isPlay){
      state.isPlay = isPlay
  },
  CHANGE_INDEX(state,num){
    state.playIndex = num  
  },
  CHANGE_IsShow(state,boolean){
    //歌单退出,切换展示
    state.isShow = boolean
    
  }
  
 
}

const actions = {
  //1.轮播图
 async getBanner({commit},type){
    let result = await reqBanner(type)
   
    if(result.code == 200){
     
      commit("GET_BANNER",result.banners)
    }else{
      return Promise.reject(new Error("fail"))
    }
  },
  //2.推荐歌单
  async getCommend ({commit}){
      let res  = await reqCommend()
      if(res.code == 200){
       
       commit("GET_COMMEND",res.result)
      }else{
        return Promise.reject(new Error("fail"))
      }
  },
//3.热门分类 标签
  async getCategoryList ({commit}) {
    
     let res = await reqPlayTags()
         
    if(res.code == 200){  
     let tags =  res.tags.slice(0,5)
     commit("GET_CARLIST",tags)
    }else{
      return Promise.reject(new Error('fail'))
    }
  },

  //4.播放音乐地址 获取不了? 直接mutations audio 赋值ID 可以
  async getMusicItem ({commit},item){
    commit("SET_MUSICITEM",item)
      
  },

  //5.newAlbum
  async getNewAlbum ({commit}) {
		//新碟数据获取
      let res = await	reqTopAlbum();
      if(res.code === 200){
         
        commit("SET_NEWALBUMS",res.albums)
       
        
      }else{
        return Promise.reject( new Error('获取新专辑失败'))
      }
      }
    
  }
 
  
  












export default{

  namespaced:true,
  state,
  actions,
  mutations
}