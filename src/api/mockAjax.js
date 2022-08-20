// 封装axios 练习
import axios from "axios"

//1.引入,创建实例
const requests = axios.create({
  //配置基础路径  用来设置代理服务器路径(跨域问题) // url = base url + request url 
  baseURL:"/mock",
  timeout:5000
})

//2.请求拦截器
requests.interceptors.request.use((config)=>{
  //config:配置对象 内含headers
    return config
})

//3.响应拦截器
requests.interceptors.response.use((res)=>{
  return res.data
},(err)=>{
  return Promise.reject(new Error('响应失败'))
})

export default requests