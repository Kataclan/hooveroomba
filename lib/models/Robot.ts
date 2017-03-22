//#region [ Import Models ]
import { Pos } from '../interfaces/Pos';
import { RoomCell, RoomCellTypes } from '../interfaces/RoomCell';
//#endregion

export class Robot {
    //#region [ Properties ]
    public Pos: Pos;
    //#endregion

    //#region [ Constructor ]
    constructor(initialPos: Pos) {
        this.Pos = initialPos;
    }
    //#endregion	

    //#region [ Methods ]
    public MoveRight(): void {
        ++this.Pos.X;
    }
    public MoveLeft(): void {
        --this.Pos.X;
    }
    public MoveTop(): void {
        ++this.Pos.Y;
    }
    public MoveBottom(): void {
        --this.Pos.Y;
    }
    //#endregion
}
