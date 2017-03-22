//#region [ Import React ]
import * as React from 'react';
//#endregion

//#region [ Import Models ]
//#endregion

import EventEmitter from '../actions/EventEmitter';
import { Events } from '../actions/Events';
//#endregion

//#region [ Import Components ]
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ArrowRightIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import ArrowDownIcon from 'material-ui/svg-icons/navigation/arrow-downward';
import ArrowLeftIcon from 'material-ui/svg-icons/navigation/arrow-back';
import ArrowUpIcon from 'material-ui/svg-icons/navigation/arrow-upward';
//#endregion

//#region [ Import Styles ]
import { AppStyles, RoomCellSize, Colors } from '../inline-styles/AppStyles';
//#endregion

//#region [ Props & State ]
interface RobotControlsProps {
    onMoveRobot?: (direction: string) => void;
};
//#endregion
export class RobotControls extends React.Component<RobotControlsProps, {}> {

    //#region [ Constructor ]
    constructor(props: RobotControlsProps) {
        super(props);
    }
    //#endregion	
    //#region [ Event handlers ]
    handleEmmitEvent(direction: string) {
        EventEmitter.emit(Events.MOVE_ROBOT, direction);
        //this.props.onMoveRobot(direction);
    }
    //#endregion
    //#region [ React Component ]
    render() {
        var props = this.props;
        var state = this.state;
        var containerStyle = {
            width: '100%',
            flex: '0 1 auto',
            flexFlow: 'column',
            flexDirection: 'column',
            display: 'flex',
            justifyContent: 'center',
        } as React.CSSProperties;
        let buttonStyle = {
            width: 35,
            height: 35
        };
        let iconButtonStyle = {
            width: 35,
            height: 35
        }
        return (
            <div style={containerStyle}>
                <div className="flexbox-all-centered">
                    <FloatingActionButton
                        style={buttonStyle}
                        backgroundColor={Colors.primary}
                        iconStyle={iconButtonStyle}
                        onClick={() => { this.handleEmmitEvent('top'); }}
                    >
                        <ArrowUpIcon color={Colors.white} />
                    </FloatingActionButton>
                </div>
                <div className="flexbox-all-centered" >
                    <div className="flexbox-all-centered" style={{ flex: '0 1 auto', paddingRight: 10 }}>
                        <FloatingActionButton
                            style={buttonStyle}
                            backgroundColor={Colors.primary}
                            iconStyle={iconButtonStyle}
                            onClick={() => { this.handleEmmitEvent('left'); }}
                        >
                            <ArrowLeftIcon color={Colors.white} />
                        </FloatingActionButton>
                    </div>
                    <div className="flexbox-all-centered" style={{ flex: '0 1 auto', paddingLeft: 10 }}>
                        <FloatingActionButton
                            style={buttonStyle}
                            backgroundColor={Colors.primary}
                            iconStyle={iconButtonStyle}
                            onClick={() => { this.handleEmmitEvent('right'); }}
                        >
                            <ArrowRightIcon color={Colors.white} />
                        </FloatingActionButton>
                    </div>
                </div>
                <div className="flexbox-all-centered">
                    <FloatingActionButton
                        style={buttonStyle}
                        backgroundColor={Colors.primary}
                        iconStyle={iconButtonStyle}
                        onClick={() => { this.handleEmmitEvent('bottom'); }}
                    >
                        <ArrowDownIcon color={Colors.white} />
                    </FloatingActionButton>
                </div>
            </div>
        );
    }
    //#endregion 
}
