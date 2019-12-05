import React from "react";
import { connect } from "react-redux";
import { login, stateKey } from "../actions/login";
import signInReducer from "../reducers/SignIn";
import SignIn from "../components/SignIn";
import { withTranslation } from "react-i18next";

import { injectReducer } from "../../../redux/store";

injectReducer(stateKey, signInReducer);

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  login
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignIn)
);