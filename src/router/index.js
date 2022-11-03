import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index";
import { firstMenu } from "@/utils/map-menus";

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);
//1.home
const Home = () => import("@/views/home/HomePage.vue");
const Login = () => import("@/views/login/Login.vue");
const Blog = () => import("@/views/blog/Blog.vue");
const ShowCards = () => import("@/views/home/c-cpns/ShowCard.vue");
const Music = () => import("@/views/music/Music.vue");
const Detail = () => import("@/views/music/songDetail/SongDetail.vue");

//2.cms
const cmsLogin = () => import("@/views/cms/login/login.vue");
// 1.路由规则
//1.常量路由 所有用户能访问
const constantRoutes = [
  {
    path: "/",
    redirect: "/login",
  },
  //login
  {
    path: "/login",
    name: "login",
    component: Login,
    hidden: true,
  },
  //cms
  {
    path: "/cms",
    redirect: "/cms/cmsLogin",
    component: () => import("../views/cms/cms.vue"),
    children: [
      {
        path: "cmsLogin",
        name: "cmsLogin",
        component: cmsLogin,
      },
    ],
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/cms/main"),
  },
  //test
  {
    path: "/test",
    component: () => import("@/test/test.vue"),
  },

  //home
  {
    path: "/home",
    name: "home",
    component: Home,

    redirect: "/home/showCards",
    children: [
      {
        path: "showCards",
        name: "showCards",
        component: ShowCards,
      },
      {
        path: "blog",
        name: "blog",
        component: Blog,
      },
      {
        path: "music",
        name: "music",
        component: Music,
        children: [
          {
            path: "detail",
            name: "detail",
            component: Detail,
            //播放器是否显示
            meta: { show: true },
          },
        ],
        meta: { show: true },
      },
    ],
  },
  {
    path: "/topplaylist",
    name: "topPlayList",
    component: () => import("@/views/music/TopPlayList/TopPlayList.vue"),
  },

  //404
  {
    // path: "/:pathMatch(.*)*",    router4写法，会一致跳入404
    path: "*",
    name: "not-found",
    component: () => import("@/views/not-found/not-found.vue"),
    hidden: true,
  },
];

//2.创建路由实例
const router = new VueRouter({
  // mode: "history",
  routes: constantRoutes,
  scrollBehavior() {
    //滚动行为这个函数,需要有返回值,返回值为一个对象。
    //经常可以设置滚动条x|y位置 [x|y数值的设置一般最小是零]
    return { y: 0 };
  },
});

//3.路由守卫

router.beforeEach((to, from, next) => {
  let token = store.state.user.token;
  let userInfo = store.state.user.userInfo;

  //已经登录 token获取
  if (token) {
    // console.log("l守卫", router.getRoutes());
    if (to.path == "/login") {
      //登录页面

      next("/home");
    } else {
      // 去非登录页面
      if (userInfo) {
        //有用户信息
        next();
      } else {
        //已经登录,没获取到用户信息
        try {
          //重新获取信息
          store.dispatch("user/getUserInfo");
          next();
        } catch (error) {
          //token失效
          store.commit("user/LOG_OUT");
          next("/login");
        }
      }
    }
  }
  //未登录
  else {
    next();
  }

  if (to.path === "/main") {
    //跳转侧边栏匹配方法报错解决
    // console.log(firstMenu, "sss");
    next(firstMenu.url);
  }
});

export default router;
