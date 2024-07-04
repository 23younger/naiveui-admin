import { cityListApi } from '@/api/common';
import { FormSchema } from '@/components/Form/index';
import { type FormRules } from 'naive-ui';
import { ref } from 'vue';

const cityCodeList = ref<any[]>([]);
const getCityListFn = async () => {
  const data = await cityListApi();
  const arr: any[] = [];
  /**
   * 生成一个存放provinceCode的数组 进来就放进去
   * 每次获取前先判断数组中是否有相同的provinceCode
   * 有的话就不放进去
   */
  const codeArr: any[] = [];
  data.forEach((p: any) => {
    const find = arr.find((sp: any) => sp.provinceCode === p.provinceCode);
    if (!find) {
      const _filter = data.filter((sp) => sp.provinceCode === p.provinceCode);
      if (codeArr.indexOf(p.provinceCode) === -1) {
        codeArr.push(p.provinceCode);
        arr.push({
          name: p.provinceName,
          code: p.provinceCode,
          children: _filter,
        });
      }
    }
  });

  cityCodeList.value = arr;
};

getCityListFn();

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
    label: '推广/公司名称',
    labelWidth: 'auto',
    componentProps: {
      placeholder: '请输入名称',
    },
  },
  {
    field: 'cityCode',
    component: 'NTreeSelect',
    label: '推广城市',
    componentProps: {
      placeholder: '请选择城市',
      defaultValue: '',
      checkStrategy: 'child',
      labelField: 'name',
      keyField: 'code',
      overrideDefaultNodeClickBehavior: (info) => {
        if (info.option.children && info.option.children.length) {
          return 'toggleExpand';
        }
        return 'toggleSelect';
      },
      options: cityCodeList,
    },
  },
  {
    field: 'status',
    component: 'NSelect',
    label: '推广状态',
    componentProps: {
      placeholder: '请选择状态',
      options: [
        {
          label: '开',
          value: 1,
        },
        {
          label: '关',
          value: 0,
        },
      ],
    },
  },
  {
    field: 'running',
    component: 'NSelect',
    label: '有效状态',
    componentProps: {
      placeholder: '请选择状态',
      options: [
        {
          label: '有效',
          value: 1,
        },
        {
          label: '无效',
          value: 0,
        },
      ],
    },
  },
];
