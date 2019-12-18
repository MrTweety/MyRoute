import React from "react";
import { connect } from "react-redux";
import { saveRoute, stateKey } from "../actions/saveRoute";
import saveRouteReducer from "../reducers/saveRoute";
import RecordRoute from "../components/RecordRoute";
import { withTranslation } from "react-i18next";

import { injectReducer } from "../../../redux/store";
import { withNavigation } from "react-navigation";

injectReducer(stateKey, saveRouteReducer);

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  saveRoute
};

export default withTranslation()(
  withNavigation(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(RecordRoute)
  )
);
