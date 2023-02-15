import React, { useState } from 'react';
import classNames from 'classnames';
export var Dragger = function (props) {
    var onFile = props.onFile, children = props.children;
    var _a = useState(false), dragOver = _a[0], setDragOver = _a[1];
    var className = classNames('violetUpload__dragger', {
        'violetUpload__dragger--dragover': dragOver,
    });
    var handleDrage = function (e, over) {
        // 取消DragEvent的默认行为，否则不能区域中放置文件
        e.preventDefault();
        setDragOver(over);
    };
    // 拖动元素在可释放目标元素上释放的处理函数
    var handleDrop = function (e) {
        e.preventDefault();
        setDragOver(false);
        onFile(e.dataTransfer.files);
    };
    return (React.createElement("div", { className: className, onDragOver: function (e) { return handleDrage(e, true); }, onDragLeave: function (e) { return handleDrage(e, false); }, onDrop: handleDrop }, children));
};
export default Dragger;
