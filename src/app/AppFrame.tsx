//#region [ Import React ]
import * as React from 'react';
//#endregion

//#region [ Import Components ]
import { Colors } from './inline-styles/AppStyles';
//#region [ Import Components ]
import AppBar from './components/AppBar';
import Footer from './components/Footer';


export default class AppFrame extends React.Component<{}, {}> {
	//#region [ Constructor ]
	constructor() {
		super();
	}
	//#endregion

	//#region [ React Component ] 
	render() {
		let Content = (contentNode: React.ReactNode) => {
			return (
				<div id="content">
					{contentNode}
				</div>
			);
		}
		let wrapperStyle = {
			borderLeft: '1px solid ' + Colors.lightGray,
			borderRight: '1px solid ' + Colors.lightGray
		};
		return (
			<div id="wrapper" style={wrapperStyle}>
				{AppBar('hooveroomba', () => { }, () => { })}
				{Content(this.props.children)}

			</div>
		);
	}
	//#endregion
}