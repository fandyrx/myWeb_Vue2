import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import less from 'less'
import router from '@/router/index'
import moment from 'moment';
import VueLazyload from 'vue-lazyload'
//懒加载图片
import sea from "@/assets/img/sea.jpg"
import vuedraggable from "vuedraggable"
 
Vue.config.productionTip = false
//用户数据mock
import  '@/mock/mockServe'
import store from "./store/index"

//插件
Vue.use(less)
Vue.use(moment)
Vue.use(ElementUI);
Vue.use(vuedraggable)
//懒加载配置
Vue.use(VueLazyload,{
  loading:sea
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
