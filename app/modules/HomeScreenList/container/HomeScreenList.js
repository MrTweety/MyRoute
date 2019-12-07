import React from "react";
import { connect } from "react-redux";
import { fetchRoutes, stateKey } from "../actions/homeRoutes";
import homeRoutesReducer from "../reducers/homeRoutes";
import HomeScreenList from "../components/HomeScreenList";
import { homeRoutesSelector } from "../selectors/homeRoutes";

import { injectReducer } from "../../../redux/store";

injectReducer(stateKey, homeRoutesReducer);

const mapStateToProps = state => ({
  homeRoutes: homeRoutesSelector(state)
});

const mapDispatchToProps = dispatch => ({
  fetchRoutes: () => dispatch(fetchRoutes())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreenList);
