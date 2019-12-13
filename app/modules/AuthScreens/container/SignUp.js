import React from "react";
import { connect } from "react-redux";
import { register } from "../actions/register";
import SignUp from "../components/SignUp";
import { withTranslation } from "react-i18next";
import { withNavigation } from "react-navigation";

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
