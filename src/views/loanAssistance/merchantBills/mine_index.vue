<template>
  <n-card :bordered="false" class="proCard">
    <!-- 今日交易信息 -->
    <messageToday />
    <!-- 快捷功能 -->
    <shortcutFuncComp />
    <div class="part-line">交易记录</div>
    <n-tabs v-model:value="tabPaneValue" @update:value="onTabChange">
      <n-tab-pane v-for="item in tabList" :key="item.name" :name="item.name" :tab="item.label" />
    </n-tabs>

    <!-- 表单 -->
    <BasicForm @register="register" @submit="reloadTable" @reset="reloadTable" />
    <!-- 表格 -->
    <BasicTable
      :columns="columns"
      :request="loadDataTable"
      :row-key="(row) => row.id"
      ref="tableRef"
      :maxHeight="'auto'"
      :actionColumn="actionColumn"
      :title="tableTitleMessage"
    />
  </n-card>
</template>

<script setup lang="ts" name="MMerchantBills">
  import { h, ref } from 'vue';
  import messageToday from './components/messageToday.vue';
  import shortcutFuncComp from './components/shortcutFunc/index.vue';
  import { tabList } from './const';
  import { BasicForm, useForm, FormSchema } from '@/components/Form/index';
  import { BasicColumn, BasicTable, TableAction } from '@/components/Table';
  import { getColumns } from './columns';
  import {
    getBillBadDebtsList,
    getBillConsumeList,
    getBillGiveList,
    getBillList,
    getBillRechargeRecordList,
    getBillRefundList,
    getBillTransferList,
    giveListSumMoney,
    rechargeListSumMoney,
  } from '@/api/loanAssistance/merchantBills';
  import { formatToDateTime } from '@/utils/dateUtil';

  const tabPaneValue = ref<string>('1');
  const schemas: FormSchema[] = [
    {
      field: 'searchName',
      component: 'NInput',
      label: '公司名称/别名/账号',
      labelWidth: 'auto',
      componentProps: {
        placeholder: '请输入公司名称/别名/账号',
      },
    },
    {
      field: 'status',
      component: 'NSelect',
      label: '状态',
      ifShow: false,
      componentProps: {
        options: [
          {
            label: '审批中',
            value: '1',
          },
          {
            label: '已充值',
            value: '2',
          },
          {
            label: '未通过',
            value: '3',
          },
        ],
      },
    },
    {
      field: 'queryTime',
      component: 'NDatePicker',
      label: '时间',
      ifShow: false,
      componentProps: {
        type: 'daterange',
      },
    },
  ];
  const tableRef = ref();
  const tableTitleMessage = ref<string>('');
  const columns = ref<BasicColumn[]>([]);
  const actionColumn = ref<any>(null);

  const [register, { getFieldsValue, updateSchema, resetFields }] = useForm({
    gridProps: { cols: '1 s:1 m:2 l:4 xl:4 2xl:4' },
    labelWidth: 80,
    schemas,
  });

  const loadDataTable = async (res) => {
    tableTitleMessage.value = '';
    const type = tabPaneValue.value;
    const fn =
      type === '1'
        ? getBillList
        : type === '2'
        ? getBillRechargeRecordList
        : type === '3'
        ? getBillGiveList
        : type === '4'
        ? getBillConsumeList
        : type === '5'
        ? getBillRefundList
        : type === '6'
        ? getBillBadDebtsList
        : type === '7'
        ? getBillTransferList
        : () => {};
    const { searchName, status, queryTime } = getFieldsValue();
    const params = {
      searchName,
      status,
      startTime: queryTime && queryTime[0] ? formatToDateTime(queryTime[0]) : undefined,
      endTime: queryTime && queryTime[1] ? formatToDateTime(queryTime[1]) : undefined,
      permissions: true,
      ...res,
    };
    const data = await fn(params);
    handleTitleMsg(params);
    return data;
  };

  function reloadTable() {
    tableRef.value.reload();
  }

  const onTabChange = (value: string) => {
    handleSearch(value);
    handleColumns(value);
    handleAction(value);
  };

  // 处理搜索栏
  const handleSearch = async (type: string) => {
    const formSchema: FormSchema[] = [
      {
        field: 'status',
        label: '状态',
        ifShow: ['2', '3', '5'].includes(type),
      },
      {
        field: 'queryTime',
        label: '时间',
        ifShow: true,
      },
    ];
    await updateSchema(formSchema);
    await resetFields();
  };

  // 处理表格title合计信息
  const handleTitleMsg = (params) => {
    const type = tabPaneValue.value;
    const fn = type === '2' ? rechargeListSumMoney : type === '3' ? giveListSumMoney : undefined;
    if (fn) {
      fn(params)
        .then((data) => {
          data = data ?? 0;
          let rangeText = '（全部）';
          if (params.startTime && params.endTime) {
            rangeText = params.startTime.substring(0, 10) + '-' + params.endTime.substring(0, 10);
          }
          tableTitleMessage.value = `合计${
            type === '2' ? '充值' : '赠送'
          }金额：${data}元${rangeText}`;
        })
        .catch(() => {
          tableTitleMessage.value = '';
        });
    } else {
      tableTitleMessage.value = '';
    }
  };

  // 处理表格columns
  const handleColumns = (type: string) => {
    columns.value = getColumns(type);
  };

  // 处理表格action
  const actionColumnSet = {
    width: 240,
    title: '操作',
    titleAlign: 'center',
    key: 'action',
    fixed: 'right',
    ellipsis: false,
    render(record) {
      return h(TableAction as any, {
        style: 'button',
        actions: [
          {
            label: '账单详情',
            size: 'small',
            // onClick: handleCopy.bind(null, record),
            auth: ['44a15d3a-e4a8-4879-b4bc-9eaf031f2f34'],
          },
          {
            label: '消耗明细统计',
            size: 'small',
            // onClick: createOrEditFn.bind(null, record),
            auth: ['5528fa3b-8a82-432c-85aa-a11a364efbc0'],
          },
          {
            label: '设置信用额度',
            size: 'small',
            // onClick: handleDelete.bind(null, record),
            auth: ['5ae063fe-2689-4aa2-aa11-c2487f2b9181'],
          },
          {
            label: '清空赠送余额',
            size: 'small',
            // onClick: promotionManageFn.bind(null, record),
            auth: ['51483d91-dd10-4c70-a779-7c734deb7386'],
          },
          {
            label: record.freeze ? '取消冻结信用额度' : '冻结信用额度',
            size: 'small',
            // onClick: updateWeightFn.bind(null, record),
            auth: ['e98b3054-57bb-4a88-b70f-9e3a4eb484b2'],
          },
          {
            label: '转账',
            size: 'small',
            // onClick: promotionManageFn.bind(null, record),
            auth: ['d36495f2-f1ce-46b0-888c-2bc1cd2a8115'],
          },
        ],
      });
    },
  };

  const handleAction = (type: string) => {
    actionColumn.value = type === '1' ? actionColumnSet : null;
  };

  // 初始化列表项和操作按钮
  handleColumns('1');
  handleAction('1');
</script>

<style scoped lang="less">
  .proCard {
    .n-card__content .n-form {
      margin-bottom: 10px;
    }
    .part-line {
      font-size: 14px;
      padding: 10px;
      border-bottom: 1px solid #dcdfe6;
      margin-top: 20px;
    }

    .n-tabs {
      margin-bottom: 8px;
    }
  }
  @media screen and (max-width: 800px) {
    .n-card {
      :deep(.n-card__content) {
        padding: 8px !important;
      }
    }
    .proCard {
      .part-line {
        margin-top: 8px;
      }
    }
  }
</style>
