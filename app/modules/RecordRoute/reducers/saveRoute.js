import {
  SAVE_ROUTE_REQUEST,
  SAVE_ROUTE_SUCCESS,
  SAVE_ROUTE_FAILURE,
  stateKey
} from "../actions/saveRoute";
import { makeContentReducer } from "../../_common/reducers/makeContentReducer";

const types = [SAVE_ROUTE_REQUEST, SAVE_ROUTE_SUCCESS, SAVE_ROUTE_FAILURE];

export default saveRouteReducer = makeContentReducer(types, stateKey);
// export default saveRouteReducer = (state = {}, action) => {
//   switch (action.type) {
//     case SAVE_ROUTE_REQUEST:
//     case SAVE_ROUTE_SUCCESS:
//     case SAVE_ROUTE_FAILURE: {
//       return { ...action };
//     }
//     default:
//       return state;
//   }
// };
