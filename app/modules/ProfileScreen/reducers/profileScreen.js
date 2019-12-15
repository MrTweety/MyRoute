import {
  GET_USER_ROUTES_REQUEST,
  GET_USER_ROUTES_SUCCESS,
  GET_USER_ROUTES_FAILURE,
  stateKey
} from "../actions/getRoutesByUserId";
import { makeContentReducer } from "../../_common/reducers/makeContentReducer";

const types = [
  GET_USER_ROUTES_REQUEST,
  GET_USER_ROUTES_SUCCESS,
  GET_USER_ROUTES_FAILURE
];

export default profileScreenReducer = makeContentReducer(types, stateKey);
