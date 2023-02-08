import React, { ReactNode } from 'react';
export type ProgressType = 'line' | 'circle';
export type ProgressStatus = 'success' | 'exception' | 'normal' | 'active';
export type ProgressSize = 'lg' | 'md' | 'sm';
export interface ProgressProps {
    /**百分比*/
    percent?: number;
    /**是否呈现进度和状态标志*/
    showInfo?: boolean;
    /**进度条状态*/
    status?: ProgressStatus;
    /**进度条颜色*/
    strokeColor?: string;
    /**stroke-linecap的样式*/
    strokeLinecap?: string;
    /**是否已经完成（达到100%）*/
    success?: boolean;
    /**圆环特有属性：内部圆环颜色*/
    innerColor?: string;
    /**进度条样式*/
    type?: ProgressType;
    /**大小*/
    size?: ProgressSize;
    /**类名*/
    className?: string;
    children?: ReactNode;
}
export declare const Progress: React.FC<ProgressProps>;
export default Progress;
