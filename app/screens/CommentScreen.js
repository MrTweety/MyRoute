import React, { Component } from "react";
import { View, Text } from "react-native";

export default class CommentScreen extends Component {
  render() {
    const { navigation } = this.props;
    const routeId = navigation.getParam("_id", 0);
    const comments = navigation.getParam("comments", []);
    const description = navigation.getParam("description", "");

    if (!routeId) {
      navigation.navigate("HomeStack");
    }

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", paddingBottom: 20 }}>
          {routeId}
        </Text>
      </View>
    );
  }
}
