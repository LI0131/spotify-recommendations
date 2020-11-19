import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import Reducer from '../reducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunk]

export default createStore(combineReducers({Reducer}), composeEnhancers(applyMiddleware(...middlewares)));
