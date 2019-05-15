class Model {
	public constructor() {
	}

	public initMgr(): Model {
		dataFactory = new mgr.DataObjectMgr();
		ComposeMgr = new mgr.CompomentMgr();
		return this;
	}

	public initDataProxy():Model{
		return this;
	}
}

let dataFactory: mgr.DataObjectMgr
let ComposeMgr: mgr.CompomentMgr