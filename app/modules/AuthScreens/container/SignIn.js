import React from "react";
import { connect } from "react-redux";
import { login } from "../actions/login";
import SignIn from "../components/SignIn";
import { withTranslation } from "react-i18next";
import { withNavigation } from "react-navigation";

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  login
};

export default withTranslation()(
  withNavigation(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(SignIn)
  )
);
