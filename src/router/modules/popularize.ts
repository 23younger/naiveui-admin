import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { TableOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前
 *
 * */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/popularize',
    name: 'popularize',
    component: Layout,
    meta: {
      title: '推广管理',
      icon: renderIcon(TableOutlined),
      permissions: ['/popularize'],
      sort: 2,
    },
    children: [
      {
        path: 'plan-loan-manage',
        name: 'PlanLoanManage',
        meta: {
          title: '助贷推广计划-后台管理系统',
          keepAlive: true,
          permissions: ['view/plan/plan-manage-new-credit.html'],
        },
        component: () => import('@/views/bank-product/popularize-list/index.vue'),
      },
      {
        path: 'm-plan-loan-manage',
        name: 'm-plan-loan-manage',
        meta: {
          title: '我的助贷推广计划',
          permissions: ['view/plan/m-plan-loan-manage'],
        },
        component: () => import('@/views/bank-product/popularize-list/new_index.vue'),
      },
    ],
  },
];

export default routes;
