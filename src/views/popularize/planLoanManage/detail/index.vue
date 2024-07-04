<template>
  <n-card>
    <BasicForm @register="register" @submit="handleSubmit">
      <template #border_bottom_slot>
        <div class="line"></div>
      </template>
      <template #title_slot>
        <div class="title_slot">推广信息</div>
      </template>
    </BasicForm>
  </n-card>
</template>

<script setup lang="ts" name="PopularizeDetail">
  import { BasicForm, useForm } from '@/components/Form/index';
  import { schemas } from './form';

  const [register] = useForm({
    gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
    showActionButtonGroup: false,
    labelWidth: 80,
    schemas,
  });

  const handleSubmit = () => {
    console.log('handleSubmit');
  };
</script>

<style scoped lang="less">
  .line {
    width: 100%;
    border-bottom: 1px solid #dfdfdf;
  }
  .title_slot {
    font-size: 16px;
  }
</style>
