import { combineReducers } from "redux";
import { testReducer } from "../modules/exemplar/reducers/exemplar";

const staticReducers = {
  test: testReducer
};

export function createReducer(asyncReducers) {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers
  });
}
