//#region [ Import React ]
import * as React from 'react';
//#endregion

//#region [ Import Models ]
import { Pos, RoomGrid as MRoomGrid, RoomGridProps, RoomCell, RoomCellTypes, Robot } from '../../../lib';
//#endregion

//#region [ Import Components ]
import { RoomGrid } from '../components/RoomGrid';
import { GridControls } from '../components/GridControls';
import { RobotControls } from '../components/RobotControls';
//#endregion

//#region [ Import Styles ]
import { AppStyles, Colors, RoomCellSize } from '../inline-styles/AppStyles';
//#endregion

interface MainPageState {
    gridProps: RoomGridProps;
}
export default class MainPage extends React.Component<{}, MainPageState> {

    _maxRoomRows: number = 10; //Max row size
    _maxRoomCols: number = 10; //Max col size

    _defaultGridProps: RoomGridProps = { //Default grid props
        nRows: 4,
        nCols: 5,
        defaultRobotPos: new Pos(0, 0),
        patches: [],
    };

    //#region [ Constructor ]
    constructor() {
        super();
    }
    //#endregion	
    //#endregion


    //#region [ React Component ]
    render() {
        let containerStyle = {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexFlow: 'column',
            justifyContent: 'center'
        } as React.CSSProperties;
        return (
            <div style={containerStyle}>
                <GridControls
                    maxRows={this._maxRoomRows}
                    maxCols={this._maxRoomCols}
                    onClickResize={(nRows: number, nCols: number) => { }}
                />
                <RoomGrid
                    defaultGridProps={this._defaultGridProps}
                    maxRows={this._maxRoomRows}
                    maxCols={this._maxRoomCols}
                />
                <RobotControls />
            </div >
        );
    }
    //#endregion 
}
