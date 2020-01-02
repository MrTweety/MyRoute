import {
  SEARCH_ROUTES_REQUEST,
  SEARCH_ROUTES_SUCCESS,
  SEARCH_ROUTES_FAILURE,
  stateKey
} from "../actions/searchRoute";
import { makeContentReducer } from "../../_common/reducers/makeContentReducer";
import { LIKE_ROUTE_SUCCESS, LIKE_ROUTE_REQUEST } from "../actions/likeRoute";
import {
  DISLIKE_ROUTE_SUCCESS,
  DISLIKE_ROUTE_REQUEST
} from "../actions/dislikeRoute";

const types = [
  SEARCH_ROUTES_REQUEST,
  SEARCH_ROUTES_SUCCESS,
  SEARCH_ROUTES_FAILURE
];

const makeSearchRoutesReducer = makeContentReducer(types, stateKey);

export const makeLikeReducer = (state, action) => {
  if (!state || !state.data) {
    return state;
  }
  if (action.type !== LIKE_ROUTE_SUCCESS) {
    return state;
  }

  const stateData = state.data.map(route => {
    if (route._id === action.actionParams.routeId) {
      const likes = route.likes;
      likes.push(action.userId);

      return { ...route, likes };
    } else {
      return route;
    }
  });
  return { ...state, data: [...stateData.reverse()] };
};

export const makeDisLikeReducer = (state, action) => {
  if (!state || !state.data) {
    return state;
  }
  if (action.type !== DISLIKE_ROUTE_SUCCESS) {
    return state;
  }

  const stateData = state.data.map(route => {
    if (route._id === action.actionParams.routeId) {
      const likes = route.likes;
      const newLikes = likes.filter(user => user !== action.userId);
      return { ...route, likes: newLikes };
    } else {
      return route;
    }
  });
  return { ...state, data: [...stateData.reverse()] };
};

const searchRoutesReducer = (state = {}, action) => {
  switch (action.type) {
    case LIKE_ROUTE_SUCCESS:
    case LIKE_ROUTE_REQUEST: {
      return makeLikeReducer(state, action);
    }
    case DISLIKE_ROUTE_SUCCESS:
    case DISLIKE_ROUTE_REQUEST: {
      return makeDisLikeReducer(state, action);
    }

    default:
      return makeSearchRoutesReducer(state, action);
  }
};
export default searchRoutesReducer;
