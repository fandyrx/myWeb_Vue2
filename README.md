## Vue2 element-ui 自构项目

---

暂时没太多想法,练习下学到的东西,踩踩坑

> 初步想法: 主页-登录页-图片-音乐-文章类
>
> > 后续再慢慢补样式动态 UI

### 1 踩坑回顾

- 1.1mock
  - Mock 文件 下载 npm i mockjs
  - js 文件使用 require 引入 依赖

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

- 1.3 写个接口,就可以获取 mock 数据了

```
export const reqUserInfo = () => mockRequest.get("/user")
```

---

- 2, vue.config.js
  - 根据古老的记忆,到 vue.config.js 再代理处写了 mock 开启数据: before:require('./mock/mock-server.js'),无限报错,版本不一样
  - 上面那几步就可以 mock 了

---

- 3. animate.css
  - vue 引入 CSS 后 transition 需加 name, 再加 class

```
  <transition
  appear
  name="animate__animated animate__bounce"
  enter-active-class="animate__fadeIn"
  leave-active-class="animate__fadeOut"

```

---

- 4.天气插件 和风

  - 动态插入 Script 引入地址, 配置项绑定到 window 上,否则不生效

- 5.el-row el-col 布局

  - 弄了挺久,图片加载,配置 wdth100%,但是卡片依旧有高低不一现象,导致部分模板空白
  - el-col 配置行内样式,高度统一后,不会空白,仍有个别突出,展示不影响了

- 6.base.css body 添加去掉滚动条影响
- overflow-x: hidden;
  overflow-y: scroll;
- 7. 表单验证

  - prop 传入 Form 组件的 model 中的字段
  - label 为展示标题
  - 关注点:input v-model 绑定 data 数据字样
  - Form 身上绑定了:rules="rules"
  - data 中配置验证规则,触发方式,信息

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

```
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
```

---

## 3 尚品汇后台,Duplicate named routes definition:路由名重复

看论坛一坨一坨的代码讲解,脑壳疼

- 3.1 根据名字提示,没起重复的话.就是动态路由有问题,路由加个方法,调用自用的就完事了

```
//路由实例加个自定义方法,自带的方法没有去除旧的路由信息
router.$addRoutes = (params) => {
	router.matcher = new Router({mode: 'history'}).matcher
	router.addRoutes(params)
}

```

## 4. 首页修复 抖动,图片大小不一,出现空白区域 8.22

- 4.1el-col 添加 margin-bottom |
  el-row :{display:flex , flex-wrap: wrap;} column 自动分布,图片大小自动均一适应父盒子
- bug :hover margin-5px 时, 页面抖动. bottom 补 5px 页面抖动消失
- 4.2 图片初次展示 改动为随机获取
- 4.3 修复用户栏,天气组件展示方式
- 4.4 布局路由重整
- 4.5 登录 退出,本地持久化存储 token

## 5. 音乐界面 布局 ,vercel 代理后端服务器

- 1.  布局, 轮播图 指示器定位,强制更新样式
- 2.  获取数据, 请求应为函数,写成变量,找了半天
- 3.  组件抽取,先写基本布局再抽可能方便点.不然一团乱麻
- 4.  跨域请求,网页上线找论坛,发现 vercel 可以把服务器部署,然后请求地址改为部署地址.上线网站也能获取到数据了
- 5.  偶尔报错跨域,但是数据正常请求下来.服务器需要写跨域请求头?
- 6.css filter: blur(xx px) 虚化背景图

## 6.props class 整理参数

- 1.props 接受数组,对象时,默认值使用函数返回

```
 default(){
       return {}
      }
```

- 2. 请求 api 创建类 用于参数整理,报错,构造器的分类写多了,获取不了所以构造失败
- 3. el-main 布局样式,行高,居中未去除,造成子组件怪异
- 4. 创建一个类,获取数据赋值给 DATA 失败, AXIOS 异步任务造成?正常赋值不做处理可以打印

## 7.音乐播放,进度条动画完成,播放,切换上一首,下一首.图片懒加载 v-lazy 引入

