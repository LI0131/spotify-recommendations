import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import Reducer from '../reducer';
import thunk from 'redux-thunk';
import { STATE } from '../types';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const saver = (store) => next => action => {
    const state = store.getState();
    sessionStorage.setItem(STATE, JSON.stringify({...state?.Reducer}));
    return next(action);
}

const middlewares = [thunk, saver]

export default createStore(combineReducers({Reducer}), composeEnhancers(applyMiddleware(...middlewares)));
