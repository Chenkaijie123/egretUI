var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MapNode = (function () {
    function MapNode() {
    }
    MapNode.prototype.release = function () {
        dataFactory.push(this);
    };
    return MapNode;
}());
__reflect(MapNode.prototype, "MapNode", ["INode"]);
//# sourceMappingURL=MapNode.js.map