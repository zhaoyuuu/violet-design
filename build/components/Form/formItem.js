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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { FormContext } from './form';
var FormItem = function (props) {
    var _a = props, label = _a.label, children = _a.children, name = _a.name, valuePropName = _a.valuePropName, trigger = _a.trigger, getValueFromEvent = _a.getValueFromEvent, rules = _a.rules, validateTrigger = _a.validateTrigger;
    var _b = useContext(FormContext), dispatch = _b.dispatch, fields = _b.fields, initialValues = _b.initialValues, validateField = _b.validateField;
    var rowClass = classNames('violetRow', {
        '.violetRow--no__label': !label,
    });
    useEffect(function () {
        var value = (initialValues && initialValues[name]) || '';
        dispatch({
            type: 'addField',
            name: name,
            value: { label: label, name: name, value: value, rules: rules || [], errors: [] },
        });
    }, []);
    //获取store对应的value
    var fieldState = fields[name];
    var value = fieldState && fieldState.value;
    var errors = fieldState && fieldState.errors;
    var isRequired = rules === null || rules === void 0 ? void 0 : rules.some(function (rule) { return typeof rule !== 'function' && rule.required; });
    var hasError = errors && errors.length > 0;
    var labelClass = classNames({
        'violetForm--item__required': isRequired,
    });
    var itemClass = classNames('violetForm--item__control', {
        'violetForm--item__has__error': hasError,
    });
    var onValueUpdate = function (e) {
        var value = getValueFromEvent(e);
        console.log('new value', value);
        dispatch({ type: 'updateValue', name: name, value: value });
    };
    var onValueValidate = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validateField(name)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    // 1 手动的创建一个属性列表，需要有 value 以及 onChange 属性
    var controlProps = {};
    controlProps[valuePropName] = value;
    controlProps[trigger] = onValueUpdate;
    if (rules) {
        controlProps[validateTrigger] = onValueValidate;
    }
    // 2 获取 children 数组的第一个元素
    var childList = React.Children.toArray(children);
    // 没有子组件
    if (childList.length === 0) {
        console.error('No child element found in Form.Item, please provide one form component');
    }
    // 子组件大于一个
    if (childList.length > 1) {
        console.warn('Only support one child element in Form.Item, others will be omitted');
    }
    // 不是 ReactElement 的子组件
    if (!React.isValidElement(childList[0])) {
        console.error('Child component is not a valid React Element');
    }
    var child = childList[0];
    // 3 cloneElement，混合这个child 以及 手动的属性列表
    var returnChildNode = React.cloneElement(child, __assign(__assign({}, child.props), controlProps));
    return (React.createElement("div", { className: rowClass },
        label && (React.createElement("div", { className: "violetForm--item__label" },
            React.createElement("label", { title: label, className: labelClass }, label))),
        React.createElement("div", { className: "violetForm--item " },
            React.createElement("div", { className: itemClass }, returnChildNode),
            hasError && (React.createElement("div", { className: "violetForm--item__explain" },
                React.createElement("span", null, errors[0].message))))));
};
FormItem.defaultProps = {
    valuePropName: 'value',
    trigger: 'onChange',
    validateTrigger: 'onBlur',
    getValueFromEvent: function (e) { return e.target.value; },
};
export default FormItem;
