namespace win {
	/**
	 * 显示组件基类
	 * 该类以及该类的子类要用组件管理器调用
	 */
	export class BaseCompoment extends eui.Component implements ICompoment {
		// autoDestory: boolean;
		/**@private */
		activeTime: number;
		private eventLs: { [type: string]: Function }[] = [];
		public constructor() {
			super();
		}
		/**把对象加入到组件管理器中由管理器统一管理 */
		public release(): void {
			CompomentMgr.push(this);
		}
		/**添加监听事件 */
		public on(type: string, call: Function): BaseCompoment {
			this.$on(type, call);
			return this;
		}
		/**初始化 */
		public init(): void { }
		protected clear(): void { }
		protected destory(): void { }

		/**初始化，界面创建时执行一次 */
		protected childrenCreated(): void {
			super.childrenCreated();
			// this.init();
		}

		/**@private */
		public $clear(): void {
			this.$off();
			this.clear();
		}
		/**@private */
		public $destory(): void {
			this.eventLs = null;
			this.$clear();
			this.destory();
		}

		/**添加事件 */
		private $on(type: string, call: Function): void {
			let listen = this.eventLs;
			listen.push({ type: call });
			this.addEventListener(type, call, this);
		}

		/**移除事件 */
		private $off(): void {
			let listen = this.eventLs;
			let key: string;
			for (let k of listen) {
				key = Object.keys(k)[0];
				this.removeEventListener(key, listen[key], this);
			}
			listen.length = 0;
		}
	}
}