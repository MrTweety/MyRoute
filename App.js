import React, { Component, useState } from "react";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { StyleSheet, StatusBar, Platform, View } from "react-native";
import { Ionicons, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

import AppNavigator from "./app/navigation/AppNavigator";

import { Provider } from "react-redux";
import { initStore } from "./app/redux/store";

const store = initStore();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  const renderLoading = () => (
    <AppLoading
      startAsync={loadResourcesAsync}
      onError={handleLoadingError}
      onFinish={() => handleFinishLoading(setLoadingComplete)}
    />
  );

  const renderNavigator = () => (
    <View style={styles.container}>
      {Platform.OS === "ios" && <StatusBar barStyle="default" />}
      <AppNavigator />
    </View>
  );

  const renderLoadingg = () => {
    if (!isLoadingComplete && !props.skipLoadingScreen) {
      return renderLoading();
    } else {
      return renderNavigator();
    }
  };
  return <Provider store={store}>{renderLoadingg()}</Provider>;
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([require("./app/assets/images/road.jpg")]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      ...Entypo.font,
      ...MaterialCommunityIcons.font,
      // We include "cookie" because we use it in HomeScreenStack.
      cookie: require("./app/assets/fonts/Cookie-Regular.ttf")
    })
  ]);
}

function handleLoadingError(error) {
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
