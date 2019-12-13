import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  stateKey
} from "../actions/register";
import { makeContentReducer } from "../../_common/reducers/makeContentReducer";

const types = [REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE];

export default signUpReducer = makeContentReducer(types, stateKey);
