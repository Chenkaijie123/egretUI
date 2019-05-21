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
var BaseClip = (function (_super) {
    __extends(BaseClip, _super);
    // private NULLFN(e: egret.Event): void { };
    function BaseClip() {
        var _this = _super.call(this) || this;
        _this.$playTime = -1;
        var c = new egret.MovieClip();
        _this.addChild(c);
        _this.$clip = c;
        return _this;
    }
    Object.defineProperty(BaseClip.prototype, "frameRate", {
        get: function () {
            return this.$clip.frameRate;
        },
        set: function (v) {
            this.$clip.frameRate = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseClip.prototype, "playTime", {
        get: function () {
            return this.$playTime;
        },
        set: function (v) {
            this.$playTime = v;
        },
        enumerable: true,
        configurable: true
    });
    /**设置图像数据,并且播放动画 */
    BaseClip.prototype.source = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var src, cData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        src = file.json.concat(file.texture);
                        this.$src = src;
                        if (file.playTime != void 0)
                            this.$playTime = file.playTime;
                        return [4 /*yield*/, ClipMgr.getClipData(file.json, file.texture)];
                    case 1:
                        cData = _a.sent();
                        if (src == this.$src) {
                            this.$clip.movieClipData = cData;
                        }
                        this.play();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseClip.prototype.play = function (time) {
        if (time != void 0)
            this.$playTime = time;
        this.$clip.play(this.$playTime);
    };
    BaseClip.prototype.stop = function () {
        this.$clip.stop();
    };
    BaseClip.prototype.gotoAndPlay = function (frame, playTimes) {
        if (playTimes != void 0)
            this.$playTime = playTimes;
        this.$clip.gotoAndPlay(frame, playTimes);
    };
    /**跳到后一帧并停止 */
    BaseClip.prototype.nextFrame = function () {
        this.$clip.nextFrame();
    };
    /**跳到前一帧并停止 */
    BaseClip.prototype.prevFrame = function () {
        this.$clip.prevFrame();
    };
    BaseClip.prototype.gotoAndStop = function (frame) {
        this.$clip.gotoAndStop(frame);
    };
    Object.defineProperty(BaseClip.prototype, "complete", {
        /**完成执行事件 */
        set: function (cb) {
            this.$playEnd = cb;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseClip.prototype, "LoopHandle", {
        /**循环执行事件 */
        set: function (cb) {
            this.$loopHandle = cb;
        },
        enumerable: true,
        configurable: true
    });
    BaseClip.prototype.init = function () {
        this.$playEnd = this.$loopHandle = null;
        this.$clip.addEventListener(egret.Event.COMPLETE, this.$playComplete, this);
        this.$clip.addEventListener(egret.Event.LOOP_COMPLETE, this.$loop, this);
    };
    BaseClip.prototype.clear = function () {
        this.$clip.removeEventListener(egret.Event.COMPLETE, this.$playComplete, this);
        this.$clip.removeEventListener(egret.Event.LOOP_COMPLETE, this.$loop, this);
        this.$playEnd = this.$loopHandle = null;
    };
    BaseClip.prototype.destory = function () {
        this.$clip = null;
        this.$src = null;
    };
    BaseClip.prototype.$playComplete = function () {
        this.gotoAndStop(-1);
        if (this.$playEnd && this.$playEnd()) {
            this.$playEnd = null;
        }
    };
    BaseClip.prototype.$loop = function () {
        if (this.$loopHandle && this.$loopHandle()) {
            this.$loopHandle = null;
        }
    };
    return BaseClip;
}(win.BaseCompoment));
__reflect(BaseClip.prototype, "BaseClip", ["IClip"]);
//# sourceMappingURL=BaseClip.js.map