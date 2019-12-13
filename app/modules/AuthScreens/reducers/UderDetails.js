import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  userStateKey
} from "../actions/getUserById";
import { makeContentReducer } from "../../_common/reducers/makeContentReducer";

const types = [GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE];

export default userDetailsReducer = makeContentReducer(types, userStateKey);
