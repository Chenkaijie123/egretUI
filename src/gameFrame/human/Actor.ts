class Actor extends win.BaseCompoment implements IBehavior {
	body: BaseClip;
	wearpon: BaseClip;
	wing: BaseClip
	/**所要到达的目的点 */
	public to: INode;
	/**方向 */
	public direction: direction;
	/**动作 */
	public behavior: behaviorType;
	/**速度 */
	public speed: number;
	/**动作队列 */
	private beHaviorQueue:Array<Behavior> = [];
	public constructor() {
		super();

	}
	public init(): void {
		let c = CompomentMgr.pop<BaseClip>(BaseClip);
		this.body = c;
		this.addChild(c);
		c = CompomentMgr.pop<BaseClip>(BaseClip);
		this.wearpon = c;
		this.addChild(c);
		c = CompomentMgr.pop<BaseClip>(BaseClip);
		this.wing = c;
		this.addChild(c);

	}
	protected clear(): void {
		this.body.stop();
		this.wearpon.stop();
		this.wing.stop();
		this.beHaviorQueue.length = 0
	}
	protected destory(): void { }

	public setAppearence(): void {

	}
}