import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { deleteSavedItem, SAVED_JWT_TOKEN } from "../services/secureStorage";

class ProfileScreen extends Component {
  _showMoreApp = () => {
    this.props.navigation.navigate("Other");
  };

  _signOutAsync = async () => {
    deleteSavedItem(SAVED_JWT_TOKEN);
    this.props.navigation.navigate("Auth");
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Button
          title="Show me more of the app"
          color="#f194ff"
          onPress={this._showMoreApp}
        />
        <Text style={{ color: "black" }}>This is the SignUpScreen</Text>
        <Button
          title="Actually, sign me out :)"
          color="#f194ff"
          onPress={this._signOutAsync}
        />
      </View>
    );
  }
}

export default ProfileScreen;
