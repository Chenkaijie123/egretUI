/**
 * 显示实体管理器
 */
namespace mgr {
	/**
	 * function pop(T) 获取实例
	 * function push(T) 把实体组件加入到管理器
	 */
	export class CompomentMgr implements IMgr {
		/**定时清除控制 */
		private autoClear: boolean = true;
		/**缓存中的组件如果超过这个时间将有可能被清除 */
		private clearTime: number = 60 * 5 * 1000;
		/**缓存中如果面板超过这个时长不用就有可能被销毁 */
		private winRime:number = 60 * 10 * 1000;
		/**清理时间超过改值将退出清理，等待下次清理 */
		private timeLimit: number = 100;
		private $counter:number = 0;//累加到30执行一次清理
		/**对象池 */
		private $pool: { [name: string]: ICompoment[] } = {};
		/**窗口管理 */
		private $win: win.BaseView[] = [];
		public constructor() {
		}

		public init(): void {

		}

		/**
		 * 获取对象
		 * @param v Function
		 */
		public pop<T extends egret.DisplayObject>(v: typeof egret.DisplayObject): T {
			let ls = this.$pool[v.prototype["__class__"]];
			let res: any;
			if (!ls || !ls.length) res = new v;
			else res = ls.pop();
			res.init();
			return res;
		}

		/**获取界面实例 */
		public getWin<T extends Iview>(v:any):T{
			let ls = this.$win;
			let res:any;
			for(let i:number = 0,l = ls.length;i<l;i++){
				if(ls[i] instanceof v){
					res = ls.splice(i,1)[0];
					break;
				}
			}
			if(!res) res = new v();
			return res;
		}

		/**把不用的对象加入缓存，由管理器管理,实现 ICompoment 接口的对象 */
		public push(i: any): void {
			i.$clear && i.$clear();
			i.activeTime = egret.getTimer();
			if (egret.is(i, "Iview")) {
				this.$win.push(i);
			} else {
				let k = egret.getQualifiedClassName(i);
				if (!this.$pool[k]) this.$pool[k] = [];
				this.$pool[k].push(i);
				if(++this.$counter > 30) this.clear();
			}
		}

		/**
		 * 清理对象池，该方法不会全部清空对象池
		 */
		private clear(): void {
			this.$counter = 0;
			if (!this.autoClear) return;
			let t: number = egret.getTimer();//当前时间
			let cTime: number = this.clearTime;
			let tL = this.timeLimit;
			let p = this.$pool;
			let limit = this.timeLimit;
			let temp: ICompoment;
			for (let k in p) {
				while (p[k].length > 5) {
					temp = p[k][0];
					if (t - temp.activeTime > cTime) {
						temp.$destory && temp.$destory();
						delete p[k][0];
					} else {
						break;
					}
					//超过时间退出清理
					if (egret.getTimer() - t > tL) return;
				}
			}
		}

		/**
		 * 清理面板
		 */
		private destoryView():void{
			let wins = this.$win;
			let len = this.winRime;
			let limitTime = this.timeLimit;
			let t = egret.getTimer();
			let w:Iview;
			while(w = wins[0]){
				if( t - w.activeTime > len){
					w.$destory();
					delete wins[0];
					if(egret.getTimer() - t > limitTime) return;//超时
				}else{
					return;
				}
			}
		}
	}
}