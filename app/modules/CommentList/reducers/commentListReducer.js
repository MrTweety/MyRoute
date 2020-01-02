import { ADD_COMMENT_SUCCESS } from "../actions/addComment";
import { returnUser } from "../../AuthScreens/selectors/user";

import {
  COMMENTS_REQUEST,
  COMMENTS_SUCCESS,
  COMMENTS_FAILURE,
  stateKey
} from "../actions/getCommentsByRouteId";

const commentListReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENTS_REQUEST: {
      return {
        [action.routeId]: { data: null, error: null }
      };
    }
    case COMMENTS_SUCCESS: {
      return {
        [action.routeId]: { data: action.response, error: null }
      };
    }
    case COMMENTS_FAILURE: {
      return {
        [action.routeId]: { data: false, error: action.message }
      };
    }

    case ADD_COMMENT_SUCCESS: {
      const commentState = state[action.routeId];

      let newObject = {
        ...action.response,
        author: { ...action.actionParams.user }
      };
      return {
        [action.routeId]: {
          data: [...commentState.data, newObject],
          error: null
        }
      };
    }

    default:
      return state;
  }
};
export default commentListReducer;
