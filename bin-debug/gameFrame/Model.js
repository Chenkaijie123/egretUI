var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**dataModel */
var Model = (function () {
    function Model() {
    }
    Object.defineProperty(Model, "ins", {
        get: function () {
            if (!Model._ins)
                Model._ins = new Model();
            return Model._ins;
        },
        enumerable: true,
        configurable: true
    });
    /**初始化管理器 */
    Model.prototype.initMgr = function () {
        dataFactory = new mgr.DataObjectMgr();
        ComposeMgr = new mgr.CompomentMgr();
        ClipMgr = new mgr.ClipfactoryMgr();
        return this;
    };
    /**初始化数据模型 */
    Model.prototype.initDataProxy = function () {
        DataModel.TestData = new Proxy();
        return this;
    };
    return Model;
}());
__reflect(Model.prototype, "Model");
var dataFactory;
var ComposeMgr;
var ClipMgr;
//# sourceMappingURL=Model.js.map