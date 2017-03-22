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
import RaisedButton from 'material-ui/RaisedButton';
//#endregion

//#region [ Import Styles ]
import { AppStyles, RoomCellSize, Colors } from '../inline-styles/AppStyles';
//#endregion

//#region [ Props & State ]
interface GridControlsProps {
    //Grid
    maxRows: number;
    maxCols: number;
    onClickResize: (nRows: number, nCols: number) => void;
};
interface GridControlsState {

}
//#endregion
export class GridControls extends React.Component<GridControlsProps, GridControlsState> {

    _rowsInputRef: HTMLInputElement;
    _colsInputRef: HTMLInputElement;
    _patchXInputRef: HTMLInputElement;
    _patchYInputRef: HTMLInputElement;
    //#region [ Constructor ]
    constructor(props: GridControlsProps) {
        super(props);
        this.state = {

        };
    }
    //#endregion	
    validateFields(nRows: number, nCols: number, maxRows: number, maxCols: number): boolean {
        if (nRows < 0 || nCols < 0) {
            alert('Field numbers must be positive');
            return false;
        }
        else if (nRows > maxRows) {
            alert('Max rows number exceeded');
            return false;
        }
        else if (nCols > maxCols) {
            alert('Max cols number exceeded')
            return false;
        }
        else {
            return true
        };
    }
    //#region [ Render Partials ]
    //#endregion
    //#region [ Event Handlers ]
    handleClickResize() {
        let props = this.props;
        let nRows = parseInt(this._rowsInputRef.value);
        let nCols = parseInt(this._colsInputRef.value);
        if (this.validateFields(nRows, nCols, props.maxRows, props.maxCols)) {
            EventEmitter.emit(Events.CHANGE_GRID_SIZE, nRows, nCols);
        }
    }
    handleClickAddPatch() {
        let props = this.props;
        let x = parseInt(this._patchXInputRef.value);
        let y = parseInt(this._patchYInputRef.value);
        if (this.validateFields(x, y, props.maxRows, props.maxCols)) {
            EventEmitter.emit(Events.ADD_PATCH, new Pos(x, y));
        }
    }
    //#endregion
    //#region [ React Component ]
    render() {
        let props = this.props;
        let state = this.state;
        let containerStyle = {
            width: '100%',
            flex: '0 1 auto',
            display: 'flex',
            justifyContent: 'center'
        } as React.CSSProperties;
        let controlsGroupContainerStyle = {
            width: 150,
            paddingLeft: 15,
            paddingRight: 15,
            boxSizing: 'border-box'
        } as React.CSSProperties;
        let inputStyle = {
            width: 35
        };
        return (
            <div style={containerStyle}>
                <div style={controlsGroupContainerStyle}>
                    <div style={{ width: '100%' }}>
                        <span>Size:</span><br />
                        <input ref={r => this._rowsInputRef = r} type="number" style={inputStyle} max={props.maxRows} min={0} />
                        <span style={{ paddingLeft: 3, paddingRight: 3 }}>x</span>
                        <input ref={r => this._colsInputRef = r} type="number" style={inputStyle} max={props.maxCols} min={0} />
                    </div>
                    <div style={{ width: '100%', paddingTop: 15 }}>
                        <RaisedButton
                            backgroundColor={Colors.secondary}
                            fullWidth={true}
                            label="Resize"
                            labelColor={Colors.white}
                            onClick={() => { this.handleClickResize() }}
                        />
                    </div>
                </div>
                <div style={controlsGroupContainerStyle}>
                    <div style={{ width: '100%' }}>
                        <span>Patching:</span><br />
                        <span style={{ paddingLeft: 3, paddingRight: 3 }}>X:</span><input ref={r => this._patchXInputRef = r} type="number" style={inputStyle} max={props.maxCols} min={0} />
                        <span style={{ paddingLeft: 3, paddingRight: 3 }}>Y:</span><input ref={r => this._patchYInputRef = r} type="number" style={inputStyle} max={props.maxCols} min={0} />
                    </div>
                    <div style={{ width: '100%', paddingTop: 15 }}>
                        <RaisedButton
                            backgroundColor={Colors.secondary}
                            fullWidth={true}
                            label="Add Patch"
                            labelColor={Colors.white}
                            onClick={() => { this.handleClickAddPatch() }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
