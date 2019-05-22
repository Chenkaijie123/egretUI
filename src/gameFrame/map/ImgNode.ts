class ImgNode extends eui.Image implements ICompoment {
	public nodeData: mapNodeCfg;
	public activeTime: number;
	public constructor() {
		super();
	}

	public $clear(): void {
		this.nodeData = null;
		this.source = null;
	}
	public $destory(): void {
		this.$clear();
	}
	public release(): void {
		if(this.parent) this.parent.removeChild(this);
		CompomentMgr.push(this);
	}
}

type mapNodeCfg = {
	width:number
	height:number
	x:number
	y:number
	src:string
}