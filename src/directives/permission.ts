import { ObjectDirective } from 'vue';
import { usePermission } from '@/hooks/web/usePermission';
import { isArray } from '@/utils/is';

export const permission: ObjectDirective = {
  mounted(el: HTMLButtonElement, binding) {
    if (binding.value == undefined) return;
    const value = binding.value;

    if (!value) return;
    const val = isArray(value) ? value : [value];
    const { hasPermission } = usePermission();
    if (!hasPermission(val)) {
      el.parentNode?.removeChild(el);
    }
  },
};
