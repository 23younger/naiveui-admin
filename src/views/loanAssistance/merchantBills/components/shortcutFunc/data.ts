import { getUserAdmList } from '@/api/common';
import { xdAccountBalanceCompanyList } from '@/api/loanAssistance/merchantBills';
import { FormSchema } from '@/components/Form';
import { FormRules } from 'naive-ui';
import { storage } from '@/utils/Storage';
import { ADMUSERID } from '@/store/mutation-types';

export const shortcutFuncList = [
  {
    id: 1,
    name: '新增充值',
    permission: '1d0a8ab4-b0f3-4859-8395-ad7835187f13',
    imgSrc: new URL('@/assets/images/hrskImages/fast-icon-01.webp', import.meta.url).href,
  },
  {
    id: 2,
    name: '新增赠送',
    permission: '335a691b-a87d-46b7-81f5-d208f62e5825',
    imgSrc: new URL('@/assets/images/hrskImages/fast-icon-02.webp', import.meta.url).href,
  },
  {
    id: 3,
    name: '新增退款',
    permission: '7b0c5ae8-4059-4855-a288-39df0af321f4',
    imgSrc: new URL('@/assets/images/hrskImages/fast-icon-03.webp', import.meta.url).href,
  },
  {
    id: 4,
    name: '新增坏账',
    permission: 'b6cb55d9-caf3-4edd-8100-2e2c861da947',
    imgSrc: new URL('@/assets/images/hrskImages/fast-icon-04.webp', import.meta.url).href,
  },
];

export const rules: FormRules = {
  busiId: { required: true, message: '请选择机构', trigger: 'change' },
};

export const schemas_topUp: FormSchema[] = [
  {
    field: 'busiId',
    component: 'ApiNSelect',
    label: '机构别名',
    componentProps: {
      placeholder: '请选择机构别名',
      api: xdAccountBalanceCompanyList,
      labelField: 'alias',
      valueField: 'busiId',
    },
    showRequireMark: true,
  },
  {
    field: 'accountName',
    component: 'NInput',
    label: '主账号',
    showRequireMark: true,
  },
  {
    field: 'rechargeMoney',
    component: 'NInput',
    label: '充值金额',
    showRequireMark: true,
  },
  {
    field: 'applicantName',
    component: 'ApiNSelect',
    label: '充值人',
    componentProps: {
      placeholder: '请选择充值人',
      api: getUserAdmList,
      labelField: 'userName',
      valueField: 'userId',
      disabled: true,
    },
    showRequireMark: true,
    defaultValue: storage.get(ADMUSERID, ''),
  },
  {
    field: 'fileList',
    component: 'BasicUpload',
    label: '充值凭证',
    componentProps: {
      action: `/v1.0/files`,
      // headers: 'uploadHeaders',
      data: { type: 0 },
      name: 'files',
      width: 100,
      height: 100,
      helpText: '单个文件不超过2MB，最多只能上传10个文件',
    },
    showRequireMark: true,
  },
];
