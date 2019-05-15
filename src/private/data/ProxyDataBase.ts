/**数据代理类，主要是除了数组以外的数据类型 */
class ProxyDataBase {
	/**源数据 */
	protected data: any;
	protected info: any;
	/**数据类型 */
	protected dataType: DataType;
	/**监听器 */
	protected listener: { [type: string]: Function[] } = {}
	/**调用者 */
	protected caller: { [type: string]: any[] } = {}
	/**放在js事件队列 */
	private timer: number;
	public constructor(info: any) {
		this.info = info;
	}

	/**获取数据类型 */
	public get type(): DataType {
		return this.dataType;
	}

	/**变更数据源 */
	public changeValueWithoutEmit(value: any, key?: string | number): void {
		let t: DataType;
		if (key) {
			if (!this.data) this.data = {};
			this.data[key] = value;
			t = DataType.OBJECT;
		} else {
			this.data = value;
			if (value instanceof Array) {
				t = DataType.ARRAY
			} else {
				t = value instanceof Object ? DataType.OBJECT : DataType.BASIC;
			}
		}
		this.dataType = t;
	}

	public setData(value: any, key?: string | number): void {
		this.changeValueWithoutEmit(value,key);
		this.emit();
	}

	/**添加监听 */
	public on(type: string, fn: Function, caller: any): boolean {
		if (this.has(type, fn, caller)) return false;
		let listener = this.listener;
		let callers = this.caller;
		if (!listener[type]) {
			listener[type] = [fn];
			callers[type] = [caller];
		} else {
			listener[type].push(fn);
			callers[type].push(caller);
		}
		return true;
	}

	/**移除监听 */
	public off(type: string, fn: Function, caller: any): void {
		if (!type || !fn || !caller) this.clear();
		if (!this.has(type, fn, caller)) return;
		this.delectTarget(fn, this.listener[type]);
		this.delectTarget(caller, this.caller[type]);
	}

	/**是否存在监听器 */
	public has(type: string, fn: Function, caller: any): boolean {
		let listener = this.listener;
		let callers = this.caller;
		if (!listener[type] || !callers[type]) return false;
		for (let i: number = 0, l = listener[type].length; i < l; i++) {
			if (listener[type][i] == fn) return true;
		}
		return false;
	}

	/**清空该代理对象 */
	public clear(): void {
		this.data = null;
		this.caller = {};
		this.listener = {};
		this.info = null;
	}

	/**执行监听事件 */
	public emit(): void {
		if (this.timer) return;
		this.timer = egret.setTimeout(() => {
			this.callFn();
			this.timer = 0;
		}, this, 0)
	}


	/**立即执行监听函数 */
	public reflesh(): void {
		egret.clearTimeout(this.timer);
		this.timer = 0;
		this.callFn();
	}


	/**获取数据源 */
	public value(): any {
		return this.data;
	}

	/**重写valueOf方法以支持运算 */
	public valueOf() {
		if (!this.data) return null;
		return this.data.valueOf()
	}
	/**重写toString方法以支持运算 */
	public toString() {
		if (!this.data) return null;
		return this.data.toString();
	}


	/**判断是否是某种数据类型 */
	public is(DataType: DataType): boolean {
		return this.dataType == DataType;
	}

	/**移除目标（用于移除监听器以及调用者） */
	private delectTarget(ele: any, ls: any[]): void {
		if (!ls || !ele) return;
		for (let i: number = 0, l = ls.length; i < l; i++) {
			if (ele == ls[i]) {
				ls.splice(i, 1)
			}
		}
	}

	/**执行监听函数 */
	private callFn(): void {
		let fn = this.listener;
		let caller = this.caller;
		let args = this.data;
		for (let k in fn) {
			if (!fn[k]) continue;
			for (let i: number = 0, l = fn[k].length; i < l; i++) {
				fn[k][i].call(caller[k][i], args);
			}
		}
	}

}

/**代理对象的数据类型 */
enum DataType {
	/**基本数据类型 */
	BASIC,
	/**对象 */
	OBJECT,
	/**数组 */
	ARRAY,
}