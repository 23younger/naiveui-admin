import {
  getBusiApiList,
  getBusiList,
  postRelationAccount,
  getXdProductServiceByBusinessId,
} from '@/api/popularize/planLoanManage';
import { FormSchema } from '@/components/Form/index';
import { type FormRules } from 'naive-ui';
import { ref } from 'vue';

const busiIdOptions = ref<any[]>([]); // 公司别名
const accountOptions = ref<any[]>([]); // 关联账号
const apiListOptions = ref<any[]>([]); // 对接方式
const productServiceListOptions = ref<any[]>([]); // 助贷服务

// 获取-公司别名
const getBusiListFn = async () => {
  const data = await getBusiList();
  busiIdOptions.value = data;
};

// 获取-关联账号
const getAccountListFn = async (row) => {
  accountOptions.value = await postRelationAccount(row);
};

// 获取-对接方式
const getApiListFn = async (row) => {
  apiListOptions.value = await getBusiApiList(row);
};

// 获取-助贷服务，根据机构ID获取助贷服务列表
const getServiceByBusinessId = async (row) => {
  productServiceListOptions.value = await getXdProductServiceByBusinessId(row);
};

getBusiListFn();

export const rules: FormRules = {
  name: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入名称',
  },
  address: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入地址',
  },
  date: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: '请选择日期',
  },
};

export const schemas: FormSchema[] = [
  {
    field: 'name',
    component: 'NInput',
    label: '推广计划名称',
    labelWidth: 'auto',
    labelStyle: {
      fontSize: '16px',
    },
    showRequireMark: true,
    componentProps: {
      placeholder: '请输入推广计划名称',
    },
  },
  {
    field: 'border_bottom_slot',
    label: '',
    slot: 'border_bottom_slot',
    giProps: {
      span: 24,
    },
    showFeedback: false,
  },
  {
    field: 'title_slot',
    label: '',
    slot: 'title_slot',
    giProps: {
      span: 24,
    },
  },
  {
    field: 'busiId',
    component: 'NSelect',
    label: '公司别名',
    componentProps: ({ formModel }) => {
      return {
        placeholder: '请选择公司别名',
        labelField: 'alias',
        valueField: 'bid',
        options: busiIdOptions.value,
        onUpdateValue: (val, row) => {
          formModel['relateAccount'] = '';
          formModel['apiId'] = '';
          formModel['serviceId'] = '';
          accountOptions.value = [];
          apiListOptions.value = [];
          if (val) {
            getAccountListFn(row);
            getApiListFn(row);
            getServiceByBusinessId(row);
          }
        },
      };
    },
    showRequireMark: true,
  },
  {
    field: 'relateAccount',
    component: 'NSelect',
    label: '关联账号',
    componentProps: {
      labelField: 'userName',
      valueField: 'account',
      options: accountOptions,
    },
  },
  {
    field: 'apiId',
    component: 'NSelect',
    label: '对接方式',
    componentProps: {
      labelField: 'name',
      valueField: 'apiId',
      options: productServiceListOptions,
    },
  },
  {
    field: 'apiId',
    component: 'NInput',
    label: '借款金额（元）', // 正整数，不得相同
    labelWidth: 'auto',
    componentProps: {
      pair: true,
      separator: '-',
      defaultValue: ['100', '200'],
      onchange: (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
      },
    },
  },
  {
    field: 'serviceId',
    component: 'NSelect',
    label: '助贷服务',
    componentProps: {
      labelField: 'showName',
      valueField: 'id',
      options: productServiceListOptions,
    },
  },
];
