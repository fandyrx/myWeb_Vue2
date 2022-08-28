import Vue from 'vue'
import VueRouter from "vue-router" 
import store from "@/store/index"



Vue.use(VueRouter);

const Home = ()=> import ( "@/views/home/HomePage.vue")
const Login = ()=> import ("@/views/login/Login.vue")
const Blog = ()=> import ("@/views/blog/Blog.vue")
const ShowCards = ()=> import ("@/views/showCard/ShowCard.vue")
const Music  = () => import ("@/views/music/Music.vue")
const Detail = () => import ("@/views/music/songDetail/SongDetail.vue")
// 1.路由规则

const routes = [
 
  {
    path:'/test',
    component:()=>import ("@/test/test.vue")
  },
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'/login',
    name:'login',
    component: Login,
    hidden:true
  },
 
  {
    path:'/home' ,
    name:'home',
    component:Home,
    redirect:'/home/showCards',
    children:[
      {
        path:'showCards',
        name:'showCards',
        component:ShowCards 
      },
      {
        path:"blog",
        name:'blog',
        component:Blog
      },
      {
        path:'music',
        name:'music',
        component: Music,
        children:[
          {
            path:'detail',
            name:'detail',
            component:Detail,
            meta:{show:true}
          }
        ],
        meta:{show:true}
      },
     
    ]
  },
  
 
]
//2.创建路由实例
const  router = new VueRouter({
  mode:'history',
  routes,
  scrollBehavior() {
    //滚动行为这个函数,需要有返回值,返回值为一个对象。
    //经常可以设置滚动条x|y位置 [x|y数值的设置一般最小是零]
    return { y: 0 };
}
})


//3.路由守卫


router.beforeEach((to,from,next)=>{
  
  let token = store.state.user.token
  let name = store.state.user.userInfo.username
  //已经登录
  if(token){
    if(to.path == "/login"){
     
      next('/home')
    }else{
      if(name){
        //有用户信息: 姓名,去非登录页面
        next()
      }else{
        //已经登录,没获取到用户信息
        try {
          //重新获取信息
          store.dispatch("getUserInfo")
          next()
        } catch (error) {
          //token失效
          store.commit("LOG_OUT")
          next('/login')
        }
      }
    }
  }
  //未登录
  else{
    next()
  }
})


export default router