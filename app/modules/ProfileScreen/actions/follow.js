import { CALL_API } from "../../../middleware/callApi";

export const FOLLOW_USER_REQUEST = " FOLLOW_USER_REQUEST";
export const FOLLOW_USER_SUCCESS = " FOLLOW_USER_SUCCESS";
export const FOLLOW_USER_FAILURE = " FOLLOW_USER_FAILURE";

export const stateKey = "follow";

export const follow = (bodyParams, actionParams = {}) => {
  return {
    [CALL_API]: {
      types: [FOLLOW_USER_REQUEST, FOLLOW_USER_SUCCESS, FOLLOW_USER_FAILURE],
      endpoint: `/user/follow/${actionParams.userId}`,
      method: "POST",
      actionParams
    }
  };
};
