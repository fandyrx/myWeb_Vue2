import Vue from 'vue'
import VueRouter from "vue-router" 


Vue.use(VueRouter);

const home = ()=> import ( "@/views/home/HomePage.vue")
const login = ()=> import ("@/views/login/Login.vue")
const blog = ()=> import ("@/views/blog/Blog.vue")
// 1.路由规则
const routes = [
  {
    //空或者/ 重定向到主页
    path:'',
    redirect:'/home'
  },
  {
    path:'/login',
    component: login
  },
  {
    path:'/home',
    component: home
  },
  {
    path:"/blog",
    component:blog
  }
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


export default router