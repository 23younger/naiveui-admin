<template>
  <n-card :bordered="false" class="proCard">
    <BasicForm @register="register" @submit="reloadTable" @reset="reloadTable" />

    <BasicTable
      :columns="handleColumns(columns)"
      :request="loadDataTable"
      :row-key="(row) => row.id"
      ref="tableRef"
      :actionColumn="actionColumn"
      @update:checked-row-keys="onCheckedRow"
      :scroll-x="1090"
    >
      <template #toolbar>
        <n-button
          type="primary"
          size="small"
          @click="createOrEditFn(undefined)"
          v-permission="'fe6515c8-1121-4710-a664-75ee8b6ecb62'"
        >
          新增推广
        </n-button>
        <n-button
          type="primary"
          size="small"
          :disabled="!checkedKeys.length"
          v-permission="'246f2c74-2ffc-43f1-8f5d-32140789e0af'"
          @click="switchOrDelFn(1)"
          >开启</n-button
        >
        <n-button
          type="primary"
          size="small"
          :disabled="!checkedKeys.length"
          v-permission="'246f2c74-2ffc-43f1-8f5d-32140789e0af'"
          @click="switchOrDelFn(0)"
          >关闭</n-button
        >
        <n-button
          type="primary"
          size="small"
          v-permission="'f1f28517-c624-4143-8a95-68101ccee628'"
          @click="handleCopy(undefined)"
          :disabled="checkedKeys.length !== 1"
          >复制</n-button
        >
        <n-button
          type="primary"
          size="small"
          v-permission="'ea3a2d31-c352-4d13-b6f7-154e0f0a9a4a'"
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
    getTableSelfList,
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
            auth: ['f1f28517-c624-4143-8a95-68101ccee628'],
          },
          {
            label: '编辑',
            size: 'small',
            onClick: createOrEditFn.bind(null, record),
            auth: ['372465ac-63be-44e1-8bc3-58bcb163222c'],
          },
          {
            label: '删除',
            size: 'small',
            onClick: handleDelete.bind(null, record),
            auth: ['ea3a2d31-c352-4d13-b6f7-154e0f0a9a4a'],
          },
          {
            label: '排除渠道',
            size: 'small',
            onClick: promotionManageFn.bind(null, record),
            auth: ['d8757228-d854-4579-8144-d7c1ff5c02b2'],
          },
          {
            label: '权重',
            size: 'small',
            onClick: updateWeightFn.bind(null, record),
            auth: ['5f20514e-0a26-48d4-8fcc-afd6daf9b5ed'],
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
      item_status.auth = ['246f2c74-2ffc-43f1-8f5d-32140789e0af'];
    }
    return newColumns;
  };

  const loadDataTable = async (res) => {
    return await getTableSelfList({ ...getFieldsValue(), ...res, permissions: true });
  };

  function onCheckedRow(rowKeys) {
    checkedKeys.value = rowKeys;
  }

  function reloadTable() {
    tableRef.value.reload();
    checkedKeys.value = [];
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
