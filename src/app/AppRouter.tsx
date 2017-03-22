//#region [ Import React ]
import * as React from 'react';
import { Component } from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';


//#region [ Import Components ]
import AppFrame from './AppFrame';
import MainPage from './views/MainPage';
//#endregion

var router = (
  <Router history={hashHistory}>
    <Route path="/" component={AppFrame}>
      <IndexRoute component={MainPage} />
    </Route>
  </Router>
);


export let AppRouter = router;

