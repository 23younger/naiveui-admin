import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'Home',
    component: Layout,
    redirect: '/home/index',
    meta: {
      sort: 1,
      isRoot: true,
      hidden: true,
    },
    children: [
      {
        path: 'index',
        name: 'HomeIndex',
        meta: {
          title: '首页',
          affix: true,
        },
        component: () => import('@/views/home/index.vue'),
      },
    ],
  },
];

export default routes;
