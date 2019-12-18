import {
  GET_USER_ROUTES_REQUEST,
  GET_USER_ROUTES_SUCCESS,
  GET_USER_ROUTES_FAILURE,
  stateKey
} from "../actions/getRoutesByUserId";
import { DISLIKE_ROUTE_SUCCESS } from "../../HomeScreenList/actions/dislikeRoute";
import { LIKE_ROUTE_SUCCESS } from "../../HomeScreenList/actions/likeRoute";
import { makeContentReducer } from "../../_common/reducers/makeContentReducer";
import {
  makeDisLikeReducer,
  makeLikeReducer
} from "../../HomeScreenList/reducers/homeRoutes";

const types = [
  GET_USER_ROUTES_REQUEST,
  GET_USER_ROUTES_SUCCESS,
  GET_USER_ROUTES_FAILURE
];

const makeProfileScreenReducer = makeContentReducer(types, stateKey);

export default profileScreenReducer = (state = {}, action) => {
  switch (action.type) {
    case LIKE_ROUTE_SUCCESS: {
      return makeLikeReducer(state, action);
    }

    case DISLIKE_ROUTE_SUCCESS: {
      return makeDisLikeReducer(state, action);
    }

    default:
      return makeProfileScreenReducer(state, action);
  }
};
