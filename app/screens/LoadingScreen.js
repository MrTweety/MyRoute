import React, { Component } from "react";
import { View, ActivityIndicator, StatusBar } from "react-native";
import { getSavedItem, SAVED_JWT_TOKEN } from "../services/secureStorage";

class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = async () => {
    const userToken = await getSavedItem(SAVED_JWT_TOKEN);
    console.log(userToken);
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

export default LoadingScreen;
