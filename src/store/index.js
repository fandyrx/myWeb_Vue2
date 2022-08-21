import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import login from "./login" 
import user from "./user" 

const store = new Vuex.Store({
 modules:{
  login,
  user
 }
})

export default store 