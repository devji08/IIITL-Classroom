import { createStore, combineReducers, applyMiddleware } from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import { authentication } from './authentication.js';

const loggerMiddleware = createLogger();

export const ConfigureStore = () => {
    const store = createStore(
        authentication,
        applyMiddleware(thunk)
    );
    return store;
}
