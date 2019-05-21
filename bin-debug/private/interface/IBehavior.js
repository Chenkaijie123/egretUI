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
    behaviorType[behaviorType["attack"] = 0] = "attack";
    behaviorType[behaviorType["stand"] = 1] = "stand";
    behaviorType[behaviorType["run"] = 2] = "run";
    behaviorType[behaviorType["die"] = 3] = "die";
})(behaviorType || (behaviorType = {}));
//# sourceMappingURL=IBehavior.js.map