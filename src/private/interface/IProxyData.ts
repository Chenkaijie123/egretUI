interface IProxyData{
	readonly id:number;
}


interface IProxy{
	value?:any
	getProxyData?<T extends any>(key: string): ProxyData | ProxyArray<T> 
}