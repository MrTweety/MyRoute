import React from "react";
import { connect } from "react-redux";
import CommentList from "../components/CommentList";
import { withTranslation } from "react-i18next";

// import { injectReducer } from "../../../redux/store";

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CommentList)
);
