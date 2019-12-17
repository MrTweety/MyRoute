import React from "react";
import { connect } from "react-redux";
import Follows from "../components/Follows";
import { withTranslation } from "react-i18next";
import { returnUser } from "../../AuthScreens/selectors/user";
import { follow } from "../actions/follow";
import { unFollow } from "../actions/unFollow";

const mapStateToProps = state => {
  return {
    currentUser: returnUser(state)
  };
};

const mapDispatchToProps = {
  follow,
  unFollow
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Follows)
);
