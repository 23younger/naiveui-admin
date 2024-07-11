import type { ComputedRef, Ref } from 'vue';
import type { FormProps, FormSchema, FormActionType } from '../types/form';
import { unref, toRaw } from 'vue';
import { isArray, isFunction, isObject } from '@/utils/is';
import { deepMerge } from '@/utils';

declare type EmitType = (event: string, ...args: any[]) => void;

interface UseFormActionContext {
  emit: EmitType;
  getProps: ComputedRef<FormProps>;
  schemaRef: Ref<Nullable<FormSchema[]>>;
  getSchema: ComputedRef<FormSchema[]>;
  formModel: Recordable;
  formElRef: Ref<FormActionType>;
  defaultFormModel: Recordable;
  loadingSub: Ref<boolean>;
  handleFormValues: Function;
}

export function useFormEvents({
  emit,
  getProps,
  formModel,
  schemaRef,
  getSchema,
  formElRef,
  defaultFormModel,
  loadingSub,
  handleFormValues,
}: UseFormActionContext) {
  // 验证
  async function validate() {
    return unref(formElRef)?.validate();
  }

  // 提交
  async function handleSubmit(e?: Event): Promise<object | boolean> {
    e && e.preventDefault();
    loadingSub.value = true;
    const { submitFunc } = unref(getProps);
    if (submitFunc && isFunction(submitFunc)) {
      await submitFunc();
      loadingSub.value = false;
      return false;
    }
    const formEl = unref(formElRef);
    if (!formEl) return false;
    try {
      await validate();
      const values = getFieldsValue();
      loadingSub.value = false;
      emit('submit', values);
      return values;
    } catch (error: any) {
      emit('submit', false);
      loadingSub.value = false;
      console.error(error);
      return false;
    }
  }

  //清空校验
  async function clearValidate() {
    // @ts-ignore
    await unref(formElRef)?.restoreValidation();
  }

  //重置
  async function resetFields(): Promise<void> {
    const { resetFunc, submitOnReset } = unref(getProps);
    resetFunc && isFunction(resetFunc) && (await resetFunc());

    const formEl = unref(formElRef);
    if (!formEl) return;
    Object.keys(formModel).forEach((key) => {
      formModel[key] = unref(defaultFormModel)[key] || null;
    });
    await clearValidate();
    const fromValues = handleFormValues(toRaw(unref(formModel)));
    emit('reset', fromValues);
    submitOnReset && (await handleSubmit());
  }

  //获取表单值
  function getFieldsValue(): Recordable {
    const formEl = unref(formElRef);
    if (!formEl) return {};
    return handleFormValues(toRaw(unref(formModel)));
  }

  //设置表单字段值
  async function setFieldsValue(values: Recordable): Promise<void> {
    const fields = unref(getSchema)
      .map((item) => item.field)
      .filter(Boolean);

    Object.keys(values).forEach((key) => {
      const value = values[key];
      if (fields.includes(key)) {
        formModel[key] = value;
      }
    });
  }

  function setLoading(value: boolean): void {
    loadingSub.value = value;
  }

  // 修改schema，在原有schema基础上设置相关表单项，不可添加、删除，只能修改
  // 对schema可能会有resetSchema、removeSchemaByField、appendSchemaByField，视情况可添加
  function updateSchema(
    data: Partial<FormSchema> | Partial<FormSchema>[]
  ): Promise<void> | undefined {
    let updateSchema: Partial<FormSchema>[] = [];
    if (isObject(data)) {
      updateSchema.push(data as FormSchema);
    } else if (isArray(data)) {
      updateSchema = [...data];
    }

    const hasField = updateSchema.every((item) => Reflect.has(item, 'field') && item.field);

    if (!hasField) {
      console.error('未找到匹配的表单项');
      return;
    }

    const newSchema: FormSchema[] = [];
    unref(getSchema).forEach((val) => {
      const updateItem = updateSchema.find((v) => v.field === val.field);

      if (updateItem) {
        const newSchemaItem = deepMerge(val, updateItem);
        newSchema.push(newSchemaItem);
      } else {
        newSchema.push(val);
      }
    });

    schemaRef.value = newSchema;
  }

  return {
    handleSubmit,
    validate,
    resetFields,
    getFieldsValue,
    clearValidate,
    setFieldsValue,
    setLoading,
    updateSchema,
  };
}
