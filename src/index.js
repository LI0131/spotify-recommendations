import '@patternfly/react-core/dist/styles/base.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { Router } from 'react-router-dom'
import history from './history';

ReactDOM.render(
 	<Provider store={store}>
		 <Router history={history}>
		 	<App/>
		 </Router>
	</Provider>,
  	document.getElementById('root')
);
