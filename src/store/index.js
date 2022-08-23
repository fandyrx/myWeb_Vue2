import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)


import user from "./user" 
import music from "./music"
const store = new Vuex.Store({
 modules:{
  user,
  music
 }
})

export default store 