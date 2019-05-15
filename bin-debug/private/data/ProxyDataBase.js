var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**数据代理类，主要是除了数组以外的数据类型 */
var ProxyDataBase = (function () {
    function ProxyDataBase(info) {
        /**监听器 */
        this.listener = {};
        /**调用者 */
        this.caller = {};
        this.info = info;
    }
    Object.defineProperty(ProxyDataBase.prototype, "type", {
        /**获取数据类型 */
        get: function () {
            return this.dataType;
        },
        enumerable: true,
        configurable: true
    });
    /**变更数据源 */
    ProxyDataBase.prototype.changeValueWithoutEmit = function (value, key) {
        var t;
        if (key) {
            if (!this.data)
                this.data = {};
            this.data[key] = value;
            t = DataType.OBJECT;
        }
        else {
            this.data = value;
            if (value instanceof Array) {
                t = DataType.ARRAY;
            }
            else {
                t = value instanceof Object ? DataType.OBJECT : DataType.BASIC;
            }
        }
        this.dataType = t;
    };
    ProxyDataBase.prototype.setData = function (value, key) {
        this.changeValueWithoutEmit(value, key);
        this.emit();
    };
    /**添加监听 */
    ProxyDataBase.prototype.on = function (type, fn, caller) {
        if (this.has(type, fn, caller))
            return false;
        var listener = this.listener;
        var callers = this.caller;
        if (!listener[type]) {
            listener[type] = [fn];
            callers[type] = [caller];
        }
        else {
            listener[type].push(fn);
            callers[type].push(caller);
        }
        return true;
    };
    /**移除监听 */
    ProxyDataBase.prototype.off = function (type, fn, caller) {
        if (!type || !fn || !caller)
            this.clear();
        if (!this.has(type, fn, caller))
            return;
        this.delectTarget(fn, this.listener[type]);
        this.delectTarget(caller, this.caller[type]);
    };
    /**是否存在监听器 */
    ProxyDataBase.prototype.has = function (type, fn, caller) {
        var listener = this.listener;
        var callers = this.caller;
        if (!listener[type] || !callers[type])
            return false;
        for (var i = 0, l = listener[type].length; i < l; i++) {
            if (listener[type][i] == fn)
                return true;
        }
        return false;
    };
    /**清空该代理对象 */
    ProxyDataBase.prototype.clear = function () {
        this.data = null;
        this.caller = {};
        this.listener = {};
        this.info = null;
    };
    /**执行监听事件 */
    ProxyDataBase.prototype.emit = function () {
        var _this = this;
        if (this.timer)
            return;
        this.timer = egret.setTimeout(function () {
            _this.callFn();
            _this.timer = 0;
        }, this, 0);
    };
    /**立即执行监听函数 */
    ProxyDataBase.prototype.reflesh = function () {
        egret.clearTimeout(this.timer);
        this.timer = 0;
        this.callFn();
    };
    /**获取数据源 */
    ProxyDataBase.prototype.value = function () {
        return this.data;
    };
    /**重写valueOf方法以支持运算 */
    ProxyDataBase.prototype.valueOf = function () {
        if (!this.data)
            return null;
        return this.data.valueOf();
    };
    /**重写toString方法以支持运算 */
    ProxyDataBase.prototype.toString = function () {
        if (!this.data)
            return null;
        return this.data.toString();
    };
    /**判断是否是某种数据类型 */
    ProxyDataBase.prototype.is = function (DataType) {
        return this.dataType == DataType;
    };
    /**移除目标（用于移除监听器以及调用者） */
    ProxyDataBase.prototype.delectTarget = function (ele, ls) {
        if (!ls || !ele)
            return;
        for (var i = 0, l = ls.length; i < l; i++) {
            if (ele == ls[i]) {
                ls.splice(i, 1);
            }
        }
    };
    /**执行监听函数 */
    ProxyDataBase.prototype.callFn = function () {
        var fn = this.listener;
        var caller = this.caller;
        var args = this.data;
        for (var k in fn) {
            if (!fn[k])
                continue;
            for (var i = 0, l = fn[k].length; i < l; i++) {
                fn[k][i].call(caller[k][i], args);
            }
        }
    };
    return ProxyDataBase;
}());
__reflect(ProxyDataBase.prototype, "ProxyDataBase");
/**代理对象的数据类型 */
var DataType;
(function (DataType) {
    /**基本数据类型 */
    DataType[DataType["BASIC"] = 0] = "BASIC";
    /**对象 */
    DataType[DataType["OBJECT"] = 1] = "OBJECT";
    /**数组 */
    DataType[DataType["ARRAY"] = 2] = "ARRAY";
})(DataType || (DataType = {}));
//# sourceMappingURL=ProxyDataBase.js.map