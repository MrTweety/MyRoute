import { CALL_API } from "../../../middleware/callApi";

export const SAVE_ROUTE_REQUEST = "SAVE_ROUTE_REQUEST";
export const SAVE_ROUTE_SUCCESS = "SAVE_ROUTE_SUCCESS";
export const SAVE_ROUTE_FAILURE = "SAVE_ROUTE_FAILURE";

export const stateKey = "saveRoute";

export const saveRoute = bodyParams => {
  return {
    [CALL_API]: {
      types: [SAVE_ROUTE_REQUEST, SAVE_ROUTE_SUCCESS, SAVE_ROUTE_FAILURE],
      endpoint: "/routes",
      method: "POST",
      data: bodyParams,
      headers: {
        "Content-Type": "application/json"
      }
    }
  };
};
