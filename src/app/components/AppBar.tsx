//#region [ Import React ]
import * as React from 'react';
//#endregion

//#region [ Import Inline styles ]
import { AppStyles, Colors } from '../inline-styles/AppStyles';
//#region

var AppBar = (title: string, onLeftBtnClick: () => void, onRightBtnClick: () => void) => {
    let _style = AppStyles.AppBar;
    return (
        <div id="app-bar" style={_style.style}>
            <div style={_style.titleSquare}>
                <span style={_style.titleSquareSpan}>{title}</span>
            </div>
        </div>
    );
};
export default AppBar;