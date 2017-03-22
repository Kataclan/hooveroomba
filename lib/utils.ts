import { Pos } from './interfaces/Pos';

export var checkPosMax = (pos: Pos): boolean => {
    if (pos.X >= this.NCols || pos.Y >= this.NRows ||
        pos.X < 0 || pos.Y < 0) {
        return false;
    }
    else {
        return true;
    }
}

export var searchPos = (pos: Pos, posArray: Array<Pos>): number => {
    let idx = -1;
    posArray.every((p, i) => {
        if (pos.X !== p.X || pos.Y !== p.Y) {
            return true;
        }
        else {
            idx = i;
            return false;
        }
    });
    return idx;
};