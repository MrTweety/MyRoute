import React from "react";
import { connect } from "react-redux";
import { saveRoute, stateKey } from "../actions/saveRoute";
import saveRouteReducer from "../reducers/saveRoute";
import RecordRoute from "../components/RecordRoute";

import { injectReducer } from "../../../redux/store";

injectReducer(stateKey, saveRouteReducer);

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  saveRoute
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordRoute);
