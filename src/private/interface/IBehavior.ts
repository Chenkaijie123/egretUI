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
	/**攻击 */
	attack,
	/**站立 */
	stand,
	/**奔跑 */
	run,
	/**被击杀 */
	die,
	/**被攻击 */
	beHit,
}