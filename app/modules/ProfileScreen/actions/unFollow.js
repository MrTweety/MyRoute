import { CALL_API } from "../../../middleware/callApi";

export const UNFOLLOW_USER_REQUEST = " UNFOLLOW_USER_REQUEST";
export const UNFOLLOW_USER_SUCCESS = " UNFOLLOW_USER_SUCCESS";
export const UNFOLLOW_USER_FAILURE = " UNFOLLOW_USER_FAILURE";

export const stateKey = "unFollow";

export const unFollow = (bodyParams, actionParams = {}) => {
  return {
    [CALL_API]: {
      types: [
        UNFOLLOW_USER_REQUEST,
        UNFOLLOW_USER_SUCCESS,
        UNFOLLOW_USER_FAILURE
      ],
      endpoint: `/user/unfollow/${actionParams.userId}`,
      method: "POST",
      actionParams
    }
  };
};
