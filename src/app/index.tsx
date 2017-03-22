//#region [ Import React ]
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as  injectTapEventPlugin from "react-tap-event-plugin";
//#endregion

//#region [ Import Material UI ]
import { MuiThemeProvider, lightBaseTheme } from 'material-ui/styles';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
const lightMuiTheme = getMuiTheme(lightBaseTheme);
//#endregion

//#region [ Import Project Class ]
import { AppRouter } from './AppRouter';
//#endregion

injectTapEventPlugin();


ReactDOM.render(
  <MuiThemeProvider muiTheme={lightMuiTheme}>
    {AppRouter}
  </MuiThemeProvider>,
  document.getElementById('app')
);

