import { applyMiddleware, createStore } from "redux";
//import { createLogger, logger } from "redux-logger";
import logger from "redux-logger";
//import thunkMiddleware, { thunk } from "redux-thunk";
import { thunk } from "redux-thunk";
import promise from "redux-promise-middleware";
//import * as promise from "redux-promise";
//import { createPromise } from 'redux-promise-middleware';
//import { composeWithDevTools } from 'remote-redux-devtools';
//const promise = createPromise({ types: { fulfilled: 'success' } });
//const promise = createPromise();
import reducer from "./reducers/reducers";
//import { createSlice, configureStore } from '@reduxjs/toolkit'

//const middleware = [ promise, thunk, logger ];
const middleware = applyMiddleware(promise, thunk, logger);

//export default createStore(reducer, applyMiddleware(...middleware));
export default createStore(reducer, {}, middleware);
//export default createStore(reducer);
/*
const store = configureStore({
    reducer: reducer
})
 
export default store;
*/
