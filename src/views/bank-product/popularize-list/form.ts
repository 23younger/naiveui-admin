import { FormSchema } from '@/components/Form/index';
import { type FormRules } from 'naive-ui';

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
    labelMessage: '这是一个提示',
    component: 'NInput',
    label: '姓名',
    componentProps: {
      placeholder: '请输入姓名',
      onInput: (e: any) => {
        console.log(e);
      },
    },
    rules: [{ required: true, message: '请输入姓名', trigger: ['blur'] }],
  },
  {
    field: 'mobile',
    component: 'NInputNumber',
    label: '手机',
    componentProps: {
      placeholder: '请输入手机号码',
      showButton: false,
      onInput: (e: any) => {
        console.log(e);
      },
    },
  },
  {
    field: 'type',
    component: 'NSelect',
    label: '类型',
    componentProps: {
      placeholder: '请选择类型',
      options: [
        {
          label: '舒适性',
          value: 1,
        },
        {
          label: '经济性',
          value: 2,
        },
      ],
      onUpdateValue: (e: any) => {
        console.log(e);
      },
    },
  },
  {
    field: 'makeDate',
    component: 'NDatePicker',
    label: '预约时间',
    defaultValue: 1183135260000,
    componentProps: {
      type: 'date',
      clearable: true,
      onUpdateValue: (e: any) => {
        console.log(e);
      },
    },
  },
  {
    field: 'makeTime',
    component: 'NTimePicker',
    label: '停留时间',
    componentProps: {
      clearable: true,
      onUpdateValue: (e: any) => {
        console.log(e);
      },
    },
  },
  {
    field: 'status',
    label: '状态',
    //插槽
    slot: 'statusSlot',
  },
  {
    field: 'makeProject',
    component: 'NCheckbox',
    label: '预约项目',
    componentProps: {
      placeholder: '请选择预约项目',
      options: [
        {
          label: '种牙',
          value: 1,
        },
        {
          label: '补牙',
          value: 2,
        },
        {
          label: '根管',
          value: 3,
        },
      ],
      onUpdateChecked: (e: any) => {
        console.log(e);
      },
    },
  },
  {
    field: 'makeSource',
    component: 'NRadioGroup',
    label: '来源',
    componentProps: {
      options: [
        {
          label: '网上',
          value: 1,
        },
        {
          label: '门店',
          value: 2,
        },
      ],
      onUpdateChecked: (e: any) => {
        console.log(e);
      },
    },
  },
];
