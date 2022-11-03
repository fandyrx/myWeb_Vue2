import MyRequest from "./request";
import { BASE_URL, TIME_OUT } from "./request/config";
import LocalCache from "@/utils/cache";

const XRequest = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      //token拦截
      const token = LocalCache.getCache('token')
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`
      // }
      if (token) {
        if (config && config.headers) {
          // 多一步判断
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      return config
    },
    requestInterceptorCatch(error) {
      return error
    },
    responseInterceptor(res) {
      return res.data
    },
    responseInterceptorCatch(error) {
      return error
    }
  }
});

export default XRequest;
