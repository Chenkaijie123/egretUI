
class GlobalData {
	actorSpeed:number = 300;//默认移动速度
	mapWid = 300;//地图宽度
	mapHeig = 300;//地图高度
	stageWidth:number;
	stageHeight:number;
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
				console.log("down")
			}else{
				res = direction.up;
				console.log("up")
			}
		}else if (_x > 0){
			if(_y == 0){
				res = direction.left;
				console.log("left")
			}else if(_y > 0){
				res = direction.down_left;
				console.log("down_left")
			}else{
				res = direction.up_left;
				console.log("up_left")
			}
		}else{
			if(_y == 0){
				res = direction.right;
				console.log("right")
			}else if(_y > 0){
				res = direction.up_right;
				console.log("up_right")
			}else{
				res = direction.down_right;
				console.log("down_right")
			}
		}
		return res;
	}
}

