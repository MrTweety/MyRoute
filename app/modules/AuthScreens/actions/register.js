import { CALL_API } from "../../../middleware/callApi";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const stateKey = "register";

export const register = bodyParams => {
  return {
    [CALL_API]: {
      types: [REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE],
      endpoint: "/user/createUser",
      method: "POST",
      data: bodyParams
    }
  };
};
