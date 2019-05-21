var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GlobalData = (function () {
    function GlobalData() {
        this.actorSpeed = 300; //默认移动速度
        this.mapWid = 300; //地图宽度
        this.mapHeig = 300; //地图高度
    }
    /**
     * @param curX 当前x坐标
     * @param curY 当前y坐标
     * @param tarX 目标x坐标
     * @param tarY 目标y坐标
     */
    GlobalData.prototype.getDir = function (curX, curY, tarX, tarY) {
        var _x = curX - tarX;
        var _y = curY - tarY;
        var res;
        if (_x == 0) {
            if (_y == 0) {
                res = direction.keep;
            }
            else if (_y > 0) {
                res = direction.down;
                console.log("down");
            }
            else {
                res = direction.up;
                console.log("up");
            }
        }
        else if (_x > 0) {
            if (_y == 0) {
                res = direction.left;
                console.log("left");
            }
            else if (_y > 0) {
                res = direction.down_left;
                console.log("down_left");
            }
            else {
                res = direction.up_left;
                console.log("up_left");
            }
        }
        else {
            if (_y == 0) {
                res = direction.right;
                console.log("right");
            }
            else if (_y > 0) {
                res = direction.up_right;
                console.log("up_right");
            }
            else {
                res = direction.down_right;
                console.log("down_right");
            }
        }
        return res;
    };
    return GlobalData;
}());
__reflect(GlobalData.prototype, "GlobalData");
//# sourceMappingURL=GlobalData.js.map