
class GlobalData {
	actorSpeed:number = 10;//默认移动速度
	mapWid = 300;//地图宽度
	mapHeig = 300;//地图高度
	public constructor() {
	}

	/**
	 * @param curX 当前x坐标
	 * @param curY 当前y坐标
	 * @param tarX 目标x坐标
	 * @param tarY 目标y坐标
	 */
	public getDir(curX:number,curY:number,tarX:number,tarY:number):direction{
		let _x = curX - tarX;
		let _y = curY - tarY;
		let res:direction ;
		if(_x == 0){
			if(_y == 0){
				res = direction.keep;
			}else if(_y > 0){
				res = direction.down;
			}else{
				res = direction.up;
			}
		}else if (_x > 0){
			if(_y == 0){
				res = direction.left;
			}else if(_y > 0){
				res = direction.down_left;
			}else{
				res = direction.up_left;
			}
		}else{
			if(_y == 0){
				res = direction.right;
			}else if(_y > 0){
				res = direction.down_right;
			}else{
				res = direction.up_right;
			}
		}
		return res;
	}
}

