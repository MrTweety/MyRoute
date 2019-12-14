import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setTitle, setText, stateKey } from "../actions/exemplar";
import { exampleReducer } from "../reducers/exemplar";
import Exemplar from "../components/Exemplar";
import { returnUser } from "../../AuthScreens/selectors/user";
import { injectReducer } from "../../../redux/store";

injectReducer(stateKey, exampleReducer);

const mapStateToProps = state => {
  return {
    title: state[stateKey].title,
    text: state[stateKey].text,
    user: returnUser(state)
  };
};

const mapDispatchToProps = dispatch => ({
  setTitle: title => dispatch(setTitle(title)),
  setText: text => dispatch(setText(text))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Exemplar);
