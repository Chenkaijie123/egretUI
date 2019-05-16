var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Proxy = (function () {
    function Proxy() {
        this.value = {};
    }
    /**
     * 添加监视，返回代理对象，对数据的操作改为操作代理对象
     * @param o 监听函数集合，监听类型为各个key值
     * @param callObj 调用者
     * @param proxy 是否在改代理对象上监听，不传穿件新的代理对象
     * @returns 该函数返回的是源数据的代理对象
     */
    Proxy.observe = function (o, callObj, proxy) {
        var t = proxy || new Proxy();
        var _loop_1 = function (k) {
            if (!t.value[k])
                t.value[k] = new ProxyData(k);
            var temp = t.value[k];
            temp.on(k, o[k], callObj);
            Object.defineProperty(t, k, {
                get: function () {
                    if (temp.type == DataType.ARRAY)
                        return temp;
                    return temp.value();
                },
                set: function () {
                    var v = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        v[_i] = arguments[_i];
                    }
                    if (temp.type == DataType.ARRAY) {
                        temp.$clear();
                        temp.push.apply(temp, v);
                    }
                    else {
                        if (temp.type == DataType.OBJECT) {
                            for (var key in v[0]) {
                                temp.changeValueWithoutEmit(v[0][key], key);
                            }
                        }
                        else {
                            temp.changeValueWithoutEmit(v[0]);
                        }
                        temp.emit();
                    }
                },
            });
        };
        for (var k in o) {
            _loop_1(k);
        }
        return t;
    };
    /**移除所有监听 */
    Proxy.dispose = function (proxy, o, callObj) {
        if (!o) {
            for (var k in proxy.value) {
                proxy.value[k].clear();
            }
        }
        else {
            for (var k in o) {
                proxy.value[k].off(k, o[k], callObj);
            }
        }
    };
    /**获取数据代理对象 */
    Proxy.prototype.getProxyData = function (key) {
        return this.value[key];
    };
    return Proxy;
}());
__reflect(Proxy.prototype, "Proxy");
//# sourceMappingURL=Proxy.js.map