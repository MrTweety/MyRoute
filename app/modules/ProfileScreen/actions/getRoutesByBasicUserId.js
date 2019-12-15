import { CALL_API } from "../../../middleware/callApi";

export const GET_BASIC_USER_ROUTES_REQUEST = "GET_BASIC_USER_ROUTES_REQUEST";
export const GET_BASIC_USER_ROUTES_SUCCESS = "GET_BASIC_USER_ROUTES_SUCCESS";
export const GET_BASIC_USER_ROUTES_FAILURE = "GET_BASIC_USER_ROUTES_FAILURE";

export const basicUserStateKey = "BasicUserRoutes";

export const getRoutesByBasicUserId = userId => {
  return {
    [CALL_API]: {
      types: [
        GET_BASIC_USER_ROUTES_REQUEST,
        GET_BASIC_USER_ROUTES_SUCCESS,
        GET_BASIC_USER_ROUTES_FAILURE
      ],
      endpoint: "/routes/userRoutes/" + userId,
      method: "GET"
    }
  };
};
