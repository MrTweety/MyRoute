import React, { Component } from "react";
import { View, StyleSheet, Button, AsyncStorage } from "react-native";

export default function LoginScreen(props) {
  _signInAsync = async () => {
    await AsyncStorage.setItem("userToken", "abc");
    props.navigation.navigate("AppNavigator");
  };

  _SignUp = () => {
    props.navigation.navigate("SignUpScreen");
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Button title="Sign in!" onPress={this._signInAsync} />
      <Button title="SignUp" color="#f194ff" onPress={this._SignUp} />
    </View>
  );
}
