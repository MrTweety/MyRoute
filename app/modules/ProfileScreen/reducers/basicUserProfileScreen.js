import {
  GET_BASIC_USER_ROUTES_REQUEST,
  GET_BASIC_USER_ROUTES_SUCCESS,
  GET_BASIC_USER_ROUTES_FAILURE,
  basicUserStateKey
} from "../actions/getRoutesByBasicUserId";
import { LIKE_ROUTE_SUCCESS } from "../../HomeScreenList/actions/likeRoute";
import { DISLIKE_ROUTE_SUCCESS } from "../../HomeScreenList/actions/dislikeRoute";
import { makeContentReducer } from "../../_common/reducers/makeContentReducer";
import {
  makeDisLikeReducer,
  makeLikeReducer
} from "../../HomeScreenList/reducers/homeRoutes";

const types = [
  GET_BASIC_USER_ROUTES_REQUEST,
  GET_BASIC_USER_ROUTES_SUCCESS,
  GET_BASIC_USER_ROUTES_FAILURE
];

const makeBasicUserProfileScreenReducer = makeContentReducer(
  types,
  basicUserStateKey
);

const basicUserProfileScreenReducer = (state = {}, action) => {
  switch (action.type) {
    case LIKE_ROUTE_SUCCESS: {
      // case LIKE_ROUTE_REQUEST: {
      return makeLikeReducer(state, action);
    }
    case DISLIKE_ROUTE_SUCCESS: {
      // case DISLIKE_ROUTE_REQUEST: {

      return makeDisLikeReducer(state, action);
    }

    default:
      return makeBasicUserProfileScreenReducer(state, action);
  }
};
export default basicUserProfileScreenReducer;
