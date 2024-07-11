import { h } from 'vue';
import { NIcon, NSwitch, NTooltip } from 'naive-ui';
import { InfoCircleOutlined } from '@vicons/antd';
import { BasicColumnWithSelection } from '@/components/Table';
import { postXdPlanBatchDeal, planInvalidFn } from '@/api/popularize/planPeerManage';
import { dayLIst } from '@/utils/dateUtil';

// 推广开关
const statusChange = async (value, row) => {
  if (!row.weight) return window['$message'].error('请先设置权重');
  await postXdPlanBatchDeal({
    ids: [row.id],
    action: value ? 1 : 0,
  });
  row.status = value ? 1 : 0;
};

export const columns: BasicColumnWithSelection = [
  {
    key: 't_selection',
    type: 'selection',
  },
  {
    title: '推广开关',
    key: 'status',
    width: 100,
    align: 'center',
    render(row) {
      return h(NSwitch, {
        value: row.status,
        checkedValue: 1,
        uncheckedValue: 0,
        onUpdateValue: (val) => {
          statusChange(val, row);
        },
      });
    },
  },
  {
    title: '有效状态',
    key: 'runStatus',
    width: 100,
    align: 'center',
    render(row) {
      return h(
        'div',
        {},
        row.runStatus === 0
          ? [
              h('span', {}, '无效'),
              h(
                NTooltip,
                {
                  trigger: 'click',
                  onUpdateShow(value) {
                    row.isInvalidPop = value;
                  },
                },
                {
                  trigger: () =>
                    h(
                      NIcon,
                      {
                        size: 18,
                        onClick: () => {
                          if (row.isInvalidPop) {
                            return;
                          }
                          row.runStatusInfo = '加载中...';
                          planInvalidFn(row)
                            .then((data) => {
                              if (data && data.listInvalid && data.listInvalid.length) {
                                const list = data.listInvalid;
                                let str = '';
                                list.forEach((item) => {
                                  str = str + item + '、';
                                });
                                row.runStatusInfo = str.slice(0, -1);
                                return;
                              }
                              row.runStatusInfo = '';
                            })
                            .catch(() => {
                              row.runStatusInfo = '加载失败';
                            });
                        },
                      },
                      {
                        default: () => h(InfoCircleOutlined),
                      }
                    ),
                  default: () => {
                    return row.runStatusInfo ?? '';
                  },
                }
              ),
            ]
          : '有效'
      );
    },
  },
  {
    title: '推广ID',
    key: 'id',
    align: 'center',
    width: 100,
  },
  {
    title: '推广名称',
    key: 'name',
    align: 'center',
    ellipsis: false,
    width: 150,
  },
  {
    title: '产品名称',
    key: 'productName',
    align: 'center',
    ellipsis: false,
    width: 150,
  },
  {
    title: '公司名称',
    key: 'companyName',
    align: 'center',
    ellipsis: false,
    width: 150,
  },
  {
    title: '投放区域',
    key: 'range',
    align: 'center',
    width: 100,
    ellipsis: false,
    render(row) {
      return h('div', {}, [
        h(
          NTooltip,
          { trigger: 'click' },
          {
            trigger: () =>
              h(
                'span',
                {
                  style: {
                    display: '-webkit-box',
                    '-webkit-line-clamp': '2',
                    '-webkit-box-orient': 'vertical',
                    overflow: 'hidden',
                    cursor: 'pointer',
                  },
                },
                row.rangeCity == 0 ? '全国' : row.cityName
              ),
            default: () => {
              return row.rangeCity == 0 ? '全国' : row.cityName;
            },
          }
        ),
      ]);
    },
  },
  {
    title: '每日最高推广金额(元)',
    key: 'applyAmountDelivered',
    align: 'center',
    width: 180,
    render: (row) =>
      row.applyAmountDelivered || row.applyAmountDelivered == 0
        ? row.applyAmountDelivered.toFixed(2)
        : '',
  },
  {
    title: '推广日期',
    key: 'days',
    align: 'center',
    width: 120,
    ellipsis: false,
    render: (row) =>
      row.days
        ? // 这里需要将0-6分别展示星期一到星期天
          dayLIst(row.days)
        : '-',
  },
  {
    title: '推广时间段',
    key: 'planTimeList',
    align: 'center',
    width: 140,
    render: (row) => (row.planTimeList ? row.planTimeList.join(',') : '-'),
  },
  {
    title: '今日消耗数量',
    key: 'totalLimit',
    align: 'center',
    width: 140,
    sorter: true,
  },
  {
    title: '权重',
    key: 'weight',
    align: 'center',
    width: 100,
    sorter: true,
  },
  {
    title: '结算方式',
    key: 'settlementType',
    align: 'center',
    width: 100,
    render: (row) => {
      const { cooperateType, cpaType, cpsType } = row;
      const cpaTypeMap = {
        16: '申请',
        17: '进件',
      };
      const cpsTypeMap = {
        1: '佣金',
      };
      let text = '-';
      if (cooperateType === 1) {
        text = `CPA(${cpaTypeMap[cpaType]})`;
      } else if (cooperateType === 2) {
        text = `CPS(${cpsTypeMap[cpsType]})`;
      } else if (cooperateType === 3) {
        text = `CPA(${cpaTypeMap[cpaType]})+CPS(${cpsTypeMap[cpsType]})`;
      }
      return text;
    },
  },
  {
    title: '单价',
    key: 'price',
    align: 'center',
    width: 100,
    sorter: true,
    render: (row) => {
      let text = '-';
      const { cooperateType, price, cpsPrice } = row;
      switch (cooperateType) {
        case 1: {
          text = price;
          break;
        }
        case 2: {
          text = price + '%';
          break;
        }
        case 3: {
          text = `${price} + ${cpsPrice}%`;
          break;
        }
      }
      if (isNaN(parseInt(price))) {
        text = '-';
      }
      return text;
    },
  },
  {
    title: '今日推广金额(元)',
    key: 'dailyConsAmount',
    align: 'center',
    width: 150,
    render: (row) =>
      row.dailyConsAmount || row.dailyConsAmount == 0 ? row.dailyConsAmount.toFixed(2) : '',
  },
  {
    title: '总推广金额(元)',
    key: 'totalConsAmount',
    align: 'center',
    width: 150,
    render: (row) =>
      row.totalConsAmount || row.totalConsAmount == 0 ? row.totalConsAmount.toFixed(2) : '',
  },
  {
    title: '所需条件',
    key: 'busiAccess',
    align: 'center',
    width: 150,
    ellipsis: false,
  },
  {
    title: '创建人',
    key: 'createBy',
    align: 'center',
    width: 120,
  },
  {
    title: '创建时间',
    key: 'createTime',
    align: 'center',
    width: 120,
    ellipsis: false,
  },
  {
    title: '最后修改时间',
    key: 'updateTime',
    align: 'center',
    width: 120,
    ellipsis: false,
  },
];
