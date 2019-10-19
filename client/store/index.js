import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';

const store = createStore(reducer, applyMiddleware(logger, thunkMiddleware));

export default store;
