import { CALL_API } from "../../../middleware/callApi";

export const GET_USER_ROUTES_REQUEST = "GET_USER_ROUTES_REQUEST";
export const GET_USER_ROUTES_SUCCESS = "GET_USER_ROUTES_SUCCESS";
export const GET_USER_ROUTES_FAILURE = "GET_USER_ROUTES_FAILURE";

export const stateKey = "UserRoutes";
export const basicUserStateKey = "BasicUserRoutes";

export const getRoutesByUserId = userId => {
  return {
    [CALL_API]: {
      types: [
        GET_USER_ROUTES_REQUEST,
        GET_USER_ROUTES_SUCCESS,
        GET_USER_ROUTES_FAILURE
      ],
      endpoint: "/routes/userRoutes/" + userId,
      method: "GET"
    }
  };
};
