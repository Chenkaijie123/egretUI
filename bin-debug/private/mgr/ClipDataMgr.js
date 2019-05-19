var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var mgr;
(function (mgr) {
    var ClipfactoryMgr = (function () {
        function ClipfactoryMgr() {
            this.map = {};
            this.isLoading = {};
            this.dataEvent = new egret.EventDispatcher();
        }
        /**
         * 设置序列帧动画数据
         * @param json 图集描述文件
         * @param texture 图集文件
         * @param name 动画名
         * @param clip 需要添加动画数据的序列帧对象
         * @param playTime 播放次数
         */
        ClipfactoryMgr.prototype.setClipData = function (json, texture, clip, playTime, name) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getClipData(json, texture, clip, name)];
                        case 1:
                            _a.sent();
                            clip.play(playTime || 1);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 获取序列帧动画数据
         * @param json 图集描述文件
         * @param texture 图集文件
         * @param name 动画名
         * @param clip 需要添加动画数据的序列帧对象
         */
        ClipfactoryMgr.prototype.getClipData = function (json, texture, clip, name) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var clipData, key_1, map, _a, j, t, clipFactory, e_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 5, , 6]);
                            key_1 = json.concat(texture);
                            map = this.map;
                            if (!!map[key_1]) return [3 /*break*/, 4];
                            if (!this.check(key_1)) return [3 /*break*/, 2];
                            return [4 /*yield*/, new Promise(function (resolve, reject) {
                                    var fn = function (e) {
                                        _this.dataEvent.removeEventListener(key_1, fn, _this);
                                        resolve();
                                    };
                                    _this.dataEvent.addEventListener(key_1, fn, _this);
                                })];
                        case 1:
                            _b.sent();
                            return [3 /*break*/, 4];
                        case 2:
                            //标志正在加载
                            this.isLoading[key_1] = 1;
                            return [4 /*yield*/, Promise.all([
                                    RES.getResAsync(json),
                                    RES.getResAsync(texture)
                                ])];
                        case 3:
                            _a = _b.sent(), j = _a[0], t = _a[1];
                            clipFactory = new egret.MovieClipDataFactory(j, t);
                            map[key_1] = clipFactory;
                            _b.label = 4;
                        case 4:
                            clipData = map[key_1].generateMovieClipData(name || "");
                            clip && (clip.movieClipData = clipData);
                            this.loadEnd(key_1);
                            return [3 /*break*/, 6];
                        case 5:
                            e_1 = _b.sent();
                            console.log(e_1);
                            clipData = new egret.MovieClipData();
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/, Promise.resolve(clipData)];
                    }
                });
            });
        };
        /**销毁 */
        ClipfactoryMgr.prototype.destory = function (json, texture) {
            var key = json.concat(texture);
            var fac = this.map[key];
            if (!fac)
                return;
            fac.clearCache();
            delete this.map[key];
        };
        /**判断该动画工厂类是否已经在创建 */
        ClipfactoryMgr.prototype.check = function (key) {
            if (this.isLoading[key])
                return true;
            return false;
        };
        /**
         * 工厂实例创建完毕
         * 给所有要该动画数据的对象赋值
         */
        ClipfactoryMgr.prototype.loadEnd = function (key) {
            if (!this.isLoading[key])
                return;
            delete this.isLoading[key];
            this.dataEvent.dispatchEventWith(key, true, key);
        };
        return ClipfactoryMgr;
    }());
    mgr.ClipfactoryMgr = ClipfactoryMgr;
    __reflect(ClipfactoryMgr.prototype, "mgr.ClipfactoryMgr", ["IMgr"]);
})(mgr || (mgr = {}));
//# sourceMappingURL=ClipDataMgr.js.map