import { defineStore } from 'pinia';
import { store } from '@/store';
import { ACCESS_TOKEN, CURRENT_USER, IS_LOCKSCREEN } from '@/store/mutation-types';
import { ResultEnum } from '@/enums/httpEnum';
// import { useAsyncRouteStoreWidthOut } from '@/store/modules/asyncRoute;
import { getUserInfo, login } from '@/api/system/user';
import { storage } from '@/utils/Storage';

export interface IUserState {
  token: string;
  username: string;
  welcome: string;
  avatar: string;
  permissions: any[];
  info: any;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): IUserState => ({
    token: storage.get(ACCESS_TOKEN, ''),
    username: '',
    welcome: '',
    avatar: '',
    permissions: [],
    info: storage.get(CURRENT_USER, {}),
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
    getAvatar(): string {
      return this.avatar;
    },
    getNickname(): string {
      return this.username;
    },
    getPermissions(): [any][] {
      return this.permissions;
    },
    getUserInfo(): object {
      return this.info;
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setAvatar(avatar: string) {
      this.avatar = avatar;
    },
    setPermissions(permissions) {
      this.permissions = permissions;
    },
    setUserInfo(info) {
      this.info = info;
    },
    // 登录
    async login() {
      try {
        const response = await login();
        const { result, code } = response;
        if (code === ResultEnum.SUCCESS) {
          const ex = 7 * 24 * 60 * 60 * 1000;
          storage.set(ACCESS_TOKEN, result.token, ex);
          storage.set(CURRENT_USER, result, ex);
          storage.set(IS_LOCKSCREEN, false);
          this.setToken(result.token);
          this.setUserInfo(result);
          window['$notification'].success({
            content: '登录成功！',
            meta: `欢迎${result.name}`,
            duration: 2500,
          });
        } else {
          window['$notification'].error({
            content: '登录失败',
            meta: `欢迎${result.name}`,
            duration: 2500,
          });
          // 跳到客户端登录页 ty_todo
        }
        return Promise.resolve(response);
      } catch (e) {
        return Promise.reject(e);
      }
    },

    async afterLogin() {
      // const userStore = useUserStoreWithOut();
      // const asyncRouteStore = useAsyncRouteStoreWidthOut();
      // const userInfo = await userStore.GetInfo();
      // const routes = await asyncRouteStore.generateRoutes(userInfo);
      // // 动态添加可访问路由表
      // routes.forEach((item) => {
      //   router.addRoute(item as unknown as RouteRecordRaw);
      // });
      //添加404
      // const isErrorPage = router.getRoutes().findIndex((item) => item.name === ErrorPageRoute.name);
      // if (isErrorPage === -1) {
      //   router.addRoute(ErrorPageRoute as unknown as RouteRecordRaw);
      // }
      // const redirectPath = (from.query.redirect || to.path) as string;
      // const redirect = decodeURIComponent(redirectPath);
      // const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
      // asyncRouteStore.setDynamicAddedRoute(true);
      // next(nextData);
    },

    // 获取用户信息
    GetInfo() {
      const that = this;
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((res) => {
            const result = res;
            if (result.permissions && result.permissions.length) {
              const permissionsList = result.permissions;
              that.setPermissions(permissionsList);
              that.setUserInfo(result);
            } else {
              reject(new Error('getInfo: permissionsList must be a non-null array !'));
            }
            that.setAvatar(result.avatar);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 登出
    async logout() {
      this.setPermissions([]);
      this.setUserInfo('');
      storage.remove(ACCESS_TOKEN);
      storage.remove(CURRENT_USER);
      return Promise.resolve('');
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
