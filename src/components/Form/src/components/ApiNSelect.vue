<template>
  <n-select v-model:value="state" v-bind="props" :options="options" />
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { selectProps } from 'naive-ui/lib/select';
  import { propTypes } from '@/utils/propTypes';
  const props = defineProps({
    ...selectProps,
    api: {
      type: Function,
      default: null,
    },
    // api params
    apiPrams: propTypes.any.def({}),
  });
  const state = computed({
    get() {
      return props.value;
    },
    set(value) {
      emit('cus-change', value);
    },
  });
  const emit = defineEmits(['cus-change']);
  const options = ref<any[]>([]);
  const getApiOptions = () => {
    const { api, apiPrams } = props;
    if (!api) {
      options.value = props.options || [];
      return;
    }
    api(apiPrams)
      .then((data) => {
        options.value = data || [];
      })
      .catch(() => {
        options.value = [];
      });
  };
  getApiOptions();
</script>

<style scoped></style>
