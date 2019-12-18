import { CALL_API } from "../../../middleware/callApi";

export const SEARCH_ROUTES_REQUEST = " SEARCH_ROUTES_REQUEST";
export const SEARCH_ROUTES_SUCCESS = " SEARCH_ROUTES_SUCCESS";
export const SEARCH_ROUTES_FAILURE = " SEARCH_ROUTES_FAILURE";

export const stateKey = "searchRoutes";

export const fetchSearchRoutes = () => {
  return {
    [CALL_API]: {
      types: [
        SEARCH_ROUTES_REQUEST,
        SEARCH_ROUTES_SUCCESS,
        SEARCH_ROUTES_FAILURE
      ],
      endpoint: "/routes/search",
      method: "POST"
    }
  };
};
