/**实体组件 */
interface ICompoment{
	/**最后活跃时间 */
	activeTime:number;
	/**加入组件管理器对象池会调用 */
	$clear():void;
	/**组件管理器销毁多余组件调用 */
	$destory():void;
	/**可以重写该方法移除外部引用并且加入组件管理器 */
	release():void;
}