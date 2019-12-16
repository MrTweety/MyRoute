import React, { Component } from "react";
import MyProfileScreen from "../modules/ProfileScreen/constainer/MyProfileScreen";
import { userStateKey } from "../modules/AuthScreens/actions/getUserById";
import { connect } from "react-redux";

class ProfileScreen extends Component {
  render() {
    return (
      <>
        <MyProfileScreen user={this.props.user} />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state[userStateKey].data
  };
};

export default connect(mapStateToProps)(ProfileScreen);
