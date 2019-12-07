import {
  HOME_ROUTES_REQUEST,
  HOME_ROUTES_SUCCESS,
  HOME_ROUTES_FAILURE,
  stateKey
} from "../actions/homeRoutes";
import { makeContentReducer } from "../../_common/reducers/makeContentReducer";

const types = [HOME_ROUTES_REQUEST, HOME_ROUTES_SUCCESS, HOME_ROUTES_FAILURE];

export default homeRoutesReducer = makeContentReducer(types, stateKey);
