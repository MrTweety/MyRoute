import { stateKey } from "../actions/homeRoutes";
export const homeRoutesSelector = state => {
  return state.homeRoutes.data
    ? state.homeRoutes.data.reverse()
    : state.homeRoutes.data;
};
