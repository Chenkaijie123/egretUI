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
var MapContainer = (function (_super) {
    __extends(MapContainer, _super);
    function MapContainer() {
        var _this = _super.call(this) || this;
        _this.$mapWid = 1200;
        _this.$mapHeig = 1200;
        _this.$mapLs = [];
        /**人物列表 */
        _this.roleLs = [];
        _this.mapGroup = new eui.Group();
        _this.roleGroup = new eui.Group();
        _this.addChild(_this.mapGroup);
        _this.addChild(_this.roleGroup);
        _this.init();
        return _this;
    }
    MapContainer.prototype.getRoleLayer = function () {
        return this.roleGroup;
    };
    MapContainer.prototype.init = function () {
        var mapCfg = [];
        this.changeMap(mapCfg);
        this.start();
    };
    /**数据纹理 */
    MapContainer.prototype.changeMap = function (cfg) {
        var ls = this.$mapLs;
        while (cfg.length > ls.length) {
            ls.push(CompomentMgr.pop(eui.Image));
        }
        var temp;
        while (cfg.length < ls.length) {
            temp = ls.pop();
            if (temp.parent)
                temp.parent.removeChild(temp);
            CompomentMgr.push(temp);
        }
        var mapG = this.mapGroup;
        for (var i = 0, l = cfg.length; i < l; i++) {
            ls[i].source = cfg[i].src;
            ls[i].x = cfg[i].x;
            ls[i].y = cfg[i].y;
            mapG.addChild(ls[i]);
        }
    };
    /**同步视角 */
    MapContainer.prototype.syncchromePos = function () {
        var role = this.mainRole;
        if (!role)
            return false;
        var viewW = globalData.stageWidth;
        var viewH = globalData.stageHeight;
        var tarX = role.x - viewW / 2 << 0;
        var tarY = role.y - viewH / 2 << 0;
        if (tarX < 0)
            tarX = 0;
        if (tarY < 0)
            tarY = 0;
        if (viewW - tarX < viewW << 1)
            tarX = viewW << 1;
        if (viewH - tarY < viewH << 1)
            tarY = viewH << 1;
        this.roleGroup.x = this.mapGroup.x = -tarX;
        this.roleGroup.y = this.mapGroup.y = -tarY;
        return false;
    };
    MapContainer.prototype.start = function () {
        egret.startTick(this.syncchromePos, this);
    };
    MapContainer.prototype.stop = function () {
        egret.stopTick(this.syncchromePos, this);
    };
    /**清理列表 */
    MapContainer.prototype.clearRole = function () {
        var rs = this.roleLs;
        while (rs.length) {
            this.removeRole(rs.pop());
        }
    };
    /**从地图上移除人物 */
    MapContainer.prototype.removeRole = function (role) {
        if (role.parent)
            role.parent.removeChild(role);
        var ls = this.roleLs;
        var idx = ls.indexOf(role);
        idx >= 0 && ls.splice(idx, 1);
        CompomentMgr.push(role);
    };
    return MapContainer;
}(egret.DisplayObjectContainer));
__reflect(MapContainer.prototype, "MapContainer");
//# sourceMappingURL=MapContainer.js.map