var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ProxyData = (function () {
    function ProxyData(info) {
        this.listener = {};
        this.caller = {};
        this.info = info;
    }
    ProxyData.prototype.changeValueWithoutEmit = function (value, key) {
        if (key) {
            if (!this.data)
                this.data = {};
            this.data[key] = value;
        }
        else {
            this.data = value;
        }
    };
    ProxyData.prototype.setData = function (value, key) {
        if (key) {
            if (!this.data)
                this.data = {};
            this.data[key] = value;
        }
        else {
            this.data = value;
        }
        this.emit();
    };
    ProxyData.prototype.on = function (type, fn, caller) {
        if (this.has(type, fn, caller))
            return false;
        var listener = this.listener;
        var callers = this.caller;
        listener[type] = fn;
        callers[type] = caller;
        return true;
    };
    ProxyData.prototype.off = function (type, fn, caller) {
        if (!this.has(type, fn, caller))
            return;
        delete this.caller[type];
        delete this.listener[type];
    };
    ProxyData.prototype.has = function (type, fn, caller) {
        var listener = this.listener;
        var callers = this.caller;
        return listener[type] == fn || callers[type] == caller;
    };
    ProxyData.prototype.clear = function () {
        this.data = null;
        this.caller = null;
        this.listener = null;
        this.info = null;
    };
    /**执行监听事件 */
    ProxyData.prototype.emit = function () {
        var fn = this.listener;
        var caller = this.caller;
        var args = this.data;
        for (var k in fn) {
            fn[k].call(caller[k], args);
        }
    };
    ProxyData.prototype.value = function () {
        return this.data;
    };
    return ProxyData;
}());
__reflect(ProxyData.prototype, "ProxyData");
//# sourceMappingURL=ProxyData.js.map