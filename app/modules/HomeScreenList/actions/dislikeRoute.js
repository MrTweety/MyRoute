import { CALL_API } from "../../../middleware/callApi";

export const DISLIKE_ROUTE_REQUEST = " DISLIKE_ROUTE_REQUEST";
export const DISLIKE_ROUTE_SUCCESS = " DISLIKE_ROUTE_SUCCESS";
export const DISLIKE_ROUTE_FAILURE = " DISLIKE_ROUTE_FAILURE";

export const stateKey = "likeRoute";

export const dislikeRoute = (bodyParams, actionParams = {}) => {
  return {
    [CALL_API]: {
      types: [
        DISLIKE_ROUTE_REQUEST,
        DISLIKE_ROUTE_SUCCESS,
        DISLIKE_ROUTE_FAILURE
      ],
      endpoint: `/routes/dislike/${actionParams.routeId}`,
      method: "POST",
      data: bodyParams,
      actionParams
    }
  };
};
