/**dataModel */
class Model {
	public constructor() {
	}
	private static  _ins:Model;
	public static get ins():Model{
		if(!Model._ins) Model._ins = new Model();
		return Model._ins;
	}

	/**初始化管理器 */
	public initMgr(): Model {
		dataFactory = new mgr.DataObjectMgr();
		ComposeMgr = new mgr.CompomentMgr();
		ClipMgr = new mgr.ClipfactoryMgr();
		return this;
	}

	/**初始化数据模型 */
	public initDataProxy():Model{
		DataModel.TestData = new Proxy();
		return this;
	}
}

let dataFactory: mgr.DataObjectMgr
let ComposeMgr: mgr.CompomentMgr
let ClipMgr:mgr.ClipfactoryMgr;