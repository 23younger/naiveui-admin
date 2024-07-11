import { BasicColumn } from '@/components/Table';
import { h } from 'vue';
import { api as viewerApi } from 'v-viewer';

export const getColumns = (type: string): BasicColumn<any>[] => {
  if (type === '1') {
    return [
      { width: 100, title: '机构ID', align: 'center', key: 'orgId' },
      { width: 100, title: '公司名称', align: 'center', key: 'merchantName' },
      { width: 100, title: '公司别名', align: 'center', key: 'companyAlias' },
      { width: 100, title: '主账号', align: 'center', key: 'accountName' },
      { width: 100, title: '商务对接人', align: 'center', key: 'contractSignaturer' },
      {
        width: 100,
        title: '账户余额(元)',
        align: 'center',
        key: 'accountMoney',
      },
      {
        width: 100,
        title: '充值余额(元)',
        align: 'center',
        key: 'rechargeMoney',
      },
      {
        // 赠送余额
        width: 100,
        title: '赠送余额(元)',
        align: 'center',
        key: 'giftLimit',
        // slot: 'giftLimit', //ty_todo popover弹出一个表格数据
      },
      {
        width: 250,
        title: '信用余额  |  信用额度',
        align: 'center',
        key: 'creditLimit',
        // slot: 'creditLimit', // ty_todo 样式处理
        // 合并成一个字段
        // cellClassName: 'custom-cell',
      },
      // { width: 100, title: '信用额度', align: 'center', key: 'creditRemainingLimit' },
      {
        width: 100,
        title: '退款金额(元)',
        align: 'center',
        key: 'refundMoney',
      },
      {
        width: 100,
        title: '消耗金额(元)',
        align: 'center',
        key: 'consumeMoney',
      },
      {
        width: 100,
        title: '坏账金额(元)',
        align: 'center',
        key: 'badDebtsMoney',
      },
      {
        width: 100,
        title: '退单金额(元)',
        align: 'center',
        key: 'chargebacksMoney',
      },
      {
        width: 100,
        title: '最后消耗日期',
        align: 'center',
        key: 'lastConsumeTime',
        render: (row) => {
          return row.lastConsumeTime ? row.lastConsumeTime.substring(0, 10) : '';
        },
      },
    ];
  }
  if (type === '2') {
    return [
      { width: 100, title: '发起充值时间', align: 'center', key: 'createTime' },
      { width: 100, title: '机构ID', align: 'center', key: 'orgId' },
      { width: 100, title: '公司名称', align: 'center', key: 'merchantName' },
      { width: 100, title: '公司别名', align: 'center', key: 'companyAlias' },
      { width: 100, title: '主账号', align: 'center', key: 'accountName' },
      { width: 100, title: '商务对接人', align: 'center', key: 'contractSignaturer' },
      { width: 100, title: '运营负责人', align: 'center', key: 'operation' },
      { width: 100, title: '机构创建人', align: 'center', key: 'createOrgBy' },
      {
        width: 100,
        title: '充值金额(元)',
        align: 'center',
        key: 'rechargeMoney',
      },
      {
        width: 100,
        title: '赠送金额(元)',
        align: 'center',
        key: 'bestowMoney',
      },
      // 充值凭证 点击查看图片
      {
        width: 100,
        title: '充值凭证',
        align: 'center',
        key: 'fileList',
        render(row) {
          if (row.fileList && row.fileList.length) {
            return h(
              'span',
              {
                style: {
                  color: '#197cfa',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                },
                onClick: () => {
                  viewerApi({
                    options: {
                      toolbar: true,
                      url: 'filePath',
                      initialViewIndex: 0,
                    },
                    images: row.fileList,
                  });
                },
              },
              `查看图片(${row.fileList.length})`
            );
          }
          return '';
        },
      },
      {
        width: 100,
        title: '充值日期',
        align: 'center',
        key: 'rechargeTime',
        // 去掉时间后面的八位
        render: (row) => {
          return row.rechargeTime ? row.rechargeTime.substring(0, 10) : '';
        },
      },
      { width: 100, title: '充值次数', align: 'center', key: 'rechargeCount' },
      { width: 100, title: '充值人', align: 'center', key: 'applicantName' },
      // { width: 100, title: '充值备注', align: 'center', key: 'approvalRemark' },
      { width: 100, title: '充值备注', align: 'center', key: 'remark' },
      { width: 100, title: '财务审核', align: 'center', key: 'financeName' },
      { width: 100, title: '财务审核时间', align: 'center', key: 'auditTime' },
      { width: 100, title: '审核备注', align: 'center', key: 'approvalRemark' },
      {
        width: 100,
        title: '状态',
        align: 'center',
        key: 'status',
        render(row) {
          // ty_todo 处理不同状态展示样式
          return row.status;
        },
      },
    ];
  }
  if (type === '3') {
    return [
      { width: 100, title: '赠送时间', align: 'center', key: 'createTime' },
      { width: 100, title: '机构ID', align: 'center', key: 'orgId' },
      { width: 100, title: '公司名称', align: 'center', key: 'merchantName' },
      { width: 100, title: '公司别名', align: 'center', key: 'companyAlias' },
      { width: 100, title: '主账号', align: 'center', key: 'accountName' },
      { width: 100, title: '商务对接人', align: 'center', key: 'contractSignaturer' },
      { width: 100, title: '运营负责人', align: 'center', key: 'operation' },
      { width: 100, title: '机构创建人', align: 'center', key: 'createOrgBy' },
      {
        width: 100,
        title: '赠送金额(元)',
        align: 'center',
        key: 'bestowMoney',
      },
      { width: 100, title: '提交人', align: 'center', key: 'createBy' },
      { width: 100, title: '赠送备注', align: 'center', key: 'remark' },
      { width: 100, title: '财务审核', align: 'center', key: 'financeName' },
      { width: 100, title: '财务审核时间', align: 'center', key: 'auditTime' },
      { width: 100, title: '审核备注', align: 'center', key: 'approvalRemark' },
      {
        width: 100,
        title: '状态',
        align: 'center',
        key: 'status',
        render(row) {
          // ty_todo 处理不同状态展示样式
          return row.status;
        },
      },
    ];
  }
  // 消耗记录
  if (type === '4') {
    return [
      {
        width: 100,
        title: '消耗时间',
        align: 'center',
        key: 'createTime',
        // 去掉时间后面的八位
        render: (row) => {
          return row.createTime ? row.createTime.substring(0, 10) : '';
        },
      },
      { width: 100, title: '机构ID', align: 'center', key: 'orgId' },
      { width: 100, title: '公司名称', align: 'center', key: 'merchantName' },
      { width: 100, title: '公司别名', align: 'center', key: 'companyAlias' },
      { width: 100, title: '主账号', align: 'center', key: 'accountName' },
      { width: 100, title: '商务对接人', align: 'center', key: 'contractSignaturer' },
      { width: 100, title: '运营负责人', align: 'center', key: 'operation' },
      { width: 100, title: '机构创建人', align: 'center', key: 'createOrgBy' },
      {
        width: 100,
        title: '消耗服务',
        align: 'center',
        key: 'planName',
        // 暂时写死叫推广服务 ty_todo 待处理
        render: () => {
          return h('div', [h('span', '推广服务')]);
        },
      },
      { width: 100, title: '消耗备注', align: 'center', key: 'approvalRemark' },
      {
        width: 100,
        title: '消耗费用(元)',
        align: 'center',
        key: 'consumePrice',
      },
    ];
  }
  if (type === '5') {
    return [
      { width: 100, title: '退款时间', align: 'center', key: 'createTime' },
      { width: 100, title: '机构ID', align: 'center', key: 'orgId' },
      { width: 100, title: '公司名称', align: 'center', key: 'merchantName' },
      { width: 100, title: '公司别名', align: 'center', key: 'companyAlias' },
      { width: 100, title: '主账号', align: 'center', key: 'accountName' },
      { width: 100, title: '商务对接人', align: 'center', key: 'contractSignaturer' },
      { width: 100, title: '运营负责人', align: 'center', key: 'operation' },
      { width: 100, title: '机构创建人', align: 'center', key: 'createOrgBy' },
      {
        width: 100,
        title: '退款金额(元)',
        align: 'center',
        key: 'refundMoney',
      },
      // 充值凭证 点击查看图片
      {
        width: 100,
        title: '充值凭证',
        align: 'center',
        key: 'fileList',
        render(row) {
          if (row.fileList && row.fileList.length) {
            return h(
              'span',
              {
                style: {
                  color: '#197cfa',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                },
                onClick: () => {
                  viewerApi({
                    options: {
                      toolbar: true,
                      url: 'filePath',
                      initialViewIndex: 0,
                    },
                    images: row.fileList,
                  });
                },
              },
              `查看图片(${row.fileList.length})`
            );
          }
          return '';
        },
      },
      {
        width: 100,
        title: '退款日期',
        align: 'center',
        key: 'refundTime',
        // 去掉时间后面的八位
        render: (row) => {
          return row.refundTime ? row.refundTime.substring(0, 10) : '';
        },
      },
      { width: 100, title: '提交人', align: 'center', key: 'createBy' },
      { width: 100, title: '退款备注', align: 'center', key: 'remark' },
      { width: 100, title: '财务审核', align: 'center', key: 'financeName' },
      { width: 100, title: '财务审核时间', align: 'center', key: 'auditTime' },
      { width: 100, title: '审核备注', align: 'center', key: 'approvalRemark' },
      {
        width: 100,
        title: '状态',
        align: 'center',
        key: 'status',
        render(row) {
          // ty_todo 处理不同状态展示样式
          return row.status;
        },
      },
    ];
  }
  if (type === '6') {
    return [
      { width: 100, title: '坏账记录日期', align: 'center', key: 'createTime' },
      { width: 100, title: '机构ID', align: 'center', key: 'orgId' },
      { width: 100, title: '公司名称', align: 'center', key: 'merchantName' },
      { width: 100, title: '公司别名', align: 'center', key: 'companyAlias' },
      { width: 100, title: '主账号', align: 'center', key: 'accountName' },
      { width: 100, title: '商务对接人', align: 'center', key: 'contractSignaturer' },
      { width: 100, title: '运营负责人', align: 'center', key: 'operation' },
      { width: 100, title: '机构创建人', align: 'center', key: 'createOrgBy' },
      {
        width: 100,
        title: '坏账金额(元)',
        align: 'center',
        key: 'price',
      },
      { width: 100, title: '提交人', align: 'center', key: 'createBy' },
      { width: 100, title: '坏账备注', align: 'center', key: 'remark' },
      { width: 100, title: '财务审核', align: 'center', key: 'financeName' },
      { width: 100, title: '财务审核时间', align: 'center', key: 'auditTime' },
      { width: 100, title: '审核备注', align: 'center', key: 'approvalRemark' },
      {
        width: 100,
        title: '状态',
        align: 'center',
        key: 'status',
        render(row) {
          // ty_todo 处理不同状态展示样式
          return row.status;
        },
      },
    ];
  }
  if (type === '7') {
    return [
      { width: 100, title: '转账时间', align: 'center', key: 'createTime' },
      { width: 100, title: '公司名称', align: 'center', key: 'merchantName' },
      { width: 100, title: '公司别名', align: 'center', key: 'companyAlias' },
      { width: 100, title: '转出账号', align: 'center', key: 'sourceName' },
      { width: 100, title: '转入账号', align: 'center', key: 'targetName' },
      {
        width: 100,
        title: '转账类型',
        align: 'center',
        key: 'transferType',
        // 类型修改 transferType 等于GIFTLIMIT 是赠送余额 等于RECHARGEMONEY 是充值余额 等于CREDITLIMIT是信用额度
        render: (row) => {
          return row.transferType == 'GIFTLIMIT'
            ? '赠送余额'
            : row.transferType == 'RECHARGEMONEY'
            ? '充值余额'
            : '';
        },
      },
      { width: 100, title: '转账金额', align: 'center', key: 'money' },
      { width: 100, title: '操作人', align: 'center', key: 'createBy' },
    ];
  }
  return [];
};
