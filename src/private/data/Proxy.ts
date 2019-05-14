class Proxy {
	private value: Object = {};
	public constructor() {

	}

	public static observe<T extends Object>(o: Object,callObj:any,proxy?:any): T {
		let t:any = proxy || new Proxy();
		for (let k in o) {
			if(o[k] instanceof Function){
				throw "observer mush function";
			}
			if(!t[k]) t[k] = [o[k]];
			else t[k].push(o[k]);
			Object.defineProperty(this, k, {
				get(){return t.value[k]},
				set(v){
					t.value[k] = v;
					for(let i of t[k]){
						i.call(callObj,t.value[k]);
					}
				},
			})
		}
		return t;
	}

	public static dispose():void{
		
	}


}