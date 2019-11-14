import React, { Component } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { CookieText } from "../components/CookieText";
import { Icon } from "../components/Icon";
import CardComponent from "../components/CardComponent";

class HomeScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <CardComponent userName="User1" imageNr={0} />
          <CardComponent heart="heart" imageNr={1} />
          <CardComponent userName="MyRoteSupport" heart="heart" imageNr={2} />
          {/* <CardComponent userName="testMyRote" imageNr={7} /> */}
          {/* <CardComponent imageNr={3} /> */}
          {/* <CardComponent imageNr={1} /> */}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});
