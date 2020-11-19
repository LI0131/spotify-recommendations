import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Entry, Redirect, Results } from './components';

const App = () => {
	return <Switch>
		<Route exact path='/' component={Entry}/>
		<Route path='/results' component={Results}/>
		<Route path='/redirect' component={Redirect}/>
	</Switch>
};

export default App;
