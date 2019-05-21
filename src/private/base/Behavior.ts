class Behavior implements IBehavior {
	/**所要到达的目的点 */
	to: INode;
	/**方向 */
	direction: direction;
	/**动作 */
	behavior: behaviorType;
	/**速度 */
	speed: number;
	/**扩展数据 */
	excData: number
	static pool: Array<Behavior> = [];
	// setAppearence(): void{

	// }

	public getBodyUrl(): string {
		let src: string;
		src = `${this.excData || 0}${srcType.body}${this.behavior}${this.direction > direction.down?this.direction - 4:this.direction}`;
		while (src.length < 5) src = `0${src}`;
		return src;
	}

	public getWearponUrl(): string {
		let src: string;
		src = `${this.excData || 0}${srcType.wearpom}${this.behavior}${this.direction}`;
		while (src.length < 5) src = `0${src}`;
		return src;
	}

	public getWingUrl(): string {
		let src: string;
		src = `${this.excData || 0}${srcType.wing}${this.behavior}${this.direction}`;
		while (src.length < 5) src = `0${src}`;
		return src;
	}

	public release():void{
		this.to = this.direction = this.behavior = this.speed = this.excData = null;
		Behavior.pool.push(this);
	}

	public static create(node: INode, direction: direction, behavior: behaviorType, speed: number = globalData.actorSpeed,excData:number = 0): Behavior {
		let o = Behavior.pool.pop() || new Behavior();
		o.to = node;
		o.direction = direction;
		o.behavior = behavior;
		o.speed = speed;
		o.excData = excData;
		return o;
	}

	// public static getBehavior():Behavior{
	// 	return Behavior.pool.pop() || new Behavior();
	// }

	// public setSpeed(speed:number = globalData.actorSpeed,excData:number = 0):Behavior{
	// 	this.speed = speed;
	// 	return this;
	// }

	// public setNode(node:INode):Behavior{
	// 	this.to = node;
	// 	return this;
	// }

	// public setDirection(dir:direction):Behavior{
	// 	this.direction = dir;
	// 	return this;
	// }

	// public setBehavior(b:behaviorType):Behavior{
	// 	this.behavior = b;
	// 	return this;
	// }

	// public setExcData(d:number):Behavior{
	// 	this.excData = d;
	// 	return this;
	// }


}

enum srcType {
	none,
	body,
	wearpom,
	wing,
}