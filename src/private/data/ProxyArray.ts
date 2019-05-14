class ProxyArray<T> extends ProxyData{
	protected data:T[] = [];
	public get length():number{
		return this.data.length;
	}

	public constructor(info:any) {
		super(info);
	}

	public static set(proxyArray:ProxyArray<any>,index:number,...i:any[]):void{
		proxyArray.splice(index,0,...i);
		proxyArray.emit();
	}

	public pop():T{
		let r = this.data.pop();
		this.emit();
		return r;
	}

	public push(...v:T[]):void{
		this.data.push(...v);
		this.emit();
	}

	public shift():T{
		let r =  this.data.shift()
		this.emit();
		return r;
	}

	public unshift(...v:T[]):void{
		this.data.unshift(...v);
		this.emit();
	}


	public splice(index:number,length:number,...i:T[]):T[]{
		let r = this.data.splice(index,length,...i);
		this.emit();
		return r;
	}

	public value():T[]{
		return this.data;
	}

	/**
	 * @private
	 */
	public $clear():void{
		this.data.length = 0;
	}




}