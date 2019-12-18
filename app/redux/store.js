import { createStore, compose, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import callApi from "../middleware/callApi";

import { createReducer } from "./reducer";

/*
  TODO: 
    logger powinien być wyłaczony dla PROD,
    nie ma potrzeby na razie tego implementować :) 
*/

const logger = createLogger({
  // ...options
});

const returnMiddleware = () =>
  composeWithDevTools(
    applyMiddleware(
      thunk,
      callApi
      // logger
    )
    // other store enhancers if any
  );

// Configure the store
const configureStore = (initialState = {}) => {
  const store = createStore(createReducer(), initialState, returnMiddleware());

  // Add a dictionary to keep track of the registered async reducers
  store.asyncReducers = {};

  // Create an inject reducer function
  // This function adds the async reducer, and creates a new combined reducer
  store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
  };

  // Return the modified store
  return store;
};

const store = configureStore();

export const injectReducer = (key, asyncReducer) => {
  store.injectReducer(key, asyncReducer);
};

export default store;
