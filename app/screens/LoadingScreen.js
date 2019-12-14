import React, { Component } from "react";
import { connect } from "react-redux";
import { View, ActivityIndicator, StatusBar } from "react-native";
import { getSavedItem, SAVED_JWT_TOKEN } from "../services/secureStorage";
import {
  getUserById,
  userStateKey
} from "../modules/AuthScreens/actions/getUserById";
import { returnUser } from "../modules/AuthScreens/selectors/user";
import { injectReducer } from "../redux/store";
import userReducer from "../modules/AuthScreens/reducers/userReducer";

injectReducer(userStateKey, userReducer);

class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  componentDidUpdate() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = async () => {
    const userToken = await getSavedItem(SAVED_JWT_TOKEN);
    const { user } = this.props;
    console.log(userToken);
    if (userToken !== null) {
      if (user) {
        return this.props.navigation.navigate("AppNavigator");
      }
      if (user === undefined) {
        return this.props.getUserById();
      }
      if (user === false) {
        //TODO:
        return this.props.getUserById();
      }
      if (user === null) {
        return;
      }

      // this.props.navigation.navigate("AppNavigator");
    } else {
      return this.props.navigation.navigate("Auth");
    }
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
  return {
    user: returnUser(state)
  };
};

const mapDispatchToProps = {
  getUserById
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadingScreen);
