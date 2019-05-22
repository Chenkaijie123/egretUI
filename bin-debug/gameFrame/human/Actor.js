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
var Actor = (function (_super) {
    __extends(Actor, _super);
    function Actor() {
        var _this = _super.call(this) || this;
        /**是否正在播放动作 */
        _this.isPlayBehavior = false;
        _this.beHaviorQueue = [];
        var c;
        c = CompomentMgr.pop(BaseClip);
        _this.body = c;
        _this.addChild(c);
        c = CompomentMgr.pop(BaseClip);
        _this.wearpon = c;
        _this.addChild(c);
        c = CompomentMgr.pop(BaseClip);
        _this.wing = c;
        _this.addChild(c);
        return _this;
    }
    Actor.prototype.init = function () {
    };
    Actor.prototype.clear = function () {
        this.body.stop();
        this.wearpon.stop();
        this.wing.stop();
        var queue = this.beHaviorQueue;
        while (queue.length) {
            queue.pop().release();
        }
    };
    Actor.prototype.destory = function () { };
    /**
     * 设置外观
     * 传参数会清空动作列表直接播放新动作
     */
    Actor.prototype.setAppearence = function (ignore, args) {
        var _this = this;
        if (ignore === void 0) { ignore = true; }
        if (ignore && !args && this.isPlayBehavior)
            return;
        this.isPlayBehavior = true;
        var queue = this.beHaviorQueue;
        egret.Tween.removeTweens(this);
        if (args) {
            while (queue.length)
                queue.pop().release();
        }
        var behavior = args || queue.shift();
        if (!behavior) {
            this.AI();
            return;
        }
        this.currentBehavior = behavior;
        var bodyUrl = behavior.getBodyUrl();
        var wearponUrl = behavior.getWearponUrl();
        var wingUrl = behavior.getWingUrl();
        var pTime = 1;
        var completeFn = null;
        //移动
        switch (behavior.behavior) {
            case behaviorType.run:
                pTime = -1;
                var _x = behavior.to.centerX;
                var _y = behavior.to.centerY;
                var _wid = this.x - _x;
                var _heig = this.y - _y;
                var _t = Math.sqrt(_wid * _wid + _heig * _heig) / behavior.speed * 1000;
                egret.Tween.get(this).to({ x: _x, y: _y }, _t).call(function () {
                    _this.setAppearence(false);
                    _this.isPlayBehavior = false;
                });
                break;
            case behaviorType.attack:
                completeFn = function () {
                    _this.isPlayBehavior = false;
                    _this.setAppearence();
                    return false;
                };
                break;
            case behaviorType.stand:
                completeFn = function () {
                    _this.isPlayBehavior = false;
                    _this.AI();
                    return false;
                };
                break;
            case behaviorType.die:
                // 播放击杀动作后回收
                completeFn = function () {
                    _this.isPlayBehavior = false;
                    Model.ins.mapContainer.removeRole(_this);
                    return false;
                };
                break;
            case behaviorType.beHit:
                completeFn = function () {
                    _this.isPlayBehavior = false;
                    _this.AI();
                    return false;
                };
                break;
        }
        this.body.complete = completeFn;
        if (behavior.direction > direction.down)
            this.scaleX = -1;
        else
            this.scaleX = 1;
        //设置资源
        bodyUrl && this.body.source({ json: bodyUrl + "_json", texture: bodyUrl + "_png", playTime: pTime });
        // wearponUrl && this.wearpon.source({ json: `${wearponUrl}_json`, texture: `${wearponUrl}_png`, playTime: pTime });
        // wingUrl && this.wing.source({ json: `${wingUrl}_json`, texture: `${wingUrl}_png`, playTime: pTime });
    };
    /**中断动作列表立即执行该动作 */
    Actor.prototype.play = function (type, x, y, moveSpeed) {
        if (x === void 0) { x = this.x; }
        if (y === void 0) { y = this.y; }
        if (moveSpeed === void 0) { moveSpeed = globalData.actorSpeed; }
        var node = dataFactory.pop();
        var p = this.parent.globalToLocal(x, y);
        node.nodeWid = globalData.mapWid;
        node.nodeHeig = globalData.mapHeig;
        node.centerX = p.x;
        node.centerY = p.y;
        var dir = globalData.getDir(this.x, this.y, p.x, p.y);
        if (dir == direction.keep)
            dir = this.currentBehavior.direction;
        var b = Behavior.create(node, dir, type, moveSpeed);
        this.setAppearence(false, b);
    };
    /**添加动作到播放列表 */
    Actor.prototype.addBehavior = function () {
        var b = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            b[_i] = arguments[_i];
        }
        (_a = this.beHaviorQueue).push.apply(_a, b);
        this.setAppearence();
        var _a;
    };
    Actor.prototype.AI = function () {
        //todo
        this.play(behaviorType.stand);
    };
    return Actor;
}(win.BaseCompoment));
__reflect(Actor.prototype, "Actor");
//# sourceMappingURL=Actor.js.map