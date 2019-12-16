import {
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  stateKey
} from "../actions/addComment";
import { makeContentReducer } from "../../_common/reducers/makeContentReducer";

const types = [ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE];

export default addCommentReducer = makeContentReducer(types, stateKey);
