<template>
  <n-card :bordered="false" class="proCard">
    <BasicForm @register="register" @submit="reloadTable" @reset="reloadTable" />

    <BasicTable
      :columns="handleColumns(columns)"
      :request="loadDataTable"
      :row-key="(row) => row.id"
      ref="tableRef"
      :actionColumn="actionColumn"
      :checked-row-keys="checkedKeys"
      @update:checked-row-keys="onCheckedRow"
      :scroll-x="1090"
    >
      <template #toolbar>
        <n-button
          type="primary"
          size="small"
          @click="createOrEditFn(undefined)"
          v-permission="'2ac4c5bb-75de-46cc-bf26-dc4544a585ae'"
        >
          新增推广
        </n-button>
        <n-button
          type="primary"
          size="small"
          :disabled="!checkedKeys.length"
          v-permission="'2ff9ddc0-c7e9-4563-877e-b556e7f16fe0'"
          @click="switchOrDelFn(1)"
          >开启</n-button
        >
        <n-button
          type="primary"
          size="small"
          :disabled="!checkedKeys.length"
          v-permission="'2ff9ddc0-c7e9-4563-877e-b556e7f16fe0'"
          @click="switchOrDelFn(0)"
          >关闭</n-button
        >
        <n-button
          type="primary"
          size="small"
          v-permission="'9b968cdc-f328-4fdb-8b42-6f5eb83fad65'"
          @click="handleCopy(undefined)"
          :disabled="checkedKeys.length !== 1"
          >复制</n-button
        >
        <n-button
          type="primary"
          size="small"
          v-permission="'0b4365d7-c934-4d58-b284-11ec410ca95c'"
          :disabled="!checkedKeys.length"
          @click="switchOrDelFn(-1)"
          >删除</n-button
        >
      </template>
    </BasicTable>

    <n-modal v-model:show="showUpdateWeight" :show-icon="false" preset="dialog" title="权重设置">
      <n-input
        type="text"
        v-model:value="setWeight.weight"
        :allow-input="onlyAllowNumber"
        placeholder="只能输入数字"
      />
      <template #action>
        <n-space>
          <n-button @click="() => (showUpdateWeight = false)">取消</n-button>
          <n-button type="info" :loading="formBtnLoading" @click="confirmForm">确定</n-button>
        </n-space>
      </template>
    </n-modal>
  </n-card>
</template>

