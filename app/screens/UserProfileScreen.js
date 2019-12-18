import React, { Component } from "react";
import { connect } from "react-redux";
import BasicUserProfile from "../modules/ProfileScreen/constainer/BasicUserProfileScreen";
import { injectReducer } from "../redux/store";
import {
  basicUserstateKey,
  getBasicUserById
} from "../modules/ProfileScreen/actions/getBasicUserById";
import basicUserReducer from "../modules/ProfileScreen/reducers/basicUser";

injectReducer(basicUserstateKey, basicUserReducer);

class UserProfileScreen extends Component {
  state = {
    readyToRender: false
  };

  componentDidMount() {
    const BasicUserId = this.props.navigation.getParam("id", 0);
    if (this.props.getUser) {
      this.props.getUser(BasicUserId).then(() => {
        this.setState({
          readyToRender: true
        });
      });
    }
  }
  //TODO: user === false
  render() {
    return (
      <>
        {this.state.readyToRender && (
          <>
            <BasicUserProfile user={this.props.user} />
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state[basicUserstateKey].data
  };
};

const mapDispatchToProps = dispatch => ({
  getUser: userId => dispatch(getBasicUserById(userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileScreen);
