<template>
  <n-loading-bar-provider>
    <n-dialog-provider>
      <DialogContent />
      <n-notification-provider>
        <NotificationContent />
        <n-message-provider>
          <MessageContent />
          <slot name="default"></slot>
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-loading-bar-provider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import {
    NDialogProvider,
    NNotificationProvider,
    NMessageProvider,
    NLoadingBarProvider,
  } from 'naive-ui';
  import { MessageContent } from '@/components/MessageContent';
  import { DialogContent } from '@/components/DialogContent';
  import { NotificationContent } from '@/components/NotificationContent';

  export default defineComponent({
    name: 'Application',
    components: {
      NDialogProvider,
      NNotificationProvider,
      NMessageProvider,
      NLoadingBarProvider,
      MessageContent,
      DialogContent,
      NotificationContent,
    },
    setup() {
      return {};
    },
  });
</script>
