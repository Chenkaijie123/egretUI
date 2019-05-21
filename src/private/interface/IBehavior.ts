/**行为接口 */
interface IBehavior{
	/**所要到达的目的点 */
	to:INode;
	/**方向 */
	direction:direction;
	/**动作 */
	behavior:behaviorType;
	/**速度 */
	speed:number;

	setAppearence?(behavior?:Behavior):void;

}

enum direction{
	up,
	up_right,
	right,
	down_right,
	down,
	down_left,
	left,
	up_left,
	keep
}

enum behaviorType{
	attack,
	stand,
	run,
	die,
}