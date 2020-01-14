import React from "react";
import { connect } from "react-redux";
import CommentList from "../components/CommentList";
import { withTranslation } from "react-i18next";
import {
  getCommentsByRouteId,
  stateKey
} from "../actions/getCommentsByRouteId";

import commentListReducer from "../reducers/commentListReducer";

import { injectReducer } from "../../../redux/store";

injectReducer(stateKey, commentListReducer);

const mapStateToProps = (state, ownProps) => {
  const allComments = state[stateKey];
  return {
    comments: allComments && allComments.data
  };
};

const mapDispatchToProps = { fetchComments: getCommentsByRouteId };

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CommentList)
);
