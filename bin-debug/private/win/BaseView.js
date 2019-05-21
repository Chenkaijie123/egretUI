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
    /**
     * 窗口基类
     */
    var BaseView = (function (_super) {
        __extends(BaseView, _super);
        function BaseView() {
            var _this = _super.call(this) || this;
            _this.autoDestory = true;
            return _this;
        }
        BaseView.prototype.open = function () { };
        BaseView.prototype.close = function () { };
        /**
         * 关闭调用函数，关闭时都会调用该方法一次
         * @private
         */
        BaseView.prototype.$close = function () {
            this.close();
            //加入窗口管理器队列,清理面板由管理器执行
            if (this.autoDestory) {
                CompomentMgr.push(this);
            }
            else {
                this.$clear();
            }
        };
        /**
         * 打开界面时都会调用该方法一次
         * @private
         */
        BaseView.prototype.$open = function () {
            this.open();
        };
        return BaseView;
    }(win.BaseCompoment));
    win.BaseView = BaseView;
    __reflect(BaseView.prototype, "win.BaseView", ["Iview"]);
})(win || (win = {}));
//# sourceMappingURL=BaseView.js.map