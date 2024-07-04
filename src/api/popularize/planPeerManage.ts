import { http } from '@/utils/http/axios';

// 获取-我的/同业推广计划列表
export function getTableList(params) {
  return http.request({
    url: '/alliancePlan/list',
    method: 'post',
    params,
  });
}

// /alliancePlan/selfList
export function getTableSelfList(params) {
  return http.request({
    url: '/alliancePlan/selfList',
    method: 'post',
    params,
  });
}

// 推广失效原因 planInvalid
export function planInvalidFn(row) {
  return http.request({
    url: '/alliancePlan/invalid',
    method: 'post',
    params: {
      planId: row.id,
    },
  });
}

// 推广管理权重修改
export function updateAlliancePlanWeight(params) {
  return http.request({
    url: '/alliancePlan/updateWeight',
    method: 'post',
    params,
  });
}

// 批量操作删除 开启关闭
export function postXdPlanBatchDeal(params) {
  return http.request({
    url: '/alliancePlan/batchDeal',
    method: 'post',
    params,
  });
}

// /alliancePlan/copy/{id} 信贷计划复制
export function getXdPlanCopy(id) {
  return http.request({
    url: '/alliancePlan/copy/' + id,
    method: 'get',
  });
}

/**
 * 详情页相关Api ty_todo 下面需要改
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
