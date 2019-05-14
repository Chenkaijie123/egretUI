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
var ProxyArray = (function (_super) {
    __extends(ProxyArray, _super);
    function ProxyArray(info) {
        var _this = _super.call(this, info) || this;
        _this.data = [];
        return _this;
    }
    Object.defineProperty(ProxyArray.prototype, "length", {
        get: function () {
            return this.data.length;
        },
        enumerable: true,
        configurable: true
    });
    ProxyArray.set = function (proxyArray, index) {
        var i = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            i[_i - 2] = arguments[_i];
        }
        proxyArray.splice.apply(proxyArray, [index, 0].concat(i));
        proxyArray.emit();
    };
    ProxyArray.prototype.pop = function () {
        var r = this.data.pop();
        this.emit();
        return r;
    };
    ProxyArray.prototype.push = function () {
        var v = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            v[_i] = arguments[_i];
        }
        (_a = this.data).push.apply(_a, v);
        this.emit();
        var _a;
    };
    ProxyArray.prototype.shift = function () {
        var r = this.data.shift();
        this.emit();
        return r;
    };
    ProxyArray.prototype.unshift = function () {
        var v = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            v[_i] = arguments[_i];
        }
        (_a = this.data).unshift.apply(_a, v);
        this.emit();
        var _a;
    };
    ProxyArray.prototype.splice = function (index, length) {
        var i = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            i[_i - 2] = arguments[_i];
        }
        var r = (_a = this.data).splice.apply(_a, [index, length].concat(i));
        this.emit();
        return r;
        var _a;
    };
    ProxyArray.prototype.value = function () {
        return this.data;
    };
    /**
     * @private
     */
    ProxyArray.prototype.$clear = function () {
        this.data.length = 0;
    };
    return ProxyArray;
}(ProxyData));
__reflect(ProxyArray.prototype, "ProxyArray");
//# sourceMappingURL=ProxyArray.js.map