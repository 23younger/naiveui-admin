import { http } from '@/utils/http/axios';

export interface BasicResponseModel<T = any> {
  code: number;
  msg: string;
  data: T;
}

export interface BasicPageParams {
  pageNumber: number;
  pageSize: number;
  total: number;
}

/**
 * @description: 获取用户信息
 */
export function getUserInfo() {
  return http.request({
    url: '/admin_info',
    method: 'get',
  });
}

/**
 * @description: 用户登录
 */
export function login(params) {
  return http.request<BasicResponseModel>(
    {
      url: '/adm/account/adminLogin/V2',
      method: 'POST',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}

/**
 * @description: 验证用户是否存在
 */
export function checkLoginNameApi(username) {
  return http.request({
    url: '/adm/account/checkLoginName/' + username,
    method: 'POST',
  });
}

/**
 * @description: 获取验证码
 */
export function getVerifyCodeApi() {
  return http.request({
    url: '/adm/account/verificationCode',
    method: 'POST',
  });
}

/**
 * @description: sms用户登录
 */
export function smsLogin(params) {
  return http.request<BasicResponseModel>(
    {
      url: '/adm/account/verifySmsLogin',
      method: 'POST',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}

/**
 * @description: 发送短信验证码
 */
export function sendVerifySmsApi(params) {
  return http.request<BasicResponseModel>({
    url: '/adm/account/sendVerifySms',
    method: 'POST',
    params,
  });
}
