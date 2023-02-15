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
import { useState, useReducer } from 'react';
import Schema from 'async-validator';
import mapValues from 'lodash-es/mapValues';
import each from 'lodash-es/each';
function fieldsReducer(state, action) {
    var _a, _b, _c;
    switch (action.type) {
        case 'addField': {
            return __assign(__assign({}, state), (_a = {}, _a[action.name] = __assign({}, action.value), _a));
        }
        case 'updateValue': {
            return __assign(__assign({}, state), (_b = {}, _b[action.name] = __assign(__assign({}, state[action.name]), { value: action.value }), _b));
        }
        case 'updateValidateResult': {
            var _d = action.value, isValid = _d.isValid, errors = _d.errors;
            return __assign(__assign({}, state), (_c = {}, _c[action.name] = __assign(__assign({}, state[action.name]), { isValid: isValid, errors: errors }), _c));
        }
        default: {
            return state;
        }
    }
}
// * react hooks
// * class - ant design
function useStore(initialValues) {
    var _this = this;
    // form state
    var _a = useState({ isValid: true, isSubmitting: false, errors: {} }), form = _a[0], setForm = _a[1];
    var _b = useReducer(fieldsReducer, {}), fields = _b[0], dispatch = _b[1];
    var getFieldValue = function (key) {
        return fields[key] && fields[key].value;
    };
    var getFieldsValue = function () {
        return mapValues(fields, function (item) { return item.value; });
    };
    var setFieldValue = function (name, value) {
        if (fields[name]) {
            dispatch({ type: 'updateValue', name: name, value: value });
        }
    };
    var resetFields = function () {
        if (initialValues) {
            each(initialValues, function (value, name) {
                if (fields[name]) {
                    dispatch({ type: 'updateValue', name: name, value: value });
                }
            });
        }
    };
    var transfromRules = function (rules) {
        return rules.map(function (rule) {
            if (typeof rule === 'function') {
                var calledRule = rule({ getFieldValue: getFieldValue });
                return calledRule;
            }
            else {
                return rule;
            }
        });
    };
    var validateField = function (name) { return __awaiter(_this, void 0, void 0, function () {
        var _a, value, rules, afterRules, descriptor, valueMap, validator, isValid, errors, e_1, err;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = fields[name], value = _a.value, rules = _a.rules;
                    afterRules = transfromRules(rules);
                    descriptor = (_b = {},
                        _b[name] = afterRules,
                        _b);
                    valueMap = (_c = {},
                        _c[name] = value,
                        _c);
                    validator = new Schema(descriptor);
                    isValid = true;
                    errors = [];
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, validator.validate(valueMap)];
                case 2:
                    _d.sent();
                    return [3 /*break*/, 5];
                case 3:
                    e_1 = _d.sent();
                    isValid = false;
                    err = e_1;
                    console.log('e', err.errors);
                    console.log('fields', err.fields);
                    errors = err.errors;
                    return [3 /*break*/, 5];
                case 4:
                    console.log('errors', isValid);
                    dispatch({ type: 'updateValidateResult', name: name, value: { isValid: isValid, errors: errors } });
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var validateAllFields = function () { return __awaiter(_this, void 0, void 0, function () {
        var isValid, errors, valueMap, descriptor, validator, e_2, err;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    isValid = true;
                    errors = {};
                    valueMap = mapValues(fields, function (item) { return item.value; });
                    descriptor = mapValues(fields, function (item) { return transfromRules(item.rules); });
                    validator = new Schema(descriptor);
                    setForm(__assign(__assign({}, form), { isSubmitting: true }));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, validator.validate(valueMap)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    e_2 = _a.sent();
                    isValid = false;
                    err = e_2;
                    errors = err.fields;
                    each(fields, function (value, name) {
                        // errors 中有对应的 key
                        if (errors[name]) {
                            var itemErrors = errors[name];
                            dispatch({ type: 'updateValidateResult', name: name, value: { isValid: false, errors: itemErrors } });
                        }
                        else if (value.rules.length > 0 && !errors[name]) {
                            dispatch({ type: 'updateValidateResult', name: name, value: { isValid: true, errors: [] } });
                        }
                        //  有对应的 rules，并且没有 errors
                    });
                    return [3 /*break*/, 5];
                case 4:
                    setForm(__assign(__assign({}, form), { isSubmitting: false, isValid: isValid, errors: errors }));
                    return [2 /*return*/, {
                            isValid: isValid,
                            errors: errors,
                            values: valueMap
                        }];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return {
        fields: fields,
        dispatch: dispatch,
        form: form,
        validateField: validateField,
        getFieldValue: getFieldValue,
        validateAllFields: validateAllFields,
        getFieldsValue: getFieldsValue,
        setFieldValue: setFieldValue,
        resetFields: resetFields,
    };
}
export default useStore;
