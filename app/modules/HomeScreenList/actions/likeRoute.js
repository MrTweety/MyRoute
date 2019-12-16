import { CALL_API } from "../../../middleware/callApi";

export const LIKE_ROUTE_REQUEST = " LIKE_ROUTE_REQUEST";
export const LIKE_ROUTE_SUCCESS = " LIKE_ROUTE_SUCCESS";
export const LIKE_ROUTE_FAILURE = " LIKE_ROUTE_FAILURE";

export const stateKey = "likeRoute";

export const likeRoute = (bodyParams, actionParams = {}) => {
  return {
    [CALL_API]: {
      types: [LIKE_ROUTE_REQUEST, LIKE_ROUTE_SUCCESS, LIKE_ROUTE_FAILURE],
      endpoint: `/routes/like/${actionParams.routeId}`,
      method: "POST",
      data: bodyParams,
      actionParams
    }
  };
};
