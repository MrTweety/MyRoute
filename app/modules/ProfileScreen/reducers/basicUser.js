import {
  GET_BASIC_USER_REQUEST,
  GET_BASIC_USER_SUCCESS,
  GET_BASIC_USER_FAILURE,
  basicUserstateKey
} from "../actions/getBasicUserById";
import { makeContentReducer } from "../../_common/reducers/makeContentReducer";
import { FOLLOW_USER_SUCCESS } from "../actions/follow";
import { UNFOLLOW_USER_SUCCESS } from "../actions/unFollow";

const types = [
  GET_BASIC_USER_REQUEST,
  GET_BASIC_USER_SUCCESS,
  GET_BASIC_USER_FAILURE
];

const makeBasicUserReducer = makeContentReducer(types, basicUserstateKey);

const basicUserReducer = (state = {}, action) => {
  switch (action.type) {
    case FOLLOW_USER_SUCCESS: {
      const stateData = state.data;
      return {
        ...state,
        data: {
          ...stateData,
          followers: [...stateData.followers, action.actionParams.currentUserId]
        }
      };
    }
    case UNFOLLOW_USER_SUCCESS: {
      const stateData = state.data;

      const followers = stateData.followers.filter(
        user => user !== action.actionParams.currentUserId
      );
      return {
        ...state,
        data: {
          ...stateData,
          followers: followers
        }
      };
    }

    default:
      return makeBasicUserReducer(state, action);
  }
};

export default basicUserReducer;
