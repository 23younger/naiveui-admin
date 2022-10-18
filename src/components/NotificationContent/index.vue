<template></template>
<script lang="ts">
  import { useNotification } from 'naive-ui';

  export default {
    name: 'NotificationContent',
    setup() {
      //挂载在 window 方便与在js中使用
      window['$notification'] = useNotification();
    },
  };
</script>
