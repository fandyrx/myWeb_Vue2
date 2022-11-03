import less from "less";
import moment from "moment";

import VueLazyload from "vue-lazyload";
import vuedraggable from "vuedraggable";
import { ValidationProvider, extend } from "vee-validate";
//懒加载图片
import sea from "@/assets/img/sea.jpg";

moment.suppressDeprecationWarnings = true; // 直接关闭提示
moment.locale("zh-cn");

// ValidationProvider Add a rule.
extend("secret", {
  validate: (value) => value === "example",
  message: "This is not the magic word",
});


export function globalRegister(app) {
  //plugins
  app.use(less);
  app.use(moment);
  app.use(VueLazyload, {
    loading: sea,
  });
  app.use(vuedraggable);

  //component  Register it globally
  app.component("ValidationProvider", ValidationProvider);
}
