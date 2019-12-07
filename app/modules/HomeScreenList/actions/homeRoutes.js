import { CALL_API } from "../../../middleware/callApi";

export const HOME_ROUTES_REQUEST = " HOME_ROUTES_REQUEST";
export const HOME_ROUTES_SUCCESS = " HOME_ROUTES_SUCCESS";
export const HOME_ROUTES_FAILURE = " HOME_ROUTES_FAILURE";

export const stateKey = "homeRoutes";

export const fetchRoutes = () => {
  return {
    [CALL_API]: {
      types: [HOME_ROUTES_REQUEST, HOME_ROUTES_SUCCESS, HOME_ROUTES_FAILURE],
      endpoint: "/routes",
      method: "GET"
    }
  };
};
