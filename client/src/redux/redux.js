import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {mainReducer} from './mainReducer';
import {authReducer} from './authReducer';
import {formReducer} from './formReducer';
import {messageReducer} from './messageReducer';
import {iblockReducer} from './iblockReducer';

export const reducers = combineReducers({
    main: mainReducer,
    auth: authReducer,
    form: formReducer,
    message: messageReducer,
    iblock: iblockReducer
});

const middleware = applyMiddleware(thunk);

const preloadedState = globalThis.__PRELOADED_STATE__;

delete globalThis.__PRELOADED_STATE__;

export const store = createStore(reducers, preloadedState, middleware);

globalThis.store = store;