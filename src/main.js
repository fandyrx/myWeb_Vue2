import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import less from 'less'
import router from '@/router/index'

Vue.config.productionTip = false
//用户数据mock
import  '@/mock/mockServe'
import store from "./store/index"
//插件
Vue.use(less)
Vue.use(ElementUI);


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
