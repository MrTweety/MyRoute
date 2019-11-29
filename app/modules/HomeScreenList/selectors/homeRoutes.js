import { stateKey } from "../actions/homeRoutes";
export const homeRoutesSelector = state => {
  return state.homeRoutes.data;
};
