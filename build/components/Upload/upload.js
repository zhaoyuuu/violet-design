var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useRef, useState } from 'react';
import axios from 'axios';
import UploadList from './uploadList';
import Dragger from './dragger';
/**
 * 通过点击或者拖拽上传文件
 */
export var Upload = function (props) {
    var action = props.action, defaultFileList = props.defaultFileList, beforeUpload = props.beforeUpload, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, onChange = props.onChange, onRemove = props.onRemove, headers = props.headers, name = props.name, data = props.data, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, children = props.children, drag = props.drag;
    var fileInput = useRef(null);
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    var updateFileList = function (updateFile, updateObj) {
        // useState是异步的，为了获得当前最新的fileList值，setFileList里写函数形式即可
        setFileList(function (prevList) {
            return prevList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    var handleClick = function () {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };
    var handleRemove = function (file) {
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return item.uid !== file.uid; });
        });
        onRemove && onRemove(file);
    };
    // 函数：执行文件的上传
    var uploadFiles = function (files) {
        // 把filelist格式转为数组
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            if (!beforeUpload) {
                post(file);
            }
            else {
                var result = beforeUpload(file);
                // beforeUpload的结果分为 boolean 和 Promise，分情况：
                if (result && result instanceof Promise) {
                    // then只有一个参数，代表成功的函数，故拒绝的期约不会执行post()
                    result.then(function (processedFile) {
                        post(processedFile);
                    });
                }
                else if (result !== false) {
                    post(file);
                }
            }
        });
    };
    // 真正发起post文件上传的部分
    var post = function (file) {
        // 整理好文件
        var _file = {
            uid: Date.now() + 'uploadFile',
            status: 'ready',
            size: file.size,
            name: file.name,
            raw: file,
        };
        setFileList(function (prevList) {
            return __spreadArray([_file], prevList, true);
        });
        var formData = new FormData();
        formData.append(name || 'file', file);
        // 添加用户自定义的data
        data &&
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        axios
            .post(action, formData, {
            // 文件上传必须使用该值
            headers: __assign(__assign({}, headers), { 'Content-Type': 'multipart/form-data' }),
            // axios本来就支持的属性:withCredentials(是否携带cookie)
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total);
                if (percentage < 100) {
                    // 更新file文件的status和percent值
                    updateFileList(_file, { status: 'uploading', percent: percentage });
                    onProgress && onProgress(percentage, _file);
                }
            },
        })
            .then(function (res) {
            updateFileList(_file, { status: 'success', response: res.data });
            var finalFile = __assign(__assign({}, _file), { status: 'success', response: res.data });
            onSuccess && onSuccess(res.data, finalFile);
            onChange && onChange(finalFile);
        })
            .catch(function (err) {
            updateFileList(_file, { status: 'error', error: err });
            var finalFile = __assign(__assign({}, _file), { status: 'error', error: err });
            onError && onError(err, finalFile);
            onChange && onChange(finalFile);
        });
    };
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (!files)
            return;
        uploadFiles(files);
        // 上传完，将文件地址即input的value清空
        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };
    return (React.createElement("div", { className: "violetUpload" },
        React.createElement("div", { className: "violetUpload__input", onClick: handleClick }, drag ? (React.createElement(Dragger, { onFile: function (files) {
                uploadFiles(files);
            } }, children)) : (children)),
        React.createElement("input", { className: "violetInput", style: { display: 'none' }, type: "file", ref: fileInput, onChange: handleFileChange, accept: accept, multiple: multiple }),
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove })));
};
export default Upload;
