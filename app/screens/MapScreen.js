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
        <Text style={{ color: "black" }}>This is the MapScreen</Text>
      </View>
    );
  }
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
