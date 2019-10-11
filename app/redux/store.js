import { createStore, compose, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "../modules/exemplar/reducers/exemplar";

import { createLogger } from "redux-logger";

const logger = createLogger({
  // ...options
});

// const composeEnhancers =
//   typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//         // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
//       })
//     : compose;

// const enhancer = composeEnhancers(
//   applyMiddleware(thunk, logger)
//   // other store enhancers if any
// );
// export const initStore = () => createStore(rootReducer, enhancer);

export const initStore = () =>
  createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(thunk, logger)
      // other store enhancers if any
    )
  );
