var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 显示实体管理器
 */
var mgr;
(function (mgr) {
    /**
     * function pop(T) 获取实例
     * function push(T) 把实体组件加入到管理器
     */
    var CompomentMgr = (function () {
        function CompomentMgr() {
            /**定时清除控制 */
            this.autoClear = true;
            /**缓存中的组件如果超过这个时间将有可能被清除 */
            this.clearTime = 60 * 5 * 1000;
            /**缓存中如果面板超过这个时长不用就有可能被销毁 */
            this.winRime = 60 * 10 * 1000;
            /**清理时间超过改值将退出清理，等待下次清理 */
            this.timeLimit = 100;
            this.$counter = 0; //累加到30执行一次清理
            /**对象池 */
            this.$pool = {};
            /**窗口管理 */
            this.$win = [];
        }
        CompomentMgr.prototype.init = function () {
        };
        /**
         * 获取对象
         * @param v Function
         */
        CompomentMgr.prototype.pop = function (v) {
            var ls = this.$pool[v.prototype["__class__"]];
            var res;
            if (!ls || !ls.length)
                res = new v;
            else
                res = ls.pop();
            res.init();
            return res;
        };
        /**获取界面实例 */
        CompomentMgr.prototype.getWin = function (v) {
            var ls = this.$win;
            var res;
            for (var i = 0, l = ls.length; i < l; i++) {
                if (ls[i] instanceof v) {
                    res = ls.splice(i, 1)[0];
                    break;
                }
            }
            if (!res)
                res = new v();
            return res;
        };
        /**把不用的对象加入缓存，由管理器管理 */
        CompomentMgr.prototype.push = function (i) {
            i.$clear && i.$clear();
            i.activeTime = egret.getTimer();
            if (egret.is(i, "Iview")) {
                this.$win.push(i);
            }
            else {
                var k = egret.getQualifiedClassName(i);
                if (!this.$pool[k])
                    this.$pool[k] = [];
                this.$pool[k].push(i);
                if (++this.$counter > 30)
                    this.clear();
            }
        };
        /**
         * 清理对象池，该方法不会全部清空对象池
         */
        CompomentMgr.prototype.clear = function () {
            this.$counter = 0;
            if (!this.autoClear)
                return;
            var t = egret.getTimer(); //当前时间
            var cTime = this.clearTime;
            var tL = this.timeLimit;
            var p = this.$pool;
            var limit = this.timeLimit;
            var temp;
            for (var k in p) {
                while (p[k].length > 5) {
                    temp = p[k][0];
                    if (t - temp.activeTime > cTime) {
                        temp.$destory && temp.$destory();
                        delete p[k][0];
                    }
                    else {
                        break;
                    }
                    //超过时间退出清理
                    if (egret.getTimer() - t > tL)
                        return;
                }
            }
        };
        /**
         * 清理面板
         */
        CompomentMgr.prototype.destoryView = function () {
            var wins = this.$win;
            var len = this.winRime;
            var limitTime = this.timeLimit;
            var t = egret.getTimer();
            var w;
            while (w = wins[0]) {
                if (t - w.activeTime > len) {
                    w.$destory();
                    delete wins[0];
                    if (egret.getTimer() - t > limitTime)
                        return; //超时
                }
                else {
                    return;
                }
            }
        };
        return CompomentMgr;
    }());
    mgr.CompomentMgr = CompomentMgr;
    __reflect(CompomentMgr.prototype, "mgr.CompomentMgr", ["IMgr"]);
})(mgr || (mgr = {}));
//# sourceMappingURL=CompomentMgr.js.map