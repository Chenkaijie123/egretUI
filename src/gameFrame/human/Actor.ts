class Actor extends win.BaseCompoment {
	body: BaseClip;
	wearpon: BaseClip;
	wing: BaseClip;
	/**当前执行的动作 */
	private currentBehavior: Behavior;
	/**是否正在播放动作 */
	private isPlayBehavior: boolean = false;
	private beHaviorQueue: Array<Behavior> = [];

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
		this.beHaviorQueue.length = 0;
	}
	protected destory(): void { }

	/**
	 * 设置外观
	 * 传参数会清空动作列表直接播放新动作
	 */
	private setAppearence(args?: Behavior): void {
		if (args && this.isPlayBehavior) return;
		this.isPlayBehavior = true;
		let queue = this.beHaviorQueue;
		egret.Tween.removeTweens(this);
		if (args) {
			while (queue.length) queue.pop().release();
		}
		let behavior = args || queue.shift();
		if (!behavior) {//没有动作任务播放站立动作

			return;
		}
		this.currentBehavior = behavior;
		let bodyUrl = behavior.getBodyUrl();
		let wearponUrl = behavior.getWearponUrl();
		let wingUrl = behavior.getWingUrl();
		let pTime: number = -1;
		//移动
		switch (behavior.behavior) {
			case behaviorType.run:
				let _x = behavior.to.centerX;
				let _y = behavior.to.centerY;
				let _wid = this.x - _x;
				let _heig = this.y - _y;
				let _t = Math.sqrt(_wid * _wid + _heig * _heig) / behavior.speed * 1000;
				egret.Tween.get(this).to({ x: _x, y: _y }, _t).call(() => {
					this.setAppearence();
					this.isPlayBehavior = false;
				});
				break;
			case behaviorType.attack:
				pTime = 1;
				this.body.complete = () => {
					this.isPlayBehavior = false;
					this.setAppearence();
					return true;
				};
				break;
			case behaviorType.stand:
				pTime = -1;
				this.isPlayBehavior = false;
				break;
		}
		bodyUrl && this.body.source({ json: `${bodyUrl}_json`, texture: `${bodyUrl}_png`, playTime: pTime });
		wearponUrl && this.wearpon.source({ json: `${wearponUrl}_json`, texture: `${wearponUrl}_png`, playTime: pTime });
		wingUrl && this.wing.source({ json: `${wingUrl}_json`, texture: `${wingUrl}_png`, playTime: pTime });
	}

	/**中断动作列表立即执行该动作 */
	public play(type: behaviorType, x: number = this.x, y: number = this.y, moveSpeed: number = globalData.actorSpeed): void {
		let node = dataFactory.pop<MapNode>();
		node.nodeWid = globalData.mapWid;
		node.nodeHeig = globalData.mapHeig;
		node.centerX = x;
		node.centerY = y;
		let dir = globalData.getDir(this.x, this.y, x, y);
		if (dir == direction.keep) dir = this.currentBehavior.direction;
		let b = Behavior.create(node, dir, type, moveSpeed);
		this.setAppearence(b);
	}

	/**添加动作到播放列表 */
	public addBehavior(b: Behavior): void {
		this.beHaviorQueue.push(b);
		this.setAppearence();
	}
}