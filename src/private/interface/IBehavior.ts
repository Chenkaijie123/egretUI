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

	setAppearence():void;

}

enum direction{
	up,down,left,right,up_right,down_right,down_left,up_left
}

enum behaviorType{
	attack,
	run,
}