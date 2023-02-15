/* eslint-disable @typescript-eslint/no-namespace */
export var IDatePicker;
(function (IDatePicker) {
    //picker显示位置
    var PickerDirection;
    (function (PickerDirection) {
        PickerDirection[PickerDirection["TOP"] = 0] = "TOP";
        PickerDirection[PickerDirection["BOTTOM"] = 1] = "BOTTOM";
    })(PickerDirection = IDatePicker.PickerDirection || (IDatePicker.PickerDirection = {}));
    var ViewMode;
    (function (ViewMode) {
        ViewMode[ViewMode["YEAR"] = 0] = "YEAR";
        ViewMode[ViewMode["MONTH"] = 1] = "MONTH";
        ViewMode[ViewMode["DAY"] = 2] = "DAY";
    })(ViewMode = IDatePicker.ViewMode || (IDatePicker.ViewMode = {}));
    var TimeType;
    (function (TimeType) {
        TimeType["AM"] = "AM";
        TimeType["PM"] = "PM";
    })(TimeType = IDatePicker.TimeType || (IDatePicker.TimeType = {}));
})(IDatePicker || (IDatePicker = {}));
