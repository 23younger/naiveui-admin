import { ComponentType } from './index';
import type { CSSProperties } from 'vue';
import type { GridProps, GridItemProps } from 'naive-ui/lib/grid';
import type { ButtonProps } from 'naive-ui/lib/button';

export interface FormSchema {
  field: string;
  label: string;
  labelWidth?: number | string;
  labelStyle?: CSSProperties | string | undefined;
  labelMessage?: string;
  labelMessageStyle?: object | string;
  defaultValue?: any;
  component?: ComponentType;
  componentProps?:
    | Recordable
    | ((opt: { formActionType: FormActionType; formModel: Recordable }) => Recordable);
  slot?: string;
  rules?: object | object[];
  giProps?: GridItemProps;
  ifShow?: boolean;
  isFull?: boolean;
  suffix?: string;
  showRequireMark?: boolean;
  showFeedback?: boolean;
}

export interface FormProps {
  model?: Recordable;
  labelWidth?: number | string;
  labelStyle?: CSSProperties | string | undefined;
  schemas?: FormSchema[];
  inline: boolean;
  layout?: string;
  size: string;
  labelPlacement: string;
  isFull: boolean;
  showActionButtonGroup?: boolean;
  showResetButton?: boolean;
  resetButtonOptions?: Partial<ButtonProps>;
  showSubmitButton?: boolean;
  showAdvancedButton?: boolean;
  submitButtonOptions?: Partial<ButtonProps>;
  submitButtonText?: string;
  resetButtonText?: string;
  gridProps?: GridProps;
  giProps?: GridItemProps;
  resetFunc?: () => Promise<void>;
  submitFunc?: () => Promise<void>;
  submitOnReset?: boolean;
  baseGridStyle?: CSSProperties;
  collapsedRows?: number;
}

export interface FormActionType {
  submit: () => Promise<any>;
  setProps: (formProps: Partial<FormProps>) => Promise<void>;
  updateSchema: (
    schemaProps: Partial<FormSchema> | Partial<FormSchema>[]
  ) => Promise<void> | undefined;
  setFieldsValue: (values: Recordable) => void;
  clearValidate: (name?: string | string[]) => Promise<void>;
  getFieldsValue: () => Recordable;
  resetFields: () => Promise<void>;
  validate: (nameList?: any[]) => Promise<any>;
  setLoading: (status: boolean) => void;
}

export type RegisterFn = (formInstance: FormActionType) => void;

export type UseFormReturnType = [RegisterFn, FormActionType];
