namespace win {
	/**
	 * 窗口基类
	 */
	export class BaseView extends win.BaseCompoment implements Iview {
		public autoDestory:boolean = true;
		public constructor() {
			super();
		}

		protected open(): void { }

		protected close(): void { }

		/**
		 * 关闭调用函数，关闭时都会调用该方法一次
		 * @private
		 */
		public $close(): void {
			this.close();
			//加入窗口管理器队列,清理面板由管理器执行
			if (this.autoDestory) {
				ComposeMgr.push(this);
			}else{
				this.$clear();
			}
		}

		/**
		 * 打开界面时都会调用该方法一次
		 * @private
		 */
		public $open(): void {
			this.open();
		}



	}
}
