import { CALL_API } from "../../../middleware/callApi";

export const ADD_COMMENT_REQUEST = " ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = " ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = " ADD_COMMENT_FAILURE";

export const stateKey = "addComment";

export const addComment = bodyParams => {
  return {
    [CALL_API]: {
      types: [ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE],
      endpoint: `/routes/comment/${bodyParams.id}`,
      method: "POST",
      data: bodyParams
    }
  };
};
