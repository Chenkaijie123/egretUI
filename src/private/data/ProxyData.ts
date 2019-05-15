/**主要是处理数据代理的数组类型 */
class ProxyData<T> extends ProxyDataBase {
	// protected data:T[] = [];

	/**获取源数据长度，如果不是数组或者未初始化返回0 */
	public get length(): number {
		let l :number = 0;
		if(this.is(DataType.ARRAY) && this.data) l = this.data.length;
		return l;
	}

	public constructor(info: any) {
		super(info);
	}

	public static set(proxyArray: ProxyData<any>, index: number, ...i: any[]): void {
		proxyArray.splice(index, 0, ...i);
		proxyArray.emit();
	}

	public concat(...i:any[][]):T[]{
		this.$array();
		let r =  this.data.concat(...i)
		this.emit();
		return r;
	}

	public map(cb:(value: T, index: number, array: T[])=>T,obj?:any):any[]{
		this.$array();
		let r = (<Array<any>>this.data).map(cb,obj);
		// this.emit();
		return r;
	}

	public pop(): T {
		this.$array();
		let r = this.data.pop();
		this.emit();
		return r;
	}

	public push(...v: T[]): void {
		this.$array();
		this.data.push(...v);
		this.emit();
	}

	public shift(): T {
		this.$array();
		let r = this.data.shift()
		this.emit();
		return r;
	}

	public unshift(...v: T[]): void {
		this.$array();
		this.data.unshift(...v);
		this.emit();
	}


	public splice(index: number, length: number = 0, ...i: T[]): T[] {
		this.$array();
		let r = this.data.splice(index, length, ...i);
		this.emit();
		return r;
	}

	/**设置数组信息 */
	private $array(): void {
		if (!this.data) this.data = [];
		this.dataType = DataType.ARRAY;
	}


	/**
	 * @private
	 */
	public $clear(): void {
		if (this.dataType == DataType.ARRAY)
			this.data.length = 0;
	}
}