import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';
import 'bootstrap/dist/css/bootstrap.css';
const store = createStore(reducer, applyMiddleware(logger, thunkMiddleware));

export default store;
