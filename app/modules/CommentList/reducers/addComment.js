import {
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  stateKey
} from "../actions/addComment";
import { makeContentReducer } from "../../_common/reducers/makeContentReducer";

const types = [ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE];

export default addCommentReducer = makeContentReducer(types, stateKey);

// export default saveRouteReducer = (state = {}, action) => {
//   switch (action.type) {
//    case SAVE_ROUTE_REQUEST:
//     case SAVE_ROUTE_SUCCESS:
//     case SAVE_ROUTE_FAILURE: {
//       return { ...action };
//     }
//     default:
//       return state;
//   }
// };
