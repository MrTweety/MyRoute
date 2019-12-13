import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import LogOut from "../modules/AuthScreens/container/LogOut";

class SettingsScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.padding}>
          <LogOut />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  padding: {
    marginLeft: 10,
    marginTop: 12
  }
});

export default SettingsScreen;
