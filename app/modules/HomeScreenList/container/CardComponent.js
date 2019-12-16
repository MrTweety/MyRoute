import React from "react";
import { connect } from "react-redux";
import CardComponent from "../components/CardComponent";

import { likeRoute } from "../actions/likeRoute";
import { dislikeRoute } from "../actions/dislikeRoute";

import { returnUser } from "../../AuthScreens/selectors/user";

const mapStateToProps = state => ({
  user: returnUser(state)
});

const mapDispatchToProps = {
  likeRoute,
  dislikeRoute
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardComponent);
