import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  stateKey
} from "../actions/login";
import { makeContentReducer } from "../../_common/reducers/makeContentReducer";

const types = [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE];

export default signInReducer = makeContentReducer(types, stateKey);
