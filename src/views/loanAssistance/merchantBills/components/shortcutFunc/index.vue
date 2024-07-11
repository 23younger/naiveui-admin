<template>
  <div class="part-line">快捷功能</div>
  <div class="shortcutFunc">
    <div
      v-for="item in shortcutFuncList"
      :key="item.id"
      v-permission="item.permission"
      class="content"
      @click="clickUp(item.id)"
    >
      <img :src="item.imgSrc" alt="" />
      <span>{{ item.name }}</span>
    </div>
  </div>
  <BasicModal @register="register_topUp_modal">
    <template #default>
      <BasicForm @register="register_topUp_form" @submit="submit" :rules="rules" />
    </template>
  </BasicModal>
  <BasicModal @register="register_gift_modal">
    <template #default>
      <BasicForm @register="register_gift_form" />
    </template>
  </BasicModal>
  <BasicModal @register="register_refund_modal">
    <template #default>
      <BasicForm @register="register_refund_form" />
    </template>
  </BasicModal>
  <BasicModal @register="register_badDebt_modal">
    <template #default>
      <BasicForm @register="register_badDebt_form" />
    </template>
  </BasicModal>
</template>

<script setup lang="ts">
  import { shortcutFuncList, schemas_topUp, rules } from './data';
  import { BasicModal, useModal } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';

  const [register_topUp_modal, { openModal: openModal_topUp }] = useModal({ title: '新增充值' });
  const [register_gift_modal, { openModal: openModal_gift }] = useModal({ title: '新增赠送' });
  const [register_refund_modal, { openModal: openModal_refund }] = useModal({ title: '新增退款' });
  const [register_badDebt_modal, { openModal: openModal_badDebt }] = useModal({
    title: '新增坏帐',
  });

  const clickUp = (type) => {
    if (type === 1) {
      openModal_topUp();
    } else if (type === 2) {
      openModal_gift();
    } else if (type === 3) {
      openModal_refund();
    } else if (type === 4) {
      openModal_badDebt();
    }
  };

  const [register_topUp_form, { getFieldsValue }] = useForm({
    // showActionButtonGroup: false,
    schemas: schemas_topUp,
  });
  const [register_gift_form] = useForm({
    showActionButtonGroup: false,
  });
  const [register_refund_form] = useForm({
    showActionButtonGroup: false,
  });
  const [register_badDebt_form] = useForm({
    showActionButtonGroup: false,
  });

  const submit = () => {
    console.log('......', getFieldsValue());
  };
</script>

<style scoped lang="less">
  .shortcutFunc {
    display: flex;
    align-items: center;
    justify-content: space-around;
    // margin-top: 20px;
    padding: 20px;

    .content {
      display: flex;
      align-items: center;
      cursor: pointer;

      img {
        width: 36px;
        height: 36px;
        margin-right: 20px;
        // 虚线;
        // border: 1px dashed #E7EAEC;
      }

      span {
        font-size: 18px;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        color: #1d2129;

        &:hover {
          color: #197cfa !important;
        }
      }
    }
  }
  @media screen and (max-width: 800px) {
    // 快捷功能
    .shortcutFunc {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 10px 0;

      .content {
        display: flex;
        align-items: center;
        cursor: pointer;

        img {
          width: 20px;
          height: 20px;
          margin-right: 2px;
        }

        span {
          font-size: 12px;
          font-family: PingFang SC-Medium, PingFang SC;
          font-weight: 500;
          color: #1d2129;

          &:hover {
            color: #197cfa !important;
          }
        }
      }
    }
  }
</style>
