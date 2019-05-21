var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Behavior = (function () {
    function Behavior() {
    }
    // setAppearence(): void{
    // }
    Behavior.prototype.getBodyUrl = function () {
        var src;
        src = "" + (this.excData || 0) + srcType.body + this.behavior + (this.direction > direction.down ? this.direction - 4 : this.direction);
        while (src.length < 5)
            src = "0" + src;
        return src;
    };
    Behavior.prototype.getWearponUrl = function () {
        var src;
        src = "" + (this.excData || 0) + srcType.wearpom + this.behavior + this.direction;
        while (src.length < 5)
            src = "0" + src;
        return src;
    };
    Behavior.prototype.getWingUrl = function () {
        var src;
        src = "" + (this.excData || 0) + srcType.wing + this.behavior + this.direction;
        while (src.length < 5)
            src = "0" + src;
        return src;
    };
    Behavior.prototype.release = function () {
        this.to = this.direction = this.behavior = this.speed = this.excData = null;
        Behavior.pool.push(this);
    };
    Behavior.create = function (node, direction, behavior, speed, excData) {
        if (speed === void 0) { speed = globalData.actorSpeed; }
        if (excData === void 0) { excData = 0; }
        var o = Behavior.pool.pop() || new Behavior();
        o.to = node;
        o.direction = direction;
        o.behavior = behavior;
        o.speed = speed;
        o.excData = excData;
        return o;
    };
    Behavior.pool = [];
    return Behavior;
}());
__reflect(Behavior.prototype, "Behavior", ["IBehavior"]);
var srcType;
(function (srcType) {
    srcType[srcType["none"] = 0] = "none";
    srcType[srcType["body"] = 1] = "body";
    srcType[srcType["wearpom"] = 2] = "wearpom";
    srcType[srcType["wing"] = 3] = "wing";
})(srcType || (srcType = {}));
//# sourceMappingURL=Behavior.js.map