var direction;
(function (direction) {
    direction[direction["up"] = 0] = "up";
    direction[direction["up_right"] = 1] = "up_right";
    direction[direction["right"] = 2] = "right";
    direction[direction["down_right"] = 3] = "down_right";
    direction[direction["down"] = 4] = "down";
    direction[direction["down_left"] = 5] = "down_left";
    direction[direction["left"] = 6] = "left";
    direction[direction["up_left"] = 7] = "up_left";
    direction[direction["keep"] = 8] = "keep";
})(direction || (direction = {}));
var behaviorType;
(function (behaviorType) {
    /**攻击 */
    behaviorType[behaviorType["attack"] = 0] = "attack";
    /**站立 */
    behaviorType[behaviorType["stand"] = 1] = "stand";
    /**奔跑 */
    behaviorType[behaviorType["run"] = 2] = "run";
    /**被击杀 */
    behaviorType[behaviorType["die"] = 3] = "die";
    /**被攻击 */
    behaviorType[behaviorType["beHit"] = 4] = "beHit";
})(behaviorType || (behaviorType = {}));
//# sourceMappingURL=IBehavior.js.map