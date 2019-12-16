import {
  HOME_ROUTES_REQUEST,
  HOME_ROUTES_SUCCESS,
  HOME_ROUTES_FAILURE,
  stateKey
} from "../actions/homeRoutes";
import { makeContentReducer } from "../../_common/reducers/makeContentReducer";
import { LIKE_ROUTE_SUCCESS, LIKE_ROUTE_REQUEST } from "../actions/likeRoute";
import {
  DISLIKE_ROUTE_SUCCESS,
  DISLIKE_ROUTE_REQUEST
} from "../actions/dislikeRoute";

const types = [HOME_ROUTES_REQUEST, HOME_ROUTES_SUCCESS, HOME_ROUTES_FAILURE];

const makeHomeRoutesReducer = makeContentReducer(types, stateKey);

export default homeRoutesReducer = (state = {}, action) => {
  switch (action.type) {
    case LIKE_ROUTE_SUCCESS: {
      // case LIKE_ROUTE_REQUEST: {

      const stateData = state.data.map(route => {
        if (route._id === action.actionParams.routeId) {
          const likes = route.likes;
          // console.log(likes.length);
          likes.push(action.userId);
          // console.log(likes.length);

          return { ...route, likes };
        } else {
          return route;
        }
      });
      return { ...state, data: [...stateData.reverse()] };
    }
    case DISLIKE_ROUTE_SUCCESS: {
      // case DISLIKE_ROUTE_REQUEST: {

      const stateData = state.data.map(route => {
        if (route._id === action.actionParams.routeId) {
          const likes = route.likes;
          // console.log(likes.length);
          const newLikes = likes.filter(user => user !== action.userId);
          // console.log(newLikes.length);

          return { ...route, likes: newLikes };
        } else {
          return route;
        }
      });
      return { ...state, data: [...stateData.reverse()] };
    }

    default:
      return makeHomeRoutesReducer(state, action);
  }
};
