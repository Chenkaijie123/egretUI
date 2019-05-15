class Proxy {
	private value: { [key: string]: ProxyData<any> } = {};
	public constructor() {

	}

	/**
	 * 添加监视，返回代理对象，对数据的操作改为操作代理对象
	 * @param o 监听函数集合，监听类型为各个key值
	 * @param callObj 调用者
	 * @param proxy 是否在改代理对象上监听，不传穿件新的代理对象
	 * @returns 该函数返回的是源数据的代理对象
	 */
	public static observe<T>(o: { [key: string]: Function }, callObj: any, proxy?: any): T {
		let t: any = proxy || new Proxy();
		for (let k in o) {
			if (!t.value[k]) t.value[k] = new ProxyData<any>(k);
			let temp:ProxyData<any> = t.value[k]
			temp.on(k, o[k], callObj);
			Object.defineProperty(t, k, {
				get() {
					return temp;//.value();
				},
				set(...v) {
					let proxyData: ProxyData<any> = temp;
					if (proxyData.type == DataType.ARRAY) {
						proxyData.$clear();
						proxyData.push(...v);
					} else {
						if (proxyData.type == DataType.OBJECT) {
							for (let key in v[0]) {
								temp.changeValueWithoutEmit(v[0][key], key);
							}
						} else {
							temp.changeValueWithoutEmit(v[0]);
						}
						temp.emit();
					}
				},
			})

		}
		return t;
	}

	/**移除所有监听 */
	public static dispose(proxy: Proxy | any, o?: { [key: string]: Function }, callObj?: any): void {
		if (!o) {
			for (let k in proxy.value) {
				proxy.value[k].clear();
			}
		} else {
			for (let k in o) {
				proxy.value[k].off(k, o[k], callObj);
			}
		}
	}

	/**获取数据代理对象 */
	public getProxyData<T extends any>(key: string): ProxyData<T> {
		return this.value[key];
	}


}