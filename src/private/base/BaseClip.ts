class BaseClip extends win.BaseCompoment implements IClip {
	/**目标资源 */
	private $src: string
	private $clip: egret.MovieClip;
	private $playEnd:Function;
	private $loopHandle:Function;
	private NULLFN(e:egret.Event):void{};
	public constructor() {
		super();
		let c = new egret.MovieClip();
		this.addChild(c);
		this.$clip = c;
	}

	public set complete(cb: (e:egret.Event) => any) {
		this.$playEnd = cb;
	}

	public set LoopHandle(cb:(e:egret.Event)=>void){
		this.$loopHandle = cb;
	}


	public init(): void {
		this.$playEnd = this.$loopHandle = this.NULLFN;		
		this.$clip.addEventListener(egret.Event.COMPLETE,this.$playEnd,this);
		this.$clip.addEventListener(egret.Event.LOOP_COMPLETE,this.$loopHandle,this);

	}

	protected clear(): void { 
		this.$playEnd = this.$loopHandle = this.NULLFN;
		this.$clip.removeEventListener(egret.Event.COMPLETE,this.$playEnd,this);
		this.$clip.removeEventListener(egret.Event.LOOP_COMPLETE,this.$loopHandle,this);
		
	}
	protected destory(): void { }


}