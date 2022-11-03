import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import user from "./user";
import music from "./music";
import cms from "./cms";
const store = new Vuex.Store({
  modules: {
    user,
    music,
    cms,
  },
});

export default store;

//页面更新，初始化VueX   cms
export function setUpStore() {
  store.dispatch("cms/cmsLogin/loadLocalLogin");
  // store.dispatch('getInitialDataAction')  token 可能为获取
}
