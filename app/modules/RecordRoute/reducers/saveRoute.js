import {
  SAVE_ROUTE_REQUEST,
  SAVE_ROUTE_SUCCESS,
  SAVE_ROUTE_FAILURE
} from "../actions/saveRoute";

export default saveRouteReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_ROUTE_REQUEST:
    case SAVE_ROUTE_SUCCESS:
    case SAVE_ROUTE_FAILURE: {
      return { ...action };
    }
    default:
      return state;
  }
};
