class BaseClip extends win.BaseCompoment implements IClip {
	/**目标资源 */
	private $src: string
	private $playTime: number = -1;
	private $clip: egret.MovieClip;
	private $playEnd: Function;
	private $loopHandle: Function;
	// private NULLFN(e: egret.Event): void { };
	public constructor() {
		super();
		let c = new egret.MovieClip();
		this.addChild(c);
		this.$clip = c;
	}

	public set frameRate(v: number) {
		this.$clip.frameRate = v;
	}

	public get frameRate() {
		return this.$clip.frameRate;
	}

	public set playTime(v: number) {
		this.$playTime = v;
	}

	public get playTime() {
		return this.$playTime;
	}

	/**设置图像数据,并且播放动画 */
	public async source(file: { json: string, texture: string, playTime?: number }) {
		let src = file.json.concat(file.texture);
		this.$src = src;
		if (file.playTime != void 0) this.$playTime = file.playTime;
		let cData = await ClipMgr.getClipData(file.json, file.texture);
		if (src == this.$src) {
			this.$clip.movieClipData = cData;
		}
		this.play();
	}

	public play(time?: number): void {
		if (time != void 0) this.$playTime = time;
		this.$clip.play(this.$playTime);
	}

	public stop(): void {
		this.$clip.stop();
	}

	public gotoAndPlay(frame: string | number, playTimes?: number): void {
		if (playTimes != void 0) this.$playTime = playTimes;
		this.$clip.gotoAndPlay(frame, playTimes);
	}

	/**跳到后一帧并停止 */
	public nextFrame(): void {
		this.$clip.nextFrame();
	}
	/**跳到前一帧并停止 */
	public prevFrame(): void {
		this.$clip.prevFrame();
	}

	public gotoAndStop(frame: string | number): void {
		this.$clip.gotoAndStop(frame);
	}

	/**完成执行事件 */
	public set complete(cb: (e: egret.Event) => boolean) {
		this.$playEnd = cb;
	}

	/**循环执行事件 */
	public set LoopHandle(cb: (e: egret.Event) => boolean) {
		this.$loopHandle = cb;
	}


	public init(): void {
		this.$playEnd = this.$loopHandle = null;
		this.$clip.addEventListener(egret.Event.COMPLETE, this.$playComplete, this);
		this.$clip.addEventListener(egret.Event.LOOP_COMPLETE, this.$loop, this);

	}

	protected clear(): void {
		this.$clip.removeEventListener(egret.Event.COMPLETE, this.$playComplete, this);
		this.$clip.removeEventListener(egret.Event.LOOP_COMPLETE, this.$loop, this);
		this.$playEnd = this.$loopHandle = null;

	}
	protected destory(): void {
		this.$clip = null;
		this.$src = null;
	}

	private $playComplete(): void {
		this.gotoAndStop(-1);
		if (this.$playEnd && this.$playEnd()) {
			this.$playEnd = null;
		}
	}

	private $loop(): void {
		if (this.$loopHandle && this.$loopHandle()) {
			this.$loopHandle = null;
		}
	}


}