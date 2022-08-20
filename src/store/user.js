import {reqUserInfo} from "@/api/index"
const state = {}
const actions = {
  getUserInfo(context,data){
    console.log(context,data);
    console.log('调用了user acition');
  }
}
const mutations = {}
const getters = {}



export default {
  namespaced:true,
  state,
  mutations,
  actions,
  getters
}