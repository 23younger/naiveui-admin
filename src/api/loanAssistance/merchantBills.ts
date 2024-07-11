import { http } from '@/utils/http/axios';

// 获取-今日和本月交易记录
export function billStatisticsAccount() {
  return http.request({
    url: '/xdAccountBalance/statisticsAccount',
    method: 'post',
    params: {
      permissions: true,
    },
  });
}

// 获取-充值合计
export function rechargeListSumMoney(params) {
  return http.request({
    url: '/xdRechargeRecord/rechargeListSumMoney',
    method: 'post',
    params,
  });
}

// 获取-充值合计
export function giveListSumMoney(params) {
  return http.request({
    url: '/xdRechargeRecord/giveListSumMoney',
    method: 'post',
    params,
  });
}

// 列表数据-交易总览
export function getBillList(params) {
  return http
    .request({
      url: '/xdAccountBalance/list',
      method: 'post',
      params,
    })
    .then((data) => {
      if (data && data.list && data.list.length) {
        data.list.forEach((item) => {
          item.popoverVisible = false;
          item.accountMoney = item.accountMoney ? item.accountMoney.toFixed(2) : '0.00';
          item.rechargeMoney = item.rechargeMoney ? item.rechargeMoney.toFixed(2) : '0.00';
          item.giftLimit = item.giftLimit ? item.giftLimit.toFixed(2) : '0.00';
          item.creditLimit = item.creditLimit ? item.creditLimit.toFixed(2) : '0.00';
          item.creditRemainingLimit = item.creditRemainingLimit
            ? item.creditRemainingLimit.toFixed(2)
            : '0.00';
          item.refundMoney = item.refundMoney ? item.refundMoney.toFixed(2) : '0.00';
          item.consumeMoney = item.consumeMoney ? item.consumeMoney.toFixed(2) : '0.00';
          item.badDebtsMoney = item.badDebtsMoney ? item.badDebtsMoney.toFixed(2) : '0.00';
          item.chargebacksMoney = item.chargebacksMoney ? item.chargebacksMoney.toFixed(2) : '0.00';
        });
        return data;
      }
      return data;
    });
}

// 列表数据-充值记录
export function getBillRechargeRecordList(params) {
  return http
    .request({
      url: '/xdRechargeRecord/rechargeList',
      method: 'post',
      params,
    })
    .then((data) => {
      if (data && data.list && data.list.length) {
        data.list.forEach((item) => {
          item.rechargeMoney = item.rechargeMoney ? item.rechargeMoney.toFixed(2) : '0.00';
          item.bestowMoney = item.bestowMoney ? item.bestowMoney.toFixed(2) : '0.00';
        });
        return data;
      }
      return data;
    });
}

// 列表数据-赠送记录
export function getBillGiveList(params) {
  return http
    .request({
      url: '/xdRechargeRecord/giveList',
      method: 'post',
      params,
    })
    .then((data) => {
      if (data && data.list && data.list.length) {
        data.list.forEach((item) => {
          item.bestowMoney = item.bestowMoney ? item.bestowMoney.toFixed(2) : '0.00';
        });
        return data;
      }
      return data;
    });
}

// 列表数据-消耗记录
export function getBillConsumeList(params) {
  return http
    .request({
      url: '/xdConsumeRecord/list',
      method: 'post',
      params,
    })
    .then((data) => {
      if (data && data.list && data.list.length) {
        data.list.forEach((item) => {
          item.consumePrice = item.consumePrice ? item.consumePrice.toFixed(2) : '0.00';
        });
        return data;
      }
      return data;
    });
}

// 列表数据-退款记录
export function getBillRefundList(params) {
  return http
    .request({
      url: '/xdRefundRecord/list',
      method: 'post',
      params,
    })
    .then((data) => {
      if (data && data.list && data.list.length) {
        data.list.forEach((item) => {
          item.refundMoney = item.refundMoney ? item.refundMoney.toFixed(2) : '0.00';
        });
        return data;
      }
      return data;
    });
}

// 列表数据-坏帐记录
export function getBillBadDebtsList(params) {
  return http
    .request({
      url: '/xdBadDebtsRecord/list',
      method: 'post',
      params,
    })
    .then((data) => {
      if (data && data.list && data.list.length) {
        data.list.forEach((item) => {
          item.price = item.price ? item.price.toFixed(2) : '0.00';
        });
        return data;
      }
      return data;
    });
}

// 列表数据-转帐记录
export function getBillTransferList(params) {
  return http
    .request({
      url: '/xdAccountTransfer/list',
      method: 'post',
      params,
    })
    .then((data) => {
      if (data && data.list && data.list.length) {
        data.list.forEach((item) => {
          if (item.createTime) {
            // 去掉字符串最后两位
            item.createTime = item.createTime.slice(0, -2);
          }
        });
        return data;
      }
      return data;
    });
}

/**
 * 快捷功能弹窗
 */
// 列表数据-转帐记录
export function xdAccountBalanceCompanyList(params) {
  return http.request({
    url: '/xdAccountBalance/company/list',
    method: 'post',
    params: {
      permissions: true,
    },
  });
}
