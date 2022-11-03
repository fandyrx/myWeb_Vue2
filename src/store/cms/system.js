import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData,
} from "@/services/main/system/system.js";

const state = () => {
  return {
    usersList: [],
    usersCount: 0,
    roleList: [],
    roleCount: 0,
    goodsList: [],
    goodsCount: 0,
    menuList: [],
    menuCount: 0,
  };
};
const mutations = {
  changeUsersList(state, userList) {
    state.usersList = userList;
  },
  changeUsersCount(state, userCount) {
    state.userCount = userCount;
  },
  changeRoleList(state, roleList) {
    state.roleList = roleList;
  },
  changeRoleCount(state, roleCount) {
    state.roleCount = roleCount;
  },
  changeGoodsList(state, goodsList) {
    state.goodsList = goodsList;
  },
  changeGoodsCount(state, goodsCount) {
    state.goodsCount = goodsCount;
  },
  changeMenuList(state, menuList) {
    state.menuList = menuList;
  },
  changeMenuCount(state, menuCount) {
    state.menuCount = menuCount;
  },
};
const actions = {
  async getPageListAction({ commit }, payload) {
    const { pageName } = payload;
    const pageUrl = `/${pageName}/list`;
    console.log("当前页面名，地址 Store发出", pageName, pageUrl);
    // 1.页面请求
    const pageResult = await getPageListData(pageUrl, payload.queryInfo);

    const { list, totalCount } = pageResult.data;

    const commitActionName = pageName.replace(
      pageName[0],
      pageName[0].toUpperCase()
    );

    commit(`change${commitActionName}List`, list);
    commit(`change${commitActionName}Count`, totalCount);
  },
};

const getters = {
  pageListData(state) {
    return (pageName) => {
      return state[`${pageName}List`];
    };
  },

  pageListCount(state) {
    return (pageName) => {
      return state[`${pageName}Count`];
    };
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
