import { ADD_COMMENT_SUCCESS } from "../actions/addComment";
import { returnUser } from "../../AuthScreens/selectors/user";

import {
  COMMENTS_REQUEST,
  COMMENTS_SUCCESS,
  COMMENTS_FAILURE,
  stateKey
} from "../actions/getCommentsByRouteId";

import { makeContentReducer } from "../../_common/reducers/makeContentReducer";

const types = [COMMENTS_REQUEST, COMMENTS_SUCCESS, COMMENTS_FAILURE];

const makeCommentListReducer = makeContentReducer(types, stateKey);

export default commentListReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_COMMENT_SUCCESS: {
      const commentState = state;

      let newObject = {
        ...action.response,
        author: { ...action.actionParams.user }
      };
      return {
        data: [...commentState.data, newObject],
        error: null
      };
    }

    default:
      return makeCommentListReducer(state, action);
  }
};
