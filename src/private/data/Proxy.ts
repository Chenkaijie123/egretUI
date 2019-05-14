class Proxy {
	private value: { [key: string]: ProxyData } = {};
	public constructor() {

	}

	/**
	 * 添加监视，返回代理对象，对数据的操作改为操作代理对象
	 * @param o 监听函数集合，监听类型为各个key值
	 * @param callObj 调用者
	 * @param proxy 是否在改代理对象上监听，不传穿件新的代理对象
	 */
	public static observe<T>(o: { [key: string]: Function }, callObj: any, proxy?: Proxy): T {
		let t: any = proxy || new Proxy();
		for (let k in o) {
			Object.defineProperty(t, k, {
				get() {
					return t.value[k].value();
				},
				set(...v) {
					if (v instanceof Array) {
						(t.value[k] as ProxyArray<any>).$clear();
						(t.value[k] as ProxyArray<any>).push(...v);
					} else {
						if (v[0] instanceof Object) {
							for (let key in v[0]) {
								t.value[k].changeValueWithoutEmit(v[0][key], key);
							}
						} else {
							t.value[k].changeValueWithoutEmit(v[0]);
						}
						t.value[k].emit();
					}
				},
			})
			t.value[k] = new ProxyArray<any>(k);
			t.value[k].on(k,o[k],callObj);
		}
		return t;
	}

	/**移除所有监听 */
	public static dispose(proxy: Proxy | any, o?: { [key: string]: Function }, callObj?: any): void {
		if (!o) {
			for (let k in proxy.value) {
				proxy.value[k].clear();
			}
		}else{
			for(let k in o){
				proxy.value[k].off(k,o[k],callObj);
			}
		}
	}

	/**获取数据代理对象 */
	public getProxyData<T extends any>(key: string): ProxyData | ProxyArray<T> {
		return this.value[key];
	}


}