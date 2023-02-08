import React, { FC } from 'react';
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}
export interface UploadProps {
    /**必选参数, 上传的地址 */
    action: string;
    /**默认已经上传的文件列表 */
    defaultFileList?: UploadFile[];
    /**上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传。 */
    beforeUpload?: (file: File) => boolean | Promise<File>;
    /**文件上传时的钩子 */
    onProgress?: (percentage: number, file: UploadFile) => void;
    /**文件上传成功时的钩子 */
    onSuccess?: (data: any, file: UploadFile) => void;
    /**文件上传失败时的钩子 */
    onError?: (err: any, file: UploadFile) => void;
    /**文件状态改变时的钩子，上传成功或者失败时都会被调用	 */
    onChange?: (file: UploadFile) => void;
    /**文件列表移除文件时的钩子 */
    onRemove?: (file: UploadFile) => void;
    /**设置上传的请求头部 */
    headers?: {
        [key: string]: any;
    };
    /**上传的文件字段名 */
    name?: string;
    /**上传时附带的额外参数 */
    data?: {
        [key: string]: any;
    };
    /**支持发送 cookie 凭证信息 */
    withCredentials?: boolean;
    /**接受上传的文件类型 */
    accept?: string;
    /**是否支持多选文件 */
    multiple?: boolean;
    children?: React.ReactNode;
    /**是否支持拖拽上传 */
    drag?: boolean;
}
/**
 * 通过点击或者拖拽上传文件
 * ### 引用方法
 *
 * ~~~js
 * import { Upload } from 'violetUI'
 * ~~~
 */
export declare const Upload: FC<UploadProps>;
export default Upload;
