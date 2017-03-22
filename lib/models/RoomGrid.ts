//#region [ Import Models ]
import { Pos } from '../interfaces/Pos';
import { RoomCell, RoomCellTypes } from '../interfaces/RoomCell';
import { checkPosMax, searchPos } from '../utils';
import { Robot } from './Robot';
//#endregion

var getInitialCellType = (pos: Pos, robotPos: Pos, patches: Array<Pos>): RoomCellTypes => {
    if (robotPos.X === pos.X && robotPos.Y === pos.Y) {
        return RoomCellTypes.Robot;
    }
    else if (searchPos(pos, patches) !== -1) {
        return RoomCellTypes.Patched;
    }
    else {
        return RoomCellTypes.Empty;
    }
};

var transformPos = (pos: Pos, nRows: number, nCols: number): Pos => {
    let y = pos.X;
    let x = (nRows - 1) - pos.Y;
    return new Pos(x, y);
}

export interface RoomGridProps {
    nRows: number;
    nCols: number;
    patches: Array<Pos>;
    defaultRobotPos?: Pos;
};
export class RoomGrid {
    //#region [ Properties ]
    public Grid: Array<Array<RoomCell>>;
    public GridProps: RoomGridProps;
    public Robot: Robot;
    //#endregion

    //#region [ Constructor ]
    constructor(props: RoomGridProps) {
        this.GridProps = props;
        this.Robot = new Robot(new Pos(props.defaultRobotPos.X, props.defaultRobotPos.Y));
        this.InitGrid(props);
    }
    InitGrid(props: RoomGridProps) {
        this.Grid = new Array();
        for (let idxRow = props.nRows - 1; idxRow >= 0; --idxRow) {
            let roomRow = new Array();
            for (let idxCol = 0; idxCol < props.nCols; ++idxCol) {
                let roomCellPos: Pos = new Pos(idxRow, idxCol);
                let roomCellType = getInitialCellType(roomCellPos, props.defaultRobotPos, props.patches);
                let roomCell: RoomCell = {
                    pos: roomCellPos,
                    type: roomCellType
                };
                roomRow.push(roomCell);
            }
            this.Grid.push(roomRow);
        }
    }
    public Resize(nRows: number, nCols: number) {
        let props = this.GridProps;
        props.nRows = nRows;
        props.nCols = nCols;
        this.Robot.Pos = new Pos(props.defaultRobotPos.X, props.defaultRobotPos.Y);
        this.InitGrid(props);
    }
    //#endregion

    //section [ Robot Management ]
    private UpdateRobotInGrid(oldPos: Pos, newPos: Pos): void {
        let oldPosTransformed = transformPos(oldPos, this.GridProps.nRows, this.GridProps.nCols); // Transform to top -> bottom grid pos
        let newPosTransformed = transformPos(newPos, this.GridProps.nRows, this.GridProps.nCols); // Transform to top -> bottom grid pos
        this.Grid[oldPosTransformed.X][oldPosTransformed.Y].type = RoomCellTypes.Empty; //Robot leaves old pos
        this.Grid[newPosTransformed.X][newPosTransformed.Y].type = RoomCellTypes.Robot; //and occupies new pos
    }
    public MoveRobot(direction: string): void {
        let robot = this.Robot;
        let oldRobotPos = new Pos(robot.Pos.X, robot.Pos.Y), newRobotPos, update = false;
        switch (direction) {
            case 'top':
                if (oldRobotPos.Y < this.GridProps.nRows - 1) {
                    robot.MoveTop();
                    newRobotPos = new Pos(robot.Pos.X, robot.Pos.Y);
                    update = true;
                }
                break;
            case 'bottom':
                if (oldRobotPos.Y > 0) {
                    this.Robot.MoveBottom();
                    newRobotPos = new Pos(robot.Pos.X, robot.Pos.Y);
                    update = true;
                }
                break;
            case 'left':
                if (oldRobotPos.X > 0) {
                    this.Robot.MoveLeft();
                    newRobotPos = new Pos(robot.Pos.X, robot.Pos.Y);
                    update = true;
                }
                break;
            case 'right':
                if (oldRobotPos.X < this.GridProps.nCols - 1) {
                    robot.MoveRight();
                    newRobotPos = new Pos(robot.Pos.X, robot.Pos.Y);
                    update = true;
                }
                break;
        }
        if (update) {
            this.UpdateRobotInGrid(oldRobotPos, newRobotPos);
        }
    }
    //#endsection

    //#region [ Patches ]
    public AddPatch(pos: Pos): void {
        if (checkPosMax(pos) && searchPos(pos, this.GridProps.patches) === -1) {
            let transformedPatchPos = transformPos(pos, this.GridProps.nRows, this.GridProps.nCols);
            this.Grid[transformedPatchPos.X][transformedPatchPos.Y].type = RoomCellTypes.Patched; //Robot leaves old pos
            this.GridProps.patches.push(pos);
        } else {
            console.log(`Error: Invalid point (${pos.X + pos.Y})`);
        }
    }
    public RemovePatch(pos: Pos): void {
        let patchIndex = -1;
        let patch = this.GridProps.patches.every((p, i) => {
            if (pos.X !== p.X || pos.Y !== p.Y) {
                return true;
            } else {
                patchIndex = -1;
                return false;
            }
        });
        if (patchIndex !== -1) {
            this.GridProps.patches.splice(patchIndex, 1);
        } else {
            console.log(`There's no patch in (${pos.X + pos.Y})`);
        }
    }
    public ClearPatches(): void {
        this.GridProps.patches = [];
    }
    //#endregion

    //#region [ Getters ]
    public GetRoomCell(pos: Pos): RoomCell {
        if (checkPosMax(pos)) {
            return this.Grid[pos.X][pos.Y];
        } else {
            console.log(`Error: Invalid point (${pos.X + pos.Y})`);
        }
    }
    //#region [ Extensions ]

    //#endregion 
}