<script lang="ts" setup name="PlanPeerManage">
  import { h, reactive, ref } from 'vue';
  import { BasicTable, TableAction } from '@/components/Table';
  import { BasicForm, useForm } from '@/components/Form/index';
  import {
    updateAlliancePlanWeight,
    getTableList,
    getXdPlanCopy,
    postXdPlanBatchDeal,
  } from '@/api/popularize/planPeerManage';
  import { columns } from './columns';
  import { schemas } from './form';
  import { useRouter } from 'vue-router';
  import { cloneDeep } from 'lodash-es';

  const router = useRouter();
  const tableRef = ref();
  const checkedKeys = ref<any[]>([]);

  const showUpdateWeight = ref(false);
  const formBtnLoading = ref(false);

  const setWeight = reactive({
    alliancePlanId: null,
    weight: '',
  });
  const onlyAllowNumber = (value: string) => !value || /^\d+$/.test(value);

  const actionColumn = reactive({
    width: 200,
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
            label: '复制',
            size: 'small',
            onClick: handleCopy.bind(null, record),
            auth: ['9b968cdc-f328-4fdb-8b42-6f5eb83fad65'],
          },
          {
            label: '编辑',
            size: 'small',
            onClick: createOrEditFn.bind(null, record),
            auth: ['a54ee97c-8773-4090-937d-98e574cdeceb'],
          },
          {
            label: '删除',
            size: 'small',
            onClick: handleDelete.bind(null, record),
            auth: ['0b4365d7-c934-4d58-b284-11ec410ca95c'],
          },
          {
            label: '排除渠道',
            size: 'small',
            onClick: promotionManageFn.bind(null, record),
            auth: ['5c677a27-d185-46e2-8180-e88af2e7ddf6'],
          },
          {
            label: '权重',
            size: 'small',
            onClick: updateWeightFn.bind(null, record),
            auth: ['07bde5b5-20d7-43ae-a51f-25212720658b'],
          },
        ],
      });
    },
  });

  const [register, { getFieldsValue }] = useForm({
    gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
    labelWidth: 80,
    schemas,
  });

  const handleColumns = (columns) => {
    const newColumns = cloneDeep(columns);
    const item_status = newColumns.find((v) => v.key === 'status');
    if (item_status) {
      item_status.auth = ['2ff9ddc0-c7e9-4563-877e-b556e7f16fe0'];
    }
    return newColumns;
  };

  const loadDataTable = async (res) => {
    return await getTableList({ ...getFieldsValue(), ...res, permissions: true });
  };

  function onCheckedRow(rowKeys) {
    checkedKeys.value = rowKeys;
  }

  function reloadTable() {
    checkedKeys.value = [];
    tableRef.value.reload();
  }

  function createOrEditFn(record: Recordable | undefined) {
    if (record) {
      router.push({ name: 'PopularizeDetail', query: { id: record.id } });
      return;
    }
    router.push({ name: 'PopularizeDetail' });
  }

  async function switchOrDelFn(type: number) {
    const data = {
      action: type,
      ids: checkedKeys.value,
    };
    if (type === -1) {
      window['$dialog'].warning({
        title: '提示',
        content: '确定删除吗？',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: async () => {
          await postXdPlanBatchDealFn(data);
          window['$message'].success('删除成功');
          reloadTable();
        },
        onNegativeClick: () => {
          window['$message'].info('已取消删除');
        },
      });
      return;
    }
    await postXdPlanBatchDealFn(data);
    window['$message'].success('操作成功');
  }

  // 批量删除 开启关闭
  async function postXdPlanBatchDealFn(data) {
    await postXdPlanBatchDeal(data);
    reloadTable();
  }

  async function handleCopy(record: Recordable | undefined) {
    let id = null;
    if (!record) {
      id = checkedKeys.value[0];
    } else {
      id = record.id;
    }
    await getXdPlanCopy(id);
    window['$message'].success('复制成功');
    reloadTable();
  }

  function handleDelete(record: Recordable) {
    window['$dialog'].warning({
      title: '提示',
      content: '确定删除吗？',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: async () => {
        const data = {
          action: -1,
          ids: [record.id],
        };
        await postXdPlanBatchDeal(data);
        window['$message'].success('删除成功');
        reloadTable();
      },
      onNegativeClick: () => {
        window['$message'].info('已取消删除');
      },
    });
  }

  // 排除渠道 ty_todo 待ycr来do，基本推广配置暂不做
  async function promotionManageFn(row) {
    console.log('row', row);
    // this.productId = row.id
    // await this.getChannelTypesFn(row.id)
    // await this.getChannelByApi(row.id)
    // this.getChannelTypesVisible = true
  }

  function updateWeightFn(record: Recordable) {
    setWeight.alliancePlanId = record.id;
    setWeight.weight = record.weight ?? '';
    showUpdateWeight.value = true;
  }

  async function confirmForm(e) {
    e.preventDefault();
    formBtnLoading.value = true;
    try {
      await updateAlliancePlanWeight(setWeight);
      window['$message'].success('权重设置成功');
      formBtnLoading.value = false;
      showUpdateWeight.value = false;
      reloadTable();
    } catch (error) {
      formBtnLoading.value = false;
    }
  }
</script>

<style lang="less" scoped>
  .proCard .n-card__content .n-form {
    margin-bottom: 10px;
  }
  // @media screen and (max-width: 800px) {
  //   .proCard .n-card__content .n-form {
  //     margin-bottom: 10px;
  //   }
  // }
  .table-toolbar-right .n-button {
    margin-right: 4px;
  }
</style>
