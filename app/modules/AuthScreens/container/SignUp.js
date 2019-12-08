import React from "react";
import { connect } from "react-redux";
import { register, stateKey } from "../actions/register";
import signUpReducer from "../reducers/SignUp";
import SignUp from "../components/SignUp";
import { withTranslation } from "react-i18next";
import { withNavigation } from "react-navigation";

import { injectReducer } from "../../../redux/store";

injectReducer(stateKey, signUpReducer);

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  register
};

export default withTranslation()(
  withNavigation(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(SignUp)
  )
);
