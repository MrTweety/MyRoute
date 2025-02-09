import { CALL_API } from "../../../middleware/callApi";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const stateKey = "login";

export const login = bodyParams => {
  return {
    [CALL_API]: {
      types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
      endpoint: "/user/login",
      method: "POST",
      data: bodyParams
    }
  };
};
