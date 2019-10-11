import { combineReducers } from "redux";

import { TEST_ACTION, SET_TEXT, SET_TITLE } from "../actions/exemplar";

const myDefaultState = {
  text: " ",
  title: ""
};

const test = (state = {}, action) => {
  switch (action.type) {
    case TEST_ACTION: {
      return action.payload;
    }
    default:
      return state;
  }
};

const defaultState = {
  text: "",
  title: ""
};

const content = (state = myDefaultState, action) => {
  switch (action.type) {
    case SET_TEXT: {
      return { ...state, text: action.payload };
    }
    case SET_TITLE: {
      return { ...state, title: action.payload };
    }
    default:
      return state;
  }
};

export default combineReducers({
  test,
  content
});
