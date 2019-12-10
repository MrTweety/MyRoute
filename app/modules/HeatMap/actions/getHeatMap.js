import { CALL_API } from "../../../middleware/callApi";

export const GET_HEAT_MAP_REQUEST = "GET_HEAT_MAP_REQUEST";
export const GET_HEAT_MAP_SUCCESS = "GET_HEAT_MAP_SUCCESS";
export const GET_HEAT_MAP_FAILURE = "GET_HEAT_MAP_FAILURE";

export const stateKey = "getHeatMap";

export const getHeatMap = bodyParams => {
  return {
    [CALL_API]: {
      types: [GET_HEAT_MAP_REQUEST, GET_HEAT_MAP_SUCCESS, GET_HEAT_MAP_FAILURE],
      endpoint: "/routes/heatMap",
      method: "GET",
      data: bodyParams
    }
  };
};
