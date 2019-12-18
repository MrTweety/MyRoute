import React from "react";
import { connect } from "react-redux";
import { fetchSearchRoutes, stateKey } from "../actions/searchRoute";
import searchRoutesReducer from "../reducers/searchRoutes";
import HomeScreenList from "../components/HomeScreenList";
import { searchRoutesSelector } from "../selectors/searchRoutes";

import { injectReducer } from "../../../redux/store";

injectReducer(stateKey, searchRoutesReducer);

const mapStateToProps = state => ({
  homeRoutes: searchRoutesSelector(state)
});

const mapDispatchToProps = dispatch => ({
  fetchRoutes: () => dispatch(fetchSearchRoutes())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreenList);
