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
var win;
(function (win) {
    /**显示组件基类 */
    var BaseCompoment = (function (_super) {
        __extends(BaseCompoment, _super);
        function BaseCompoment() {
            var _this = _super.call(this) || this;
            _this.eventLs = [];
            return _this;
        }
        /**把对象加入到组件管理器中由管理器统一管理 */
        BaseCompoment.prototype.release = function () {
            ComposeMgr.push(this);
        };
        /**添加监听事件 */
        BaseCompoment.prototype.on = function (type, call) {
            this.$on(type, call);
            return this;
        };
        BaseCompoment.prototype.init = function () { };
        BaseCompoment.prototype.clear = function () { };
        BaseCompoment.prototype.destory = function () { };
        /**初始化，界面创建时执行一次 */
        BaseCompoment.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.init();
        };
        /**@private */
        BaseCompoment.prototype.$clear = function () {
            this.$off();
            this.clear();
        };
        /**@private */
        BaseCompoment.prototype.$destory = function () {
            this.eventLs = null;
            this.$clear();
            this.destory();
        };
        /**添加事件 */
        BaseCompoment.prototype.$on = function (type, call) {
            var listen = this.eventLs;
            listen.push({ type: call });
            this.addEventListener(type, call, this);
        };
        /**移除事件 */
        BaseCompoment.prototype.$off = function () {
            var listen = this.eventLs;
            var key;
            for (var _i = 0, listen_1 = listen; _i < listen_1.length; _i++) {
                var k = listen_1[_i];
                key = Object.keys(k)[0];
                this.removeEventListener(key, listen[key], this);
            }
            listen.length = 0;
        };
        return BaseCompoment;
    }(eui.Component));
    win.BaseCompoment = BaseCompoment;
    __reflect(BaseCompoment.prototype, "win.BaseCompoment", ["ICompoment"]);
})(win || (win = {}));
//# sourceMappingURL=BaseCompoment.js.map