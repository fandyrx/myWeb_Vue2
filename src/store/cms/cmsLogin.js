import router from "@/router";
import {
  accountLoginRequest,
  reqUserInfoById,
  reqUserMenusByRoleId,
} from "@/services/login/login.js";
import LocalCache from "@/utils/cache";
import { mapMenusToRoutes } from "@/utils/map-menus.js";

const state = {
  token: "",
  userInfo: "",
  userMenus: "",
};
const mutations = {
  changeToken(state, token) {
    state.token = token;
  },
  changeUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
  changeUserMenus(state, userMenus) {
    state.userMenus = userMenus;
    const routes = mapMenusToRoutes(userMenus);
    // console.log("对比后符合的异步路由", routes);

    routes.forEach((route) => {
      // console.log(route, "获取每个路由信息");
      router.addRoute("main", route);
    });
  },
};
const actions = {
  async userLogin({ commit }, account) {
    //1.登录 token id 获取
    const res = await accountLoginRequest(account);

    if (res.code === 0) {
      const { id, token } = res.data;
      commit("changeToken", token);
      LocalCache.setCache("token", token);

      //2.获取用户信息
      const userInfoResult = await reqUserInfoById(id);
      const userInfo = userInfoResult.data;
      commit("changeUserInfo", userInfo);
      LocalCache.setCache("userInfo", userInfo);

      //3.获取用户菜单权限
      const userMenuResult = await reqUserMenusByRoleId(userInfo.role.id);
      const userMenus = userMenuResult.data;
      console.log(userMenus);
      commit("changeUserMenus", userMenus);
      LocalCache.setCache("userMenus", userMenus);

      // 页面跳转
      router.push("/main");
    }
  },

  //初始化用户 数据  保存到Vuex
  loadLocalLogin({ commit, dispatch }) {
    const token = LocalCache.getCache("token");
    if (token) {
      commit("changeToken", token);
      //获取 初始化请求 角色,department
      // dispatch('getInitialDataAction', null, { root: true })
    }
    const userInfo = LocalCache.getCache("userInfo");
    if (userInfo) {
      commit("changeUserInfo", userInfo);
    }
    const userMenus = LocalCache.getCache("userMenus");
    if (userMenus) {
      commit("changeUserMenus", userMenus);
    }
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
