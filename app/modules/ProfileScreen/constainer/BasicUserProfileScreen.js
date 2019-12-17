import React from "react";
import { connect } from "react-redux";
import ProfileScreen from "../components/ProfileScreen";
import {
  getRoutesByBasicUserId,
  basicUserStateKey
} from "../actions/getRoutesByBasicUserId";
import { injectReducer } from "../../../redux/store";
import basicUserProfileScreenReducer from "../reducers/basicUserProfileScreen";
import { withTranslation } from "react-i18next";
import { withNavigation } from "react-navigation";
import { returnUser } from "../../AuthScreens/selectors/user";

injectReducer(basicUserStateKey, basicUserProfileScreenReducer);

const mapStateToProps = state => {
  return {
    userRoutes: state[basicUserStateKey].data
  };
};

const mapDispatchToProps = dispatch => ({
  getRoutes: userId => dispatch(getRoutesByBasicUserId(userId))
});

export default withTranslation()(
  withNavigation(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(ProfileScreen)
  )
);
