import { useEffect, useState } from 'react';
function useDebounce(value, wait) {
    if (wait === void 0) { wait = 300; }
    var _a = useState(value), debouncedValue = _a[0], setDebouncedValue = _a[1];
    useEffect(function () {
        var handler = setTimeout(function () {
            setDebouncedValue(value);
        }, wait);
        return function () {
            clearTimeout(handler);
        };
    }, [value, wait]);
    return debouncedValue;
}
export default useDebounce;
