/**窗口 */
interface Iview extends ICompoment{
	autoDestory:boolean;
	/**初始化时执行一次 */
	init():void;
	$open():void;
	$close():void;
}