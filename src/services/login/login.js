import XRequest from "../index";

const LoginAPI = {
  AccountLogin: "/login",
  LoginUserInfo: "/users/",
  UserMenus: "/role/",
};

export function accountLoginRequest(account) {
  return XRequest.post({
    url: LoginAPI.AccountLogin,
    data: account,
  });
}

export function reqUserInfoById(id) {
  return XRequest.get({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

export function reqUserMenusByRoleId(id) {
  return XRequest.get({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
