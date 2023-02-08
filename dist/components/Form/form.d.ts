import { ValidateError } from 'async-validator';
import React, { ReactNode } from 'react';
import useStore, { FormState } from './useStore';
export type RenderProps = (form: FormState) => ReactNode;
export interface FormProps {
    name?: string;
    initialValues?: Record<string, any>;
    children?: ReactNode | RenderProps;
    onFinish?: (values: Record<string, any>) => void;
    onFinishFailed?: (values: Record<string, any>, errors: Record<string, ValidateError[]>) => void;
}
export type IFormContext = Pick<ReturnType<typeof useStore>, 'dispatch' | 'fields' | 'validateField'> & Pick<FormProps, 'initialValues'>;
export type IFormRef = Omit<ReturnType<typeof useStore>, 'fields' | 'dispatch' | 'form'>;
export declare const FormContext: React.Context<IFormContext>;
export declare const Form: React.ForwardRefExoticComponent<FormProps & React.RefAttributes<IFormRef>>;
export default Form;
