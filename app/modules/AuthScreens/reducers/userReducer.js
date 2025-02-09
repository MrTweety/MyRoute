import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from "../actions/register";
import signUpReducer from "../reducers/SignUp";

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "../actions/login";
import signInReducer from "../reducers/SignIn";

import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE
} from "../actions/getUserById";
import userDetailsReducer from "../reducers/UderDetails";
import { UNFOLLOW_USER_SUCCESS } from "../../ProfileScreen/actions/unFollow";
import { FOLLOW_USER_SUCCESS } from "../../ProfileScreen/actions/follow";

export default userReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOGIN_SUCCESS:
    case LOGIN_FAILURE:
      return signInReducer(state, action);

    case REGISTER_REQUEST:
    case REGISTER_SUCCESS:
    case REGISTER_FAILURE:
      return signUpReducer(state, action);

    case GET_USER_REQUEST:
    case GET_USER_SUCCESS:
    case GET_USER_FAILURE:
      return userDetailsReducer(state, action);

    case FOLLOW_USER_SUCCESS: {
      const stateData = state.data;
      return {
        ...state,
        data: {
          ...stateData,
          followed: [...stateData.followed, action.actionParams.userId]
        }
      };
    }
    case UNFOLLOW_USER_SUCCESS: {
      const stateData = state.data;

      const followed = stateData.followed.filter(
        user => user !== action.actionParams.userId
      );
      return { ...state, data: { ...stateData, followed: followed } };
    }

    default:
      return state;
  }
};
