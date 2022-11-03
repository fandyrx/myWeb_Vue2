// 异步路由,根据权限访问
// cms

const overview = () =>
  import("@/views/cms/main/analysis/overview/overview.vue");
const dashboard = () =>
  import("@/views/cms/main/analysis/dashboard/dashboard.vue");

const category = () => import("@/views/cms/main/product/category/category.vue");
const goods = () => import("@/views/cms/main/product/goods/goods.vue");

const department = () =>
  import("@/views/cms/main/system/department/department.vue");
const menu = () => import("@/views/cms/main/system/menu/menu.vue");
const role = () => import("@/views/cms/main/system/role/role.vue");
const user = () => import("@/views/cms/main/system/user/user.vue");
// user().then((res) => {
//   console.log(res, "sss组件获取");
// });

const asyncRoutes = [
  {
    path: "/main/analysis/dashboard",
    name: "dashboard",
    component: dashboard,
    children: [],
  },
  {
    path: "/main/analysis/overview",
    name: "overview",
    component: overview,
    children: [],
  },
  {
    path: "/main/product/category",
    name: "category",
    component: category,
    children: [],
  },
  {
    path: "/main/product/goods",
    name: "goods",
    component: goods,
    children: [],
  },
  // {
  //   path: '/main/story/chat',
  //   name: 'chat',
  //   component: chat,
  //   children: []
  // },
  // {
  //   path: '/main/story/list',
  //   name: 'list',
  //   component: list,
  //   children: []
  // },
  {
    path: "/main/system/department",
    name: "department",
    component: department,
    children: [],
  },
  {
    path: "/main/system/menu",
    name: "menu",
    component: menu,
    children: [],
  },
  {
    path: "/main/system/role",
    name: "role",
    component: role,
    children: [],
  },
  {
    path: "/main/system/user",
    name: "user",
    component: user,
    children: [],
  },
];

export default asyncRoutes;
