import React from "react";
import { connect } from "react-redux";
import ProfileScreen from "../components/ProfileScreen";
import { getRoutesByUserId, stateKey } from "../actions/getRoutesByUserId";
import { injectReducer } from "../../../redux/store";
import profileScreenReducer from "../reducers/profileScreen";
import { withTranslation } from "react-i18next";
import { withNavigation } from "react-navigation";

injectReducer(stateKey, profileScreenReducer);

const mapStateToProps = state => {
  return {
    userRoutes: state[stateKey].data
  };
};

const mapDispatchToProps = dispatch => ({
  getRoutes: userId => dispatch(getRoutesByUserId(userId))
});

export default withTranslation()(
  withNavigation(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(ProfileScreen)
  )
);
