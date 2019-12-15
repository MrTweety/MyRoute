import {
  GET_BASIC_USER_REQUEST,
  GET_BASIC_USER_SUCCESS,
  GET_BASIC_USER_FAILURE,
  basicUserstateKey
} from "../actions/getBasicUserById";
import { makeContentReducer } from "../../_common/reducers/makeContentReducer";

const types = [
  GET_BASIC_USER_REQUEST,
  GET_BASIC_USER_SUCCESS,
  GET_BASIC_USER_FAILURE
];

export default basicUserReducer = makeContentReducer(types, basicUserstateKey);
