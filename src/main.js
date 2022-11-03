import Vue from "vue";
import App from "./App.vue";
import store from "./store/index";
import router from "@/router/index";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import enLocale from "element-ui/lib/locale/lang/en";
import zhLocale from "element-ui/lib/locale/lang/zh-CN";
import VueI18n from "vue-i18n"; //国际化库

import { globalRegister } from "@/global/globalRegister";
//用户数据mock
import "@/mock/mockServe";

import { setUpStore } from "./store";

Vue.config.productionTip = false;

setUpStore();

//插件注册
Vue.use(globalRegister);

//element国际化相关
Vue.use(VueI18n);
const messages = {
  en: {
    message: {
      hello: "hello world",
    },
    change: {
      a: "改变为这样",
    },
    ...enLocale, // 或者用 Object.assign({ message: 'hello' }, enLocale)
  },
  zh: {
    message: {
      hello: "你好世界",
    },
    ...zhLocale, // 或者用 Object.assign({ message: '你好' }, zhLocale)
  },
};
const i18n = new VueI18n({
  //实例化VueI18n对象
  locale: "zh", //语言标识
  messages,
});

// 更改为其它的 locale
// i18n.locale = "zh";

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value),
});

new Vue({
  render: (h) => h(App),
  router,
  store,
  i18n,
}).$mount("#app");
