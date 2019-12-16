import {
  GET_BASIC_USER_ROUTES_REQUEST,
  GET_BASIC_USER_ROUTES_SUCCESS,
  GET_BASIC_USER_ROUTES_FAILURE,
  basicUserStateKey
} from "../actions/getRoutesByBasicUserId";
import { makeContentReducer } from "../../_common/reducers/makeContentReducer";

const types = [
  GET_BASIC_USER_ROUTES_REQUEST,
  GET_BASIC_USER_ROUTES_SUCCESS,
  GET_BASIC_USER_ROUTES_FAILURE
];

export default basicUserProfileScreenReducer = makeContentReducer(
  types,
  basicUserStateKey
);
