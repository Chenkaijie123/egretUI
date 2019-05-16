var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var mgr;
(function (mgr) {
    var DataObjectMgr = (function () {
        function DataObjectMgr() {
            this.pool = [];
        }
        DataObjectMgr.prototype.init = function () { };
        DataObjectMgr.prototype.pop = function () {
            var r = this.pool.pop() || Object.create(null);
            return r;
        };
        DataObjectMgr.prototype.push = function () {
            var item = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                item[_i] = arguments[_i];
            }
            for (var _a = 0, item_1 = item; _a < item_1.length; _a++) {
                var i = item_1[_a];
                for (var k in i) {
                    delete i[k];
                }
                this.pool.push(i);
            }
        };
        return DataObjectMgr;
    }());
    mgr.DataObjectMgr = DataObjectMgr;
    __reflect(DataObjectMgr.prototype, "mgr.DataObjectMgr", ["IMgr"]);
})(mgr || (mgr = {}));
//# sourceMappingURL=DataObjectMgr.js.map