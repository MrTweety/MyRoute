import React, { Component } from "react";
import { Text, StyleSheet, View, Button } from "react-native";

class MapScreen extends Component {
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
        <Text style={{ color: "black" }}>This is the MapScreen</Text>
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate("AuthLoading");
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };
}

export default MapScreen;

const styles = StyleSheet.create({
  mytext: {
    // textAlign: 'center',
    padding: 10,
    fontSize: 16,
    textShadowColor: "black",
    color: "white",
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 6
  }
});
