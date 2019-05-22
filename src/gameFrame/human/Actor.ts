class Actor extends win.BaseCompoment {
	body: BaseClip;
	wearpon: BaseClip;
	wing: BaseClip;
	/**当前执行的动作 */
	private currentBehavior: Behavior;
	/**是否正在播放动作 */
	private isPlayBehavior: boolean = false;
	private beHaviorQueue: Array<Behavior> = [];
	private roleData: ActorData;

	public constructor() {
		super();
		let c: BaseClip
		c = CompomentMgr.pop<BaseClip>(BaseClip);
		this.body = c;
		this.addChild(c);
		c = CompomentMgr.pop<BaseClip>(BaseClip);
		this.wearpon = c;
		this.addChild(c);
		c = CompomentMgr.pop<BaseClip>(BaseClip);
		this.wing = c;
		this.addChild(c);
	}

	public init(): void {

	}

	protected clear(): void {
		this.body.stop();
		this.wearpon.stop();
		this.wing.stop();
		this.clearQueue();
	}
	protected destory(): void { }

	private clearQueue(): void {
		let queue = this.beHaviorQueue;
		while (queue.length) {
			queue.pop().release();
		}
	}

	/**
	 * 设置外观
	 * 传参数会清空动作列表直接播放新动作
	 */
	private setAppearence(ignore: boolean = true, args?: Behavior): void {
		if (ignore && !args && this.isPlayBehavior) return;
		this.isPlayBehavior = true;
		let queue = this.beHaviorQueue;
		egret.Tween.removeTweens(this);
		if (args) {
			while (queue.length) queue.pop().release();
		}
		let behavior = args || queue.shift();
		if (!behavior) {
			this.AI();
			return;
		}
		this.currentBehavior = behavior;
		let bodyUrl = behavior.getBodyUrl();
		let wearponUrl = behavior.getWearponUrl();
		let wingUrl = behavior.getWingUrl();
		let pTime: number = 1;
		let completeFn: (e: egret.Event) => boolean = null;
		let _x: number, _y: number, _wid: number, _heig: number, _t: number
		//移动
		switch (behavior.behavior) {
			case behaviorType.run:
				pTime = -1;
				_x = behavior.to.centerX;
				_y = behavior.to.centerY;
				_wid = this.x - _x;
				_heig = this.y - _y;
				_t = Math.sqrt(_wid * _wid + _heig * _heig) / behavior.speed * 1000;
				egret.Tween.get(this).to({ x: _x, y: _y }, _t).call(() => {
					this.setAppearence(false);
					this.isPlayBehavior = false;
				});
				break;
			case behaviorType.attack:
				completeFn = () => {
					this.isPlayBehavior = false;
					this.setAppearence();
					return false;
				};
				break;
			case behaviorType.stand:
				completeFn = () => {
					this.isPlayBehavior = false;
					this.AI();
					return false;
				};
				break;
			case behaviorType.die:
				// 播放击杀动作后回收
				completeFn = () => {
					this.isPlayBehavior = false;
					Model.ins.mapContainer.removeRole(this);
					return false;
				};
				break;
			case behaviorType.beHit:
				this.clearQueue();
				_x = behavior.to.centerX;
				_y = behavior.to.centerY;
				_wid = this.x - _x;
				_heig = this.y - _y;
				_t = Math.sqrt(_wid * _wid + _heig * _heig) / behavior.speed * 1000;
				egret.Tween.get(this).to({ x: _x, y: _y }, _t).call(() => {
					this.AI();
					this.isPlayBehavior = false;
				});
				completeFn = () => {
					this.isPlayBehavior = false;
					this.AI();
					return false;
				};
				break;
		}
		this.body.complete = completeFn;
		if (behavior.direction > direction.down) this.scaleX = -1;
		else this.scaleX = 1;
		//设置资源
		bodyUrl && this.body.source({ json: `${bodyUrl}_json`, texture: `${bodyUrl}_png`, playTime: pTime });
		// wearponUrl && this.wearpon.source({ json: `${wearponUrl}_json`, texture: `${wearponUrl}_png`, playTime: pTime });
		// wingUrl && this.wing.source({ json: `${wingUrl}_json`, texture: `${wingUrl}_png`, playTime: pTime });
	}

	/**中断动作列表立即执行该动作 */
	public play(type: behaviorType, x: number = this.x, y: number = this.y, moveSpeed: number = globalData.actorSpeed): void {
		let node = dataFactory.pop<MapNode>();
		let p = this.parent.globalToLocal(x, y);
		node.nodeWid = globalData.mapWid;
		node.nodeHeig = globalData.mapHeig;
		node.centerX = p.x;
		node.centerY = p.y;
		let dir = globalData.getDir(this.x, this.y, p.x, p.y);
		if (dir == direction.keep) dir = this.currentBehavior.direction;
		let b = Behavior.create(node, dir, type, moveSpeed);
		this.setAppearence(false, b);
	}

	/**添加动作到播放列表 */
	public addBehavior(...b: Behavior[]): void {
		this.beHaviorQueue.push(...b);
		this.setAppearence();
	}

	private AI(): void {
		//todo
		this.play(behaviorType.stand);
	}
}

type ActorData = {

}