import {
  SAVE_ROUTE_REQUEST,
  SAVE_ROUTE_SUCCESS,
  SAVE_ROUTE_FAILURE,
  stateKey
} from "../actions/saveRoute";
import { makeContentReducer } from "../../_common/reducers/makeContentReducer";

const types = [SAVE_ROUTE_REQUEST, SAVE_ROUTE_SUCCESS, SAVE_ROUTE_FAILURE];

export default saveRouteReducer = makeContentReducer(types, stateKey);
