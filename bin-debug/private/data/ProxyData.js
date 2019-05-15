var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**主要是处理数据代理的数组类型 */
var ProxyData = (function (_super) {
    __extends(ProxyData, _super);
    function ProxyData(info) {
        return _super.call(this, info) || this;
    }
    Object.defineProperty(ProxyData.prototype, "length", {
        // protected data:T[] = [];
        /**获取源数据长度，如果不是数组或者未初始化返回0 */
        get: function () {
            var l = 0;
            if (this.is(DataType.ARRAY) && this.data)
                l = this.data.length;
            return l;
        },
        enumerable: true,
        configurable: true
    });
    ProxyData.set = function (proxyArray, index) {
        var i = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            i[_i - 2] = arguments[_i];
        }
        proxyArray.splice.apply(proxyArray, [index, 0].concat(i));
        proxyArray.emit();
    };
    ProxyData.prototype.concat = function () {
        var i = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            i[_i] = arguments[_i];
        }
        this.$array();
        var r = (_a = this.data).concat.apply(_a, i);
        this.emit();
        return r;
        var _a;
    };
    ProxyData.prototype.map = function (cb, obj) {
        this.$array();
        var r = this.data.map(cb, obj);
        // this.emit();
        return r;
    };
    ProxyData.prototype.pop = function () {
        this.$array();
        var r = this.data.pop();
        this.emit();
        return r;
    };
    ProxyData.prototype.push = function () {
        var v = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            v[_i] = arguments[_i];
        }
        this.$array();
        (_a = this.data).push.apply(_a, v);
        this.emit();
        var _a;
    };
    ProxyData.prototype.shift = function () {
        this.$array();
        var r = this.data.shift();
        this.emit();
        return r;
    };
    ProxyData.prototype.unshift = function () {
        var v = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            v[_i] = arguments[_i];
        }
        this.$array();
        (_a = this.data).unshift.apply(_a, v);
        this.emit();
        var _a;
    };
    ProxyData.prototype.splice = function (index, length) {
        if (length === void 0) { length = 0; }
        var i = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            i[_i - 2] = arguments[_i];
        }
        this.$array();
        var r = (_a = this.data).splice.apply(_a, [index, length].concat(i));
        this.emit();
        return r;
        var _a;
    };
    /**设置数组信息 */
    ProxyData.prototype.$array = function () {
        if (!this.data)
            this.data = [];
        this.dataType = DataType.ARRAY;
    };
    /**
     * @private
     */
    ProxyData.prototype.$clear = function () {
        if (this.dataType == DataType.ARRAY)
            this.data.length = 0;
    };
    return ProxyData;
}(ProxyDataBase));
__reflect(ProxyData.prototype, "ProxyData");
//# sourceMappingURL=ProxyData.js.map