import { http } from '@/utils/http/axios';

//获取table
export function getTableList(params) {
  params.permissions = true;
  return http.request({
    url: '/plan/list',
    method: 'post',
    params,
  });
}
