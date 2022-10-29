import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import router from '@/router/index'
import { globalRegister } from '@/global/globalRegister'
//用户数据mock
import  '@/mock/mockServe'
import store from "./store/index"


Vue.config.productionTip = false

//插件
Vue.use(globalRegister)
Vue.use(ElementUI);




//懒加载配置

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
