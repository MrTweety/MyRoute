import React, { Component } from "react";
import { View, Text, Button } from "react-native";

class ProfileScreen extends Component {
  _showMoreApp = () => {
    this.props.navigation.navigate("Other");
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
      </View>
    );
  }
}

export default ProfileScreen;
