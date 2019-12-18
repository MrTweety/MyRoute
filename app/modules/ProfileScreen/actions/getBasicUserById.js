import { CALL_API } from "../../../middleware/callApi";

export const GET_BASIC_USER_REQUEST = "GET_BASIC_USER_REQUEST";
export const GET_BASIC_USER_SUCCESS = "GET_BASIC_USER_SUCCESS";
export const GET_BASIC_USER_FAILURE = "GET_BASIC_USER_FAILURE";

export const basicUserstateKey = "BasicUser";

export const getBasicUserById = userId => {
  return {
    [CALL_API]: {
      types: [
        GET_BASIC_USER_REQUEST,
        GET_BASIC_USER_SUCCESS,
        GET_BASIC_USER_FAILURE
      ],
      endpoint: "/user/" + userId,
      method: "GET"
    }
  };
};
