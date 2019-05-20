class MapNode implements INode {
	centerX: number;
	centerY: number;
	nodeWid: number;
	nodeHeig: number;
	public constructor() {
	}

	public release():void{
		dataFactory.push(this);
	}
}