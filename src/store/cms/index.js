const state = {};
const actions = {};
const mutations = {};
const getters = {};

import cmsLogin from "./cmsLogin";
import system from "./system";
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
  modules: {
    cmsLogin,
    system,
  },
};
