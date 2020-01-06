import {
  GET_USER_ROUTES_REQUEST,
  GET_USER_ROUTES_SUCCESS,
  GET_USER_ROUTES_FAILURE,
  stateKey
} from "../actions/getRoutesByUserId";
import { SAVE_ROUTE_SUCCESS } from "../../RecordRoute/actions/saveRoute";
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

const profileScreenReducer = (state = {}, action) => {
  switch (action.type) {
    case LIKE_ROUTE_SUCCESS: {
      return makeLikeReducer(state, action);
    }

    case DISLIKE_ROUTE_SUCCESS: {
      return makeDisLikeReducer(state, action);
    }

    case SAVE_ROUTE_SUCCESS: {
      // const a = state[stateKey];
      // b.data.push({...action.response, author:{_id:"test", name:"test"}});
      // console.log("MG-log: defaultcommentListReducer -> b.data", b.data);
      // let newArray = b.data.slice()
      // newArray.splice(0 || b.data.length, 0, action.item)

      console.log("aa ", action);
      return {
        data: state.data ? [...state.data, action.response] : [action.response]
      };
    }

    default:
      return makeProfileScreenReducer(state, action);
  }
};

export default profileScreenReducer;
