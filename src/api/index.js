import requests from "./request";

import mockRequest from "./mockAjax"

export const reqUserInfo = () => mockRequest.get("/user")
//获取句子切换
export const reqSentences = ()=> requests({url:'/sentences',method:'get'})
// 获取首页卡片展示 图片 
export const reqHomeImages = (params)=> requests({url:`/getImages/`,method:'get',params})

//query ?k=v 写法 params      
//params  写法  data:params   使用data选项