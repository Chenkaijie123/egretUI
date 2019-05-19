class Behavior implements IBehavior {
	/**所要到达的目的点 */
	to: INode;
	/**方向 */
	direction: direction;
	/**动作 */
	behavior: behaviorType;
	/**速度 */
	speed: number;

	setAppearence(): void{

	}
	public constructor() {
	}

	public static create(node:INode,direction:direction,behavior:behaviorType,speed:number):Behavior{
		let o = dataFactory.pop<Behavior>();
		o.to = node;
		o.direction = direction;
		o.behavior = behavior;
		o.speed = speed;
		return o;
	}


}