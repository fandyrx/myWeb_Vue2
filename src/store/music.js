import {reqBanner,reqCommend,reqPlayList} from "@/api/index.js"

const state = {
  banner:[],
  commend:[],
  playList:[]
  
}
const mutations = {
  GET_BANNER(state,banners){
       
      state.banner = banners
  },
  GET_COMMEND(state,commend){
    state.commend = commend
  },
  GET_CARLIST(state,playList){
    state.playList = playList
  }
}

const actions = {
 async getBanner({commit},type){
    let result = await reqBanner(type)
    if(result.code == 200){
     
      commit("GET_BANNER",result.banners)
    }else{
      return Promise.reject(new Error("fail"))
    }
  },
  async getCommend ({commit}){
      let res  = await reqCommend()
      if(res.code == 200){
       commit("GET_COMMEND",res.result)
      }else{
        return Promise.reject(new Error("fail"))
      }
  },

  async getPlaylist ({commit}) {
     let res = await reqPlayList()
      
    if(res.code == 200){
     let tags =  res.tags.slice(0,5)
     commit("GET_CARLIST",tags)
    }else{
      return Promise.reject(new Error('fail'))
    }
  }
}


export default{

  namespaced:true,
  state,
  actions,
  mutations
}