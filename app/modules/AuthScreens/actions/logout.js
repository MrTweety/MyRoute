import { CALL_API } from "../../../middleware/callApi";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const stateKey = "logout";

export const logout = bodyParams => {
  return {
    [CALL_API]: {
      types: [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE],
      endpoint: "/user/logout",
      method: "POST",
      data: bodyParams
    }
  };
};
