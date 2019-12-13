import React, { Component } from "react";
import { connect } from "react-redux";
import { View, ActivityIndicator, StatusBar } from "react-native";
import { getSavedItem, SAVED_JWT_TOKEN } from "../services/secureStorage";
import {
  getUserById,
  userStateKey
} from "../modules/AuthScreens/actions/getUserById";
import { injectReducer } from "../redux/store";
import userReducer from "../modules/AuthScreens/reducers/userReducer";

injectReducer(userStateKey, userReducer);

class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = async () => {
    const userToken = await getSavedItem(SAVED_JWT_TOKEN);
    console.log(userToken);
    if (userToken !== null) {
      this.props.getUserById().catch(error => {
        console.log("Get user details error - ", error);
      });
    }
    this.props.navigation.navigate(userToken ? "AppNavigator" : "Auth");
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  getUserById
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadingScreen);
