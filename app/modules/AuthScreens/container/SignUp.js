import React from "react";
import { connect } from "react-redux";
import { login, stateKey } from "../actions/login";
// import signInReducer from "../reducers/SignIn";
import SignUp from "../components/SignUp";
import { withTranslation } from "react-i18next";
import { withNavigation } from "react-navigation";

import { injectReducer } from "../../../redux/store";

// injectReducer(stateKey, signInReducer);

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {};

export default withTranslation()(
  withNavigation(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(SignUp)
  )
);
