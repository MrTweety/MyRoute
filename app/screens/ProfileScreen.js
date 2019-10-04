import React, { Component } from "react";
import { View, Text, Button, AsyncStorage } from "react-native";

class ProfileScreen extends Component {
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

  _showMoreApp = () => {
    this.props.navigation.navigate("Other");
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };
}

export default ProfileScreen;
