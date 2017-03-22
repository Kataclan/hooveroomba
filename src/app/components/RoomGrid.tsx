//#region [ Import React ]
import * as React from 'react';
//#endregion

//#region [ Import Models ]
import { RoomGrid as MRoomGrid, RoomGridProps as GridProps } from '../../../lib';
import { Pos } from '../../../lib';
import { RoomCell, RoomCellTypes } from '../../../lib';
import { Robot } from '../../../lib';
import { checkPosMax, searchPos } from '../../../lib';
//#endregion

//#region [ Import Events ]
import EventEmitter from '../actions/EventEmitter';
import { Events } from '../actions/Events';
//#endregion

//#region [ Import Components ]
//#endregion

//#region [ Import Styles ]
import { AppStyles, RoomCellSize, Colors } from '../inline-styles/AppStyles';
//#endregion

//#region [ Props & State ]
interface RoomGridProps {
    //Grid
    defaultGridProps: GridProps;
    maxRows: number;
    maxCols: number;
};
interface RoomGridState {
    roomGrid: MRoomGrid;
}
//#endregion
export class RoomGrid extends React.Component<RoomGridProps, RoomGridState> {

    //#region [ Constructor ]
    constructor(props: RoomGridProps) {
        super(props);
        this.state = {
            roomGrid: new MRoomGrid(props.defaultGridProps)
        };
    }
    //#endregion	

    //#region [ Event Handlers ]
    handleMoveRobot(direction: string) {
        let grid = this.state.roomGrid;
        grid.MoveRobot(direction);
        this.setState({ roomGrid: grid });
    }
    handleResizeGrid(nRows: number, nCols: number) {
        let grid = this.state.roomGrid;
        grid.Resize(nRows, nCols);
        this.setState({ roomGrid: grid });
    }
    handleAddPatch(pos: Pos) {
        let grid = this.state.roomGrid;
        grid.AddPatch(pos);
        this.setState({ roomGrid: grid });
    }
    //#endregion
    //#region [ React Component ]
    componentDidMount() {
        EventEmitter.on(Events.MOVE_ROBOT, (direction: string) => { this.handleMoveRobot(direction); })
        EventEmitter.on(Events.CHANGE_GRID_SIZE, (nRows: number, nCols: number) => { this.handleResizeGrid(nRows, nCols); });
        EventEmitter.on(Events.ADD_PATCH, (pos: Pos) => { this.handleAddPatch(pos); });
    }
    // componentWillReceiveProps(nextProps: RoomGridProps) {

    // }
    render() {
        var Cell = (cell: RoomCell, key: string) => {
            let imgSrc;
            switch (cell.type) {
                case RoomCellTypes.Empty: imgSrc = 'public/img/tile_empty_small.png'; break;
                case RoomCellTypes.Patched: imgSrc = 'public/img/tile_patch.png'; break;
                case RoomCellTypes.Robot: imgSrc = 'public/img/tile_robot_up.png'; break;
            }
            let style = {
                //width: `${this.getCellWidthPerc()}%`,
                width: RoomCellSize,
                height: RoomCellSize,
                fontSize: 8,
                textAlign: 'center',
                float: 'left',
                display: 'inline-block',
                boxSizing: 'border-box',
                border: '1px solid ' + Colors.white
            };
            let imgStyle = {
                width: '100%',
                height: '100%'
            };
            return (
                <div key={key} style={style}>
                    <img style={imgStyle} src={imgSrc} />
                </div>
            );
        };
        var Grid = (state: RoomGridState) => {
            let roomCellNodes: Array<JSX.Element> = [];
            let _style = {
                width: state.roomGrid.GridProps.nCols * RoomCellSize,
                height: state.roomGrid.GridProps.nRows * RoomCellSize
            };
            let roomRows = state.roomGrid.Grid.forEach((gridRow, idxRow) => {
                gridRow.forEach((gridCell, idxCol) => {
                    roomCellNodes.push(Cell(gridCell, `${idxCol}${idxRow}`));
                });
            })
            return (
                <div style={_style}>
                    {roomCellNodes}
                </div>
            );
        };
        var props = this.props;
        var state = this.state;
        var containerStyle = {
            width: '100%',
            flex: '1 1 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        } as React.CSSProperties;
        return (
            <div style={containerStyle}>
                {Grid(state)}
            </div>
        );
    }
    //#endregion 
}
