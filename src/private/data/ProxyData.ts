class ProxyData {
	protected data:any;
	protected info:any;
	protected listener:{[type:string]:Function} = {}
	protected caller:{[type:string]:any} = {}
	public constructor(info:any) {
		this.info = info;
	}

	public changeValueWithoutEmit(value:any,key?:string):void{
		if(key){
			if(!this.data) this.data = {};
			this.data[key] = value;
		}else{
			this.data = value;
		}
		
	}

	public setData(value:any,key?:string){
		if(key){
			if(!this.data) this.data = {};
			this.data[key] = value;
		}else{
			this.data = value;
		}
		this.emit();
	}

	public on(type:string,fn:Function,caller:any):boolean{
		if(this.has(type,fn,caller)) return false;
		let listener = this.listener;
		let callers = this.caller;
		listener[type] = fn;
		callers[type] = caller;
		return true;
	}

	public off(type:string,fn:Function,caller:any):void{
		if(!this.has(type,fn,caller)) return;
		delete this.caller[type];
		delete this.listener[type];
	}

	public has(type:string,fn:Function,caller:any):boolean{
		let listener = this.listener;
		let callers = this.caller;
		return listener[type] == fn || callers[type] == caller;
	}

	public clear():void{
		this.data = null;
		this.caller = null;
		this.listener = null;
		this.info = null;
	}

	/**执行监听事件 */
	public emit():void{
		let fn = this.listener;
		let caller = this.caller;
		let args = this.data;
		for(let k in fn){
			fn[k].call(caller[k],args)
		}
	}

	public value():any{
		return this.data;
	}
}