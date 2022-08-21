## Vue2 element-ui 自构项目
---
暂时没太多想法,练习下学到的东西,踩踩坑
> 初步想法: 主页-登录页-图片-音乐-文章类 
> >后续再慢慢补样式动态UI
> 
### 1 踩坑回顾 
- 1.1mock
  - Mock 文件 下载npm i mockjs  
  - js文件使用require 引入 依赖  
```
const Mock = require('mockjs');//mockjs 导入依赖模块
const userMock =require ("./userMock")

Mock.mock("/mock/user",{
  code:200,data:userMock
})

```
```
随机生成的数据
{
  "id": "@id()",
  "username": "@cname()",
  "date": "@date()",
  "avatar": "@image('200x200','red','#fff','avatar')",
  "ip": "@ip()",
  "email": "@email()"
}

```

- 1.2 封装 axios ,请求路径/mock
```
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
```

- 1.3 写个接口,就可以获取mock 数据了 
```
export const reqUserInfo = () => mockRequest.get("/user")
```
  
  ---
 
- 2, vue.config.js 
  - 根据古老的记忆,到vue.config.js 再代理处写了mock开启数据: before:require('./mock/mock-server.js'),无限报错,版本不一样
  - 上面那几步就可以mock了
---

- 3. animate.css 
  - vue 引入CSS 后 transition需加name, 再加class
```
  <transition 
  appear
  name="animate__animated animate__bounce"
  enter-active-class="animate__fadeIn"
  leave-active-class="animate__fadeOut"

```
---
- 4.天气插件 和风
  - 动态插入Script引入地址, 配置项绑定到window上,否则不生效
 
- 5.el-row el-col布局
  - 弄了挺久,图片加载,配置wdth100%,但是卡片依旧有高低不一现象,导致部分模板空白
  - el-col配置行内样式,高度统一后,不会空白,仍有个别突出,展示不影响了

- 6.base.css body添加去掉滚动条影响
-  overflow-x: hidden;
   overflow-y: scroll;  
- 7. 表单验证 
  - prop传入 Form 组件的 model 中的字段
  - label为展示标题
  - 关注点:input v-model绑定data数据字样
  - Form 身上绑定了:rules="rules"
  - data中配置验证规则,触发方式,信息
  ```
    rules: {
          name: [
             { required: true, message: '请输入账户'},
               { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
           
          ],
          }
  ```
  - 提交触发的看文档就行 

## 2 请求携带参数方式
```
//获取句子切换
export const reqSentences = ()=> requests({url:'/sentences',method:'get'})

// 获取首页卡片展示 图片 
export const reqHomeImages = (params)=> requests({
  url:`/getImages/`,
  method:'get',
  params
  })

//query ?k=v 写法 params      
//params  写法  data:params   使用data选项


```
````
路由params 传参 
对象写法:路径需要Name指明,防止空字符,加undefined 
this.$router.push({name:'/home',params:{id:'' || undefined}}) 
/home/:id?  params/url的一部分 ?代表0/1

路由props
1.props:true  只能传递 params参数
2.props:{a:1, b:2}
3.第三种写法:函数写法.一般是把query参数与params参数当中props传递给路由组件!!!
        //route就是当前路由
        // props:(route)=>{
        //      //是将当前箭头函数返回结果，作为props传递给search路由组件!!!
        //      return {a:route.params.keyword,b:'可以传递参数'};
````
-----
## 3  尚品汇后台,Duplicate named routes definition:路由名重复

看论坛一坨一坨的代码讲解,脑壳疼
   - 3.1 根据名字提示,没起重复的话.就是动态路由有问题,路由加个方法,调用自用的就完事了
````
//路由实例加个自定义方法,自带的方法没有去除旧的路由信息
router.$addRoutes = (params) => {
	router.matcher = new Router({mode: 'history'}).matcher
	router.addRoutes(params)
}

````


## 4 首页修复 抖动,图片大小不一,出现空白区域  8.21
4.1el-col 添加 margin-bottom 
 - el-row :{display:flex ,   flex-wrap: wrap;} column 自动分布,图片大小自动均一适应父盒子
 - bug :hover margin-5px 时, 页面抖动.  bottom 补5px 页面抖动消失
4.2图片初次展示 改动为随机获取
4.3修复用户栏,天气组件展示方式
