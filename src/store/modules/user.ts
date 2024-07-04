import { defineStore } from 'pinia';
import { store } from '@/store';
import {
  CURRENT_USER,
  NEWTOKEN,
  ADMUSERID,
  ROLEID,
  LOGINNAME,
  ROLENAME,
  MS_USERNAME,
  ACCESS,
} from '@/store/mutation-types';
import { ResultEnum } from '@/enums/httpEnum';

import { getUserInfo as getUserInfoApi, login, smsLogin } from '@/api/system/user';
import { storage } from '@/utils/Storage';

// export type UserInfoType = {
//   // TODO: add your own data
//   name: string;
//   username: string;
//   email: string;
// };

export interface IUserState {
  token: string;
  username: string;
  welcome: string;
  avatar: string;
  permissions: any[];
  info: any;
  admUserId: string;
  access: string;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): IUserState => ({
    token: storage.get(NEWTOKEN, ''),
    username: '',
    welcome: '',
    avatar: '',
    permissions: storage.get(ACCESS, []),
    info: storage.get(CURRENT_USER, {}),
    admUserId: storage.get(ADMUSERID, ''),
    access: storage.get(ACCESS, ''),
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
    getUserInfo(): any {
      return this.info;
    },
    getAdmUserId(): any {
      return this.admUserId;
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
    setUserInfo(info: any) {
      this.info = info;
    },
    // 登录 loginType 2-sms登录 其他-普通登录
    async login(params: any, loginType?) {
      const fetchFn = loginType === 2 ? smsLogin : login;
      const response = await fetchFn(params);
      const { data, code } = response;
      if (code === ResultEnum.SUCCESS || code === 3) {
        // code：3-引导去密码修改页面
        storage.set(NEWTOKEN, data.token);
        storage.set(CURRENT_USER, data);
        storage.set(ADMUSERID, data.admUserId);
        storage.set(ROLEID, data.roleId);
        storage.set(LOGINNAME, data.loginName);
        storage.set(ROLENAME, data.roleName);
        storage.set(MS_USERNAME, params.username);
        storage.set(ACCESS, data.userModule);
        this.setToken(data.token);
        this.setUserInfo(data);
        this.setPermissions(data.userModule);
      }
      return response;
    },

    // 获取用户信息
    async getInfo() {
      // ty_todo 暂时抛弃该方法，用户信息修改需退出登录重新进入
      const result = await getUserInfoApi();
      if (result.permissions && result.permissions.length) {
        const permissionsList = result.permissions;
        this.setPermissions(permissionsList);
        this.setUserInfo(result);
      } else {
        throw new Error('getInfo: permissionsList must be a non-null array !');
      }
      this.setAvatar(result.avatar);
      return result;
    },

    // 登出
    async logout() {
      this.setToken('');
      this.setPermissions([]);
      this.setUserInfo({ name: '', username: '', email: '' });
      storage.clear();
    },
  },
});

// Need to be used outside the setup
export function useUser() {
  return useUserStore(store);
}
