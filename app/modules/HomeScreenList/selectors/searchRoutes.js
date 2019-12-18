import { stateKey } from "../actions/searchRoute";
export const searchRoutesSelector = state => {
  return state.searchRoutes.data
    ? state.searchRoutes.data.reverse()
    : state.searchRoutes.data;
};
