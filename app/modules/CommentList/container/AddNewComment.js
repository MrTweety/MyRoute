import React from "react";
import { connect } from "react-redux";
import AddNewComment from "../components/AddNewComment";
import { withTranslation } from "react-i18next";
import { addComment, stateKey } from "../actions/addComment";
import addCommentReducer from "../reducers/addComment";
import { injectReducer } from "../../../redux/store";
import { returnUser } from "../../AuthScreens/selectors/user";
import { getCommentsByRouteId } from "../actions/getCommentsByRouteId";

injectReducer(stateKey, addCommentReducer);

const mapStateToProps = state => {
  return {
    status: state[stateKey].data,
    user: returnUser(state)
  };
};

const mapDispatchToProps = { addComment };

// const mapDispatchToProps = (dispatch,ownProps) => ({
//   addComment: bodyParams => dispatch(addComment({...bodyParams,author: ownProps.routeId}))
//   });

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddNewComment)
);
