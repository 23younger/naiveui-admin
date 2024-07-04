import { http } from '@/utils/http/axios';

//获取table
export function cityListApi() {
  return http.request({
    url: '/other/all/city',
    method: 'post',
  });
}
