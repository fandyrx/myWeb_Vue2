import {reqUserInfo} from "@/api/index"
import { setToken,getToken,removeToken} from "@/utils/token"
const state = {
  token:getToken(),
  userInfo:{}
}
const actions = {
  //模拟发送获取用户信息
 async getUserInfo({commit,state},userInfo){
    const  {name,password} = userInfo
    let result = await reqUserInfo({name:name.trim(),password})
   
    if(result.code === 200){
      const {data} = result
      commit("SET_TOKEN",data.token)
      state.userInfo = data
      //本地持久化存储token 
      setToken(data.token)
     
      return "ok"
     }else{
      return Promise.reject(new Error("登陆失败"))
     }
  }
}

const mutations = {
    	SET_TOKEN(state,token){
          state.token = token
    },
    LOG_OUT(state){
      state.token = ''
      state.userInfo = ''
      removeToken()
    }
    
}

const getters = {}



export default {
  namespaced:true,
  state,
  mutations,
  actions,
  getters
}