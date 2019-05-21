var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AILogic = (function () {
    function AILogic(role) {
        this.role = role;
    }
    return AILogic;
}());
__reflect(AILogic.prototype, "AILogic");
//# sourceMappingURL=AILogic.js.map