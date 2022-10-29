import { requestM } from "./request";

//1.网易云登录 （手机登录） /login/cellphone?phone=xxx&password=yyy
//可选参数 : countrycode: 国家码，用于国外手机号登陆，例如美国传入：1
export const reqCellphoneLogin = (phone, password, countrycode = "") => {
  return requestM({
    url: "/login/cellphone",
    params: {
      phone,
      password,
      countrycode,
    },
  });
};


//2.登录退出 /logout
export const reqLogOut = () => requestM({
  url:"/logout"
})


//3. 登录状态  /login/status
export const reqLoginStatus = () => requestM({
  url:"/login/status"
})

//4.用户详情 /user/detail?uid=32953014
export const reqUserDetail = (uid) => requestM({
  url: '/user/detail',
  params: {
    uid
  }

})


//5.获取用户信息 , 歌单，收藏，mv, dj 数量  /user/subcount
export const reqUserInfo = () => {
  return requestM({
    url: "/user/subcount"
  })
}
