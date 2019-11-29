import React from "react";
import { connect } from "react-redux";
import CommentList from "../components/CommentList";
import { withTranslation } from "react-i18next";
import { addComment, stateKey } from "../actions/addComment";
import addCommentReducer from "../reducers/addComment";
import { injectReducer } from "../../../redux/store";

injectReducer(stateKey, addCommentReducer);

//TODO: comment get from state
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = { addComment };

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CommentList)
);
