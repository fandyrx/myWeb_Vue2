import axios from "axios";
import { Loading } from "element-ui";
/**
 * 常量
 */
const DEFAULT_LOADING = true; // 请求进行时标志，用于el-loading加载

/**
 * 网络请求  类的封装
 */
class MyRequest {
  constructor(config) {
    this.instance = axios.create(config); //axios 实例

    this.showLoading = config.showLoading ?? DEFAULT_LOADING; //默认所有请求有loading装填
    this.interceptors = config.interceptors; //新建时，若有拦截器，保存
    //对应实例的 设置请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    //对应实例设置响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );
    //全局请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log("全局请求拦截器");
        if (this.showLoading) {
          this.loading = Loading.service({
            lock: true,
            text: "正在请求数据...",
            background: "rgba(0,0,0,0.5)",
          });
        }

        return config;
      },
      (err) => {
        return err;
      }
    );
  }

  //请求拦截
  request(config) {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }

      this.instance
        .request(config)
        .then((res) => {
          //1.获取数据成功
          this.loading?.close();
          resolve(res);
        })
        .catch((err) => {
          //2.获取数据失败
          this.loading?.close();
          reject(err);
        });
    });
  }

  //封装实例对应请求方法
  get(config) {
    return this.request({ ...config, method: "GET" });
  }

  post(config) {
    return this.request({ ...config, method: "POST" });
  }

  delete(config) {
    return this.request({ ...config, method: "DELETE" });
  }

  patch(config) {
    return this.request({ ...config, method: "PATCH" });
  }
}

export default MyRequest;
