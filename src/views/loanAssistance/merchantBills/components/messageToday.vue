<template>
  <!-- 充值信息 -->
  <div class="messageClass">
    <div class="messageContent" style="background: #2d4ff6">
      <div class="content-title">
        <img src="../../../../assets/images/hrskImages/institutional-transaction-01.png" alt="" />
        <h3>今日充值({{ getdate(1) }})</h3>
      </div>
      <span>
        <span style="font-size: 20px">￥</span
        >{{ statisticsAccount.todayRecharge ? statisticsAccount.todayRecharge : 0 }}
      </span>
    </div>
    <div class="messageContent" style="background: #fa8230">
      <div class="content-title">
        <img src="../../../../assets/images/hrskImages/institutional-transaction-02.png" alt="" />
        <h3>今日消耗({{ getdate(1) }})</h3>
      </div>
      <p>
        <span style="font-size: 20px">￥</span>
        {{ statisticsAccount.consumeMoney ? statisticsAccount.consumeMoney : 0 }}
      </p>
    </div>
    <div class="messageContent" style="background: #0cabf0">
      <div class="content-title">
        <img src="../../../../assets/images/hrskImages/institutional-transaction-03.png" alt="" />
        <h3>今日退单({{ getdate(1) }})</h3>
      </div>
      <p>
        <span style="font-size: 20px">￥</span>
        {{ statisticsAccount.chargebacksMoney ? statisticsAccount.chargebacksMoney : 0 }}
      </p>
    </div>
    <div class="messageContent" style="background: #fe494b">
      <div class="content-title">
        <img src="../../../../assets/images/hrskImages/institutional-transaction-04.png" alt="" />
        <h3>今日赠送({{ getdate(1) }})</h3>
      </div>
      <p>
        <span style="font-size: 20px">￥</span
        >{{ statisticsAccount.sumGiveMoney ? statisticsAccount.sumGiveMoney : 0 }}
      </p>
    </div>
    <div class="messageContent" style="background: #0bba61">
      <div class="content-title">
        <img src="../../../../assets/images/hrskImages/institutional-transaction-05.png" alt="" />
        <h3>今日退款({{ getdate(1) }})</h3>
      </div>
      <p>
        <span style="font-size: 20px">￥</span
        >{{ statisticsAccount.sumRefundMoney ? statisticsAccount.sumRefundMoney : 0 }}
      </p>
    </div>
    <div class="messageContent" style="background: #8a42f1">
      <div class="content-title">
        <img src="../../../../assets/images/hrskImages/institutional-transaction-06.png" alt="" />
        <h3>本月充值({{ getdate(0) }})</h3>
      </div>
      <p>
        <span style="font-size: 20px">￥</span
        >{{ statisticsAccount.monthRecharge ? statisticsAccount.monthRecharge : 0 }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { billStatisticsAccount } from '@/api/loanAssistance/merchantBills';
  import { getdate } from '@/utils/dateUtil';

  const statisticsAccount = ref<any>({});
  const BillStatisticsAccountFn = async () => {
    const data = await billStatisticsAccount();
    statisticsAccount.value = data;
  };

  BillStatisticsAccountFn();
</script>

<style scoped lang="less">
  .messageClass {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    /* 自适应列数，每列最小宽度为200px */
    grid-gap: 10px;
    /* 盒子之间的间距 */
    margin-top: 10px;
    // padding: 20px;

    .messageContent {
      // width: 240px;
      height: 120px;
      background-color: #f0f0f0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      justify-content: space-evenly;
      margin-bottom: 20px;
      padding-left: 10px;
      // margin-right: 1%;
      border-radius: 8px;

      .content-title {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        img {
          width: 24px;
          height: 24px;
          margin-right: 5px;
        }

        h3 {
          color: #fff;
          font-size: 18px;
          font-weight: 500;
        }
      }

      span {
        color: #fff;
        font-size: 32px;
        font-weight: 700;
      }

      p {
        color: #fff;
        font-size: 32px;
        font-weight: 700;
      }
    }
  }
  @media screen and (max-width: 800px) {
    .messageClass {
      display: flex;
      flex-wrap: wrap;
      margin-top: 4px;

      .messageContent {
        flex: auto;
        height: 80px;
        background-color: #f0f0f0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        justify-content: space-evenly;
        margin-bottom: 4px;
        padding-left: 10px;
        border-radius: 8px;

        .content-title {
          display: flex;
          align-items: center;
          margin-bottom: 10px;

          img {
            width: 20px;
            height: 20px;
          }

          h3 {
            color: #fff;
            font-size: 12px;
            font-weight: 500;
          }
        }

        span {
          color: #fff;
          font-size: 20px;
          font-weight: 700;
        }

        p {
          color: #fff;
          font-size: 20px;
          font-weight: 700;
        }
      }
    }
  }
</style>
