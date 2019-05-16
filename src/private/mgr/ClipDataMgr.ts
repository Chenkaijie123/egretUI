namespace mgr {
	export class ClipfactoryMgr implements IMgr {
		private map: { [id: string]: egret.MovieClipDataFactory } = {};
		private isLoading: { [id: string]: number } = {};
		private dataEvent: egret.EventDispatcher = new egret.EventDispatcher();
		public constructor() {
		}


		/**
		 * 设置序列帧动画数据
		 * @param json 图集描述文件
		 * @param texture 图集文件
		 * @param name 动画名
		 * @param clip 需要添加动画数据的序列帧对象
		 * @param playTime 播放次数
		 */
		public async setClipData(json: string, texture: string,clip: egret.MovieClip,playTime:number,name?:string):Promise<any>{
			await this.getClipData(json,texture,clip,name);
			clip.play(playTime || 1);
		}

		/**
		 * 获取序列帧动画数据
		 * @param json 图集描述文件
		 * @param texture 图集文件
		 * @param name 动画名
		 * @param clip 需要添加动画数据的序列帧对象
		 */
		public async getClipData(json: string, texture: string, clip?: egret.MovieClip, name?: string): Promise<egret.MovieClipData> {
			let key: string = json.concat(texture);
			let map = this.map;
			let clipData: egret.MovieClipData;
			//不存在缓存中需要加载文件
			if (!map[key]) {
				//已经在加载
				if (this.check(key)) {
					await new Promise((resolve, reject) => {
						let fn: Function = (e: egret.Event) => {
							this.dataEvent.removeEventListener(key, fn, this);
							resolve();
						}
						this.dataEvent.addEventListener(key, fn, this);
					})
				} else {
					//标志正在加载
					this.isLoading[key] = 1;
					let [j, t] = await Promise.all(
						[
							RES.getResAsync(json),
							RES.getResAsync(texture)
						]
					);
					let clipFactory = new egret.MovieClipDataFactory(j, t);
					map[key] = clipFactory;
				}
			}
			clipData = map[key].generateMovieClipData(name || "");
			clip && (clip.movieClipData = clipData);
			this.loadEnd(key);
			return Promise.resolve(clipData);
		}

		/**销毁 */
		public destory(json: string, texture: string): void {
			let key = json.concat(texture)
			let fac = this.map[key];
			if (!fac) return;
			fac.clearCache();
			delete this.map[key];
		}

		/**判断该动画工厂类是否已经在创建 */
		private check(key: string): boolean {
			if (this.isLoading[key]) return true;
			return false;
		}

		/**
		 * 工厂实例创建完毕
		 * 给所有要该动画数据的对象赋值
		 */
		private loadEnd(key: string): void {
			if (!this.isLoading[key]) return;
			delete this.isLoading[key];
			this.dataEvent.dispatchEventWith(key, true, key);
		}


	}
}