- 1.页面加载白屏 BUG,数据获取后 控制仓库 isShow 属性展示组件,router-view 也要添加 v-show,否则顶部先加载
- 2.播放 VIP 报错,第一首,最后一首播放自动切换未验证
- 3.播放器拖拽,找组件或者自己写原生/offsetWidth 获取,计算百分比,控制数据再次输入 audio?
- 4.audio 原生事件比较方便,先这样
- 5.判断停止播放跳转,奇怪的 bug,同样代码,打了两三次,突然能进判断了,浏览器没有更新?调了 2 个小时

## 8.增加音量控制,修复自动切换 bug

## 9.vercel 代理挂了

- 1.服务器安装 node: wget https://nodejs.org/dist/v16.16.0/node-v16.16.0-linux-x64.tar.xz
- 2.解压: tar -xvf node-v16.16.0-linux-x64.tar.xz -C /usr/local/lib
- 3.进入 /usr/local/lib 下重命名 node-v16.16.0-linux-x64 为 node
- 4.设置环境变量：sudo vim /etc/profile 文件最后:

```
export NODEJS_HOME=/usr/local/lib/node
export PATH=$NODEJS_HOME/bin:$PATH
```

- 5.退出后 source /etc/profile 使配置生效
- 6.node -v 检验版本
- 7.xhttp 后台项目导入 /home/projects/node ,安装依赖 (npm install -g cnpm --registry=https://registry.npm.taobao.org 淘宝源,进入目录 cpnm i )
- 8.腾讯云服务器需要开放防火墙 端口 3000(根据后台开放端口决定)

```
9.npm i pm2 -g
//进入要启动的项目下
pm2 start app.js --name 后台项目文件夹名
```

- 10. 启动成功
- 11. api 请求地址更改为服务器地址加开放端口

## 10.音量 bug 修复 0-1 范围值 ,css3 动画实现播放器 作者名 滚动

- 10.1 拖拽，不同歌单切换 ，根据序号播放不行 ，简单版的 BUG：需要获取数据，重新排序
- 10.2 自定义属性的获取
- 10.3 新增歌曲拖拽,播放完毕重置 进度条
- 10.4 控制器放到首页,全局播放,不会中断,根据$route.meta 显示/消失

- 拖拽排序,,获取失败的回调处理

## 11.推荐详情组件逻辑抽取,修改个别样式

## 移动端适配复习

- rem 相对单位 1rem = 1html 根字号大小

```
1.媒体查询
@media (媒体特性) {
  选择器 {
    CSS 属性
  }
}
设置差异样式时  min-width 从小到大, max-width 从大到小


例子:根据不同视口宽度 设置不同根字号
@media (width:320px){
  html {
    font-size: 32px;
  }
}

rem 视口分布为10 份,  根字号为 视口宽度1/10
1.1 确定HTML 根字号
1.2 设计稿 375 , HTML字号则为37.5 ,样式大小68px, 68/37.5 则为rem单位

实际使用:flexible.js 手淘开发的框架
script 引入,自动 切换媒体查询,直接写rem

2.less 简化计算 变量声明
   2.1  @变量名: 值;    使用@变量名即可
    2.2 width 68px , 设计稿 375
   width:(68 / 375rem);   CSS转化时自动转换(插件Easy Less )

3.vw/vh
px单位 / (1/100 视口宽度)  vw

68 / 3.75 设计稿375

4.css 框架 BootStrap
link 引入, 使用类名即可
栅格化 响应布局 根据视口宽度,默认分成12份
col-lg-3  代表:该列,大屏,占据3份
```

## 12. 封装 input 框 修改个别样式,首页登录图 底部波浪动画

- 1.注意两点: 组件内部不绑定$listeners ,V-model 否则 Vue 重复触发事件,第二次触发为事件对象.
- 2.input 事件组件内部 DOM 的 value 值需要和外部传入 PROPS 保持一致
- 3.样式问题 怪异盒模式,去掉边框会看不到 outline(这个组件情况),补 1px padding
- 4.c3 animate 调节样式 找图
- 5.推荐歌单跳转详情页 显示状态数据,等待组件数据加载再修改状态会阻塞修复:在跳转时更改 Store 的状态

## 13.页面刷新 404

- 路由相关 项目部署 nginx 可以配置
- 开发中 404，使用 hash 模式 以下方法尝试无效
- 1.webpack 配置: // publicPath: "/", //这个必须，引入静态资源需要从根路径引入，否则会找不到静态资源 - historyApiFallback: true,

```
//404
  {
    // path: "/:pathMatch(.*)*",    router4写法，动态添加的路由会跳入404
    path: "*",
    name: "not-found",
    component: () => import("@/views/not-found/not-found.vue"),
    hidden: true,
  },

```

- vuex Module 可以继续嵌套

## 14.axios 类的封装

```
结构：

MyRequest{
    instance: axios实例，
    showLoading: 是否展示动画标识，
    interceptors: 外部传入拦截器 ，

    //方法
    request: 返回promise 内部使用创建的instance实例发送网络请求 axios封装

    post: 调用this.request
    get:调用this.request
    delete:调用this.request
    patch:调用this.request

}
```

- 1.目标：使用封装类发送请求
  - 功能：1.1 创建类时，构造函数都有 对应的 axios 实例
  -       1.2创建类时，使用这个类发送请求 封装api (post,get,delete,patch)
  -       1.3 request 方法， 内部实际使用AXIOS的请求api

```
class MyRequest{
  constructor(config){
    this.instance = axios.create(config)    //1.创建axios实例，每一个类新建都有对应的实例
  }

  //请求拦截  返回promise包裹 替代axios 本身的 request,再内部使用axios
  request(config) {
    return new Promise((resolve, reject) => {

      this.instance.request(config)  //调用实例发送请求
        .then((res) => {
          //1.获取数据成功
          resolve(res);
        })
        .catch((err) => {
          //2.获取数据失败
          reject(err);
        });
    });
  }

  //封装实例对应请求方法    调用上方封装的request
  get(config) {
    return this.request({ ...config, method: "GET" });
  }

  post(config) {
    console.log(config, "post");
    return this.request({ ...config, method: "POST" });
  }

  delete(config) {
    return this.request({ ...config, method: "DELETE" });
  }

  patch(config) {
    return this.request({ ...config, method: "PATCH" });
  }

}
```

- 2.目标：构造器内部：封装全局拦截器，loading 加载动画

  - 2.1 创建类 的 axios 实例，添加全局拦截器 所有使用这个类都有这个拦截器（1）
  - 2.2 创建对应 的 axios 实例，添加全局拦截器 对应实例才有的拦截器

  ```
   const req1 = new MyRequest(config)
   const req2 = new MyRequest(config)
   re1 re2  都有 拦截器（1）  由类 构造器内部创建

   req1  对应自身的拦截器   由外部传入
   req2  对应自身的拦截器

  ```

```
const DEFAULT_LOADING = true // 请求进行时标志，用于el-loading加载

构造器内部：

......  ......忽略其他代码
  constructor(config) {

    this.instance = axios.create(config); //axios 实例

    this.showLoading = config.showLoading ?? DEFAULT_LOADING //默认所有请求有loading装填
    this.interceptors = config.interceptors   //新建时，若有拦截器，保存
    //对应实例的 设置请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    //对应实例设置响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    //全局请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('全局请求拦截器')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0,0,0,0.5)'
          })
        }

        return config
      },
      (err) => {
        return err
      })

  }
  ......忽略其他代码
```

- 3.目标： 类内部请求拦截 添加对应实例 => 对应的拦截器

```
 //请求拦截
  request(config) {

    return new Promise((resolve, reject) => {

      //拦截器添加
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      //控制是否显示请求动画
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }



  //axios 请求（第三方库）
      this.instance.request(config)
        .then((res) => {
          //1.获取数据成功
          resolve(res);
        })
        .catch((err) => {
          //2.获取数据失败
          reject(err);
        });
    });
  }
```

## 滚动条样式

```

    overflow-x: hidden;
    overflow-y: auto;

    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    &::-webkit-scrollbar {
      display: none;
    }
```

























