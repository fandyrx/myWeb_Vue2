// 封装axios 练习
import axios from "axios"
//网易云基础路径
import config from "@/utils/config"

//1.引入,创建实例
const requests = axios.create({
  //配置基础路径  用来设置代理服务器路径(跨域问题) // url = base url + request url 
  baseURL:"/api",
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






//二.网易云音乐请求接口
const requestM =  axios.create({
  baseURL: "https://netease-cloud-music-7pc60ge42-fandyrx.vercel.app/",
  timeout: 5000,
});

requestM.interceptors.request.use((config)=>{
  return config
})

requestM.interceptors.response.use((res)=>{
  return res.data
},(err)=>{
  return Promise.reject(new Error("失败"))
})


export {requestM,requests}





