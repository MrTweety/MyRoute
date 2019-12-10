import React from "react";
import { connect } from "react-redux";
import { getHeatMap, stateKey } from "../actions/getHeatMap";
// import saveRouteReducer from "../reducers/saveRoute";
import HeatMap from "../components/HeatMap";
import { withTranslation } from "react-i18next";

// import { injectReducer } from "../../../redux/store";

// injectReducer(stateKey, saveRouteReducer);

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  getHeatMap
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HeatMap)
);
