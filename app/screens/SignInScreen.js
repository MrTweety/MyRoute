import React, { Component } from "react";
import SignIn from "../modules/AuthScreens/container/SignIn";

class SignInScreen extends Component {
  componentDidMount() {}

  render() {
    return (
      <>
        <SignIn navigation={this.props.navigation} />
      </>
    );
  }
}

export default SignInScreen;
