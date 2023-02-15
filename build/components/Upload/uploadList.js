import React from 'react';
import Icon from '../Icon';
import Progress from '../Progress/progress';
export var UploadList = function (props) {
    var fileList = props.fileList, onRemove = props.onRemove;
    return (React.createElement("ul", { className: "violetUpload__list" }, fileList.map(function (item) {
        return (React.createElement("li", { className: "violetUpload__list__item", key: item.uid },
            React.createElement("span", { className: "fileName fileName--".concat(item.status) },
                React.createElement(Icon, { icon: "file-alt", theme: "secondary" }),
                item.name),
            React.createElement("span", { className: "fileStatus" },
                (item.status === 'uploading' || item.status === 'ready') && (React.createElement(Icon, { icon: "spinner", theme: "primary" })),
                item.status === 'success' && (React.createElement(Icon, { icon: "check-circle", theme: "success" })),
                item.status === 'error' && (React.createElement(Icon, { icon: "times-circle", theme: "danger" }))),
            React.createElement("span", { className: "fileActions" },
                React.createElement(Icon, { icon: "times", onClick: function () {
                        onRemove(item);
                    } })),
            item.status === 'uploading' && (React.createElement(Progress, { percent: item.percent || 0, showInfo: true }))));
    })));
};
export default UploadList;
