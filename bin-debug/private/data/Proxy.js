var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Proxy = (function () {
    function Proxy() {
        this.value = {};
    }
    Proxy.observe = function (o, callObj, proxy) {
        var t = proxy || new Proxy();
        var _loop_1 = function (k) {
            if (o[k] instanceof Function) {
                throw "observer mush function";
            }
            if (!t[k])
                t[k] = [o[k]];
            else
                t[k].push(o[k]);
            Object.defineProperty(this_1, k, {
                get: function () { return t.value[k]; },
                set: function (v) {
                    t.value[k] = v;
                    for (var _i = 0, _a = t[k]; _i < _a.length; _i++) {
                        var i = _a[_i];
                        i.call(callObj, t.value[k]);
                    }
                },
            });
        };
        var this_1 = this;
        for (var k in o) {
            _loop_1(k);
        }
        return t;
    };
    Proxy.dispose = function () {
    };
    return Proxy;
}());
__reflect(Proxy.prototype, "Proxy");
//# sourceMappingURL=Proxy.js.map