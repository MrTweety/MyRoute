import { CALL_API } from "../../../middleware/callApi";

export const COMMENTS_REQUEST = " COMMENTS_REQUEST";
export const COMMENTS_SUCCESS = " COMMENTS_SUCCESS";
export const COMMENTS_FAILURE = " COMMENTS_FAILURE";

export const stateKey = "HomeComments";

export const getCommentsByRouteId = bodyParams => {
  return {
    [CALL_API]: {
      types: [COMMENTS_REQUEST, COMMENTS_SUCCESS, COMMENTS_FAILURE],
      endpoint: `/comment/route/${bodyParams.routeId}`,
      method: "GET",
      data: bodyParams
    }
  };
};
