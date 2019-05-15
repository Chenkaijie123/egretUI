

namespace mgr {
	export class DataObjectMgr implements IMgr{
		private pool:Array<Object> = [];
		public constructor() {
		}
		public init():void{}

		public pop<T extends Object>():T{
			let r = this.pool.pop() || Object.create(null);
			return r;
		}

		public push(...item:any[]):void{
			for(let i of item){
				for(let k in i){
					delete i[k]
				}
				this.pool.push(i);
			}
		}
	}
}