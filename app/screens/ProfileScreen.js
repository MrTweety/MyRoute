import React, { Component } from "react";
import MyProfileScreen from "../modules/ProfileScreen/constainer/MyProfileScreen";

class ProfileScreen extends Component {
  render() {
    return <MyProfileScreen user={this.props.user} />;
  }
}

export default ProfileScreen;
