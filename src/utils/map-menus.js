//1.传入用户权限，获取所有异步路由，有权限的推入数组，最后返回该数组
import asyncRoutes from "@/router/async-route.js"; //所有异步路由

let firstMenu = null;

//面包屑
export function pathMapBreadcrumbs(userMenus, currentPath) {
  const breadcrumbs = [];
  pathMapToMenu(userMenus, currentPath, breadcrumbs);
  return breadcrumbs;
}

//侧边栏路径，激活菜单索引获取（用于刷新保持状态）
export function pathMapToMenu(userMenus, currentPath, breadcrumbs) {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      //存在children

      const findMenu = pathMapToMenu(menu.children ?? [], currentPath);
      if (findMenu) {
        if (currentPath) {
          breadcrumbs?.push({ name: menu.name });
          breadcrumbs?.push({ name: findMenu.name });
        }
        return findMenu;
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu;
    }
  }
}

//1.根据用户菜单权限 获取路由
export function mapMenusToRoutes(userMenus, currentPath) {
  const routes = [];

  //2.根据菜单获取需要添加的routes  递归查找(根据allRoutes,查找符合用户权限菜单的2级路由,并返回)
  const _recurseGetRoute = (menus) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        //2级菜单，需要对应组件
        const route = asyncRoutes.find((route) => route.path === menu.url); //异步路由和用户的菜单路径对比
        if (route) {
          routes.push(route);
        }
        if (!firstMenu) {
          firstMenu = menu; //用于页面刷新,保留在第一个默认菜单
        }
      } else {
        _recurseGetRoute(menu.children);
      }
    }
  };

  _recurseGetRoute(userMenus);
  return routes;
}

export { firstMenu };
