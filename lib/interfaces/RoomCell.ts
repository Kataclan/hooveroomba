import { Pos } from './Pos';
export enum RoomCellTypes {
    Empty = 0,
    Robot = 1,
    Patched = 2
};
export interface RoomCell {
    pos: Pos;
    type: RoomCellTypes;
};