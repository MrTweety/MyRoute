import React from "react";
import { connect } from "react-redux";
import { logout } from "../actions/logout";
import LogOut from "../components/LogOut";
import { withNavigation } from "react-navigation";
import { withTranslation } from "react-i18next";

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  logout
};

export default withTranslation()(
  withNavigation(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(LogOut)
  )
);
