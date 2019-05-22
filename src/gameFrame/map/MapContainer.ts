class MapContainer extends egret.DisplayObjectContainer {
	private $mapWid: number = 1200;
	private $mapHeig: number = 1200;
	private mapGroup: eui.Group;
	private roleGroup: eui.Group;
	private $mapLs: Array<ImgNode> = [];

	/**人物列表 */
	private roleLs: Array<Actor> = [];
	/**锁定人物,视图跟随 */
	private mainRole: Actor;

	public getRoleLayer(): eui.Group {
		return this.roleGroup;
	}
	public constructor() {
		super();
		this.mapGroup = new eui.Group();
		this.roleGroup = new eui.Group();
		this.addChild(this.mapGroup);
		this.addChild(this.roleGroup);
		this.init();
	}
	private init(): void {
		let mapCfg:mapNodeCfg[] = [];
		this.changeMap(mapCfg);
		this.start();
	}

	/**数据纹理 */
	private changeMap(cfg: mapNodeCfg[]): void {
		let ls = this.$mapLs;
		while (cfg.length > ls.length) {
			ls.push(CompomentMgr.pop<ImgNode>(ImgNode));
		}
		while (cfg.length < ls.length) {
			ls.pop().release();
		}
		let mapG = this.mapGroup;
		for (let i: number = 0, l = cfg.length; i < l; i++) {
			ls[i].source = cfg[i].src;
			ls[i].x = cfg[i].x;
			ls[i].y = cfg[i].y;
			ls[i].nodeData = cfg[i];
			mapG.addChild(ls[i]);
		}
	}

	/**同步视角 */
	private syncchromePos(): boolean {
		let role = this.mainRole;
		if (!role) return false;
		let viewW = globalData.stageWidth;
		let viewH = globalData.stageHeight;
		let tarX = role.x - viewW / 2 << 0;
		let tarY = role.y - viewH / 2 << 0;
		if (tarX < 0) tarX = 0;
		if (tarY < 0) tarY = 0;
		if (viewW - tarX < viewW << 1) tarX = viewW << 1;
		if (viewH - tarY < viewH << 1) tarY = viewH << 1;
		this.roleGroup.x = this.mapGroup.x = -tarX;
		this.roleGroup.y = this.mapGroup.y = -tarY;
		return false;
	}

	private start(): void {
		egret.startTick(this.syncchromePos, this);
	}

	private stop(): void {
		egret.stopTick(this.syncchromePos, this);
	}

	/**清理列表 */
	private clearRole(): void {
		let rs = this.roleLs;
		while (rs.length) {
			this.removeRole(rs.pop());
		}
	}

	/**从地图上移除人物 */
	public removeRole(role: Actor): void {
		if (role.parent) role.parent.removeChild(role);
		let ls = this.roleLs;
		let idx = ls.indexOf(role);
		idx >= 0 && ls.splice(idx, 1);
		CompomentMgr.push(role);
	}


}