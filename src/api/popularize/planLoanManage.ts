import { http } from '@/utils/http/axios';

// 获取-我的/助贷推广计划列表
export function getTableList(params) {
  return http.request({
    url: '/plan/list',
    method: 'post',
    params,
  });
}

//

// 单个上下线 /plan/switch
export function postXdPlanSwitch(params) {
  return http.request(
    {
      url: '/plan/switch',
      method: 'post',
      params,
    },
    {
      successMessageText: '操作成功',
    }
  );
}

// 推广失效原因 planInvalid /plan/invalid/{id}
export function planInvalidFn(row) {
  return http.request({
    url: '/plan/invalid/' + row.id,
    method: 'get',
  });
}

// 推广管理权重/单价修改
export function UpdatePlanBasicInfo(params) {
  return http.request({
    url: '/plan/updatePlanBasicInfo',
    method: 'post',
    params,
  });
}

// 批量操作删除 开启关闭
export function postXdPlanBatchDeal(params) {
  return http.request({
    url: '/plan/batchDeal',
    method: 'post',
    params,
  });
}

// /plan/copy/{id} 信贷计划复制
export function getXdPlanCopy(id) {
  return http.request({
    url: '/plan/copy/' + id,
    method: 'get',
  });
}

// 信贷计划删除
export function postXdPlanDelete(row) {
  return http.request({
    url: '/plan/delete/' + row.id,
    method: 'post',
  });
}

/**
 * 详情页相关Api
 */

//  获取机构列表
export function getBusiList() {
  return http.request({
    url: '/plan/getBusiList',
    method: 'get',
  });
}

// 获取关联账号  参数 busiId busiContracter
export function postRelationAccount(params) {
  return http.request({
    url: '/plan/getRelationAccount',
    method: 'post',
    params: {
      busiContracter: params.contractsignaturer,
      busiId: params.bid,
    },
  });
}

// 获取机构列表（对接方式）
export function getBusiApiList(params) {
  return http.request({
    url: '/proudctBusiness/api/alias/list',
    method: 'post',
    params: {
      busiId: params.bid,
    },
  });
}

// 根据机构ID获取服务列表
export function getXdProductServiceByBusinessId(params) {
  return http.request({
    url: '/xdProductService/sort/useful/list/' + params.bid,
    method: 'post',
  });
}
