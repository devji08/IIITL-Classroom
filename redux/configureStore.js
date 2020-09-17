import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { authentication } from './authentication.js';
import { subjectReducer } from './subjectReducer.js';
import { signUpReducer } from './signupReducer.js';
import { feedReducer } from './feedReducer.js';
import { persistStore, persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const config = {
    key: 'root',
    storage: AsyncStorage,
    debug: true
}


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            signUpReducer,
            authentication,
            subjectReducer,
            feedReducer,
        }),
        applyMiddleware(thunk, logger)
    );
    return {store};
}