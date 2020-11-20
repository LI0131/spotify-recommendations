import './App.scss';

import React, { useState, useCallback } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Entry, Redirect, Header, Results } from './components';

const App = () => {

	const [headerActions, defHeaderActions] = useState()

	const setHeaderActions = useCallback((data) => {
		defHeaderActions(data);
	}, [defHeaderActions]);

	return <React.Fragment>
		<Header actions={headerActions}/>
		<div className='spot-c-root'>
			<Switch>
				<Route exact path='/' render={(props) => <Entry setHeaderActions={setHeaderActions} {...props} />}/>
				<Route path='/results' render={(props) => <Results setHeaderActions={setHeaderActions} {...props} />}/>
				<Route path='/redirect' component={Redirect}/>
			</Switch>
		</div>
	</React.Fragment>;
};

export default App;
