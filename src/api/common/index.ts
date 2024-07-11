import { http } from '@/utils/http/axios';

//获取-城市列表
export function cityListApi() {
  return http.request({
    url: '/other/all/city',
    method: 'post',
  });
}

// 获取-所有用户信息
export function getUserAdmList() {
  return http.request({
    url: '/user/adm/list',
    method: 'post',
  });
}

// 上传-获取token ty_todo 处理上传 first。。。
export function getUploadToken() {
  return http.request({
    url: '/alioss/token',
    method: 'post',
  });
}
