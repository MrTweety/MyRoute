import React, { useState } from "react";
import { AppLoading } from "expo";
import i18n from "i18next";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import {
  StyleSheet,
  StatusBar,
  Platform,
  View,
  KeyboardAvoidingView
} from "react-native";
import { Ionicons, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import ErrorBoundary from "./app/modules/_common/components/ErrorBoundary";
import AppNavigator from "./app/navigation/AppNavigator";
import { getSavedItem, SAVED_LANGUAGE } from "./app/services/secureStorage";

import { Provider } from "react-redux";
import store from "./app/redux/store";
import "./i18n";

// global.XMLHttpRequest = global.originalXMLHttpRequest
//   ? global.originalXMLHttpRequest
//   : global.XMLHttpRequest;
// global.FormData = global.originalFormData
//   ? global.originalFormData
//   : global.FormData;
// global.Blob = global.originalBlob ? global.originalBlob : global.Blob;
// global.FileReader = global.originalFileReader
//   ? global.originalFileReader
//   : global.FileReader;

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  const loading = () => (
    <AppLoading
      startAsync={loadResourcesAsync}
      onError={handleLoadingError}
      onFinish={() => handleFinishLoading(setLoadingComplete)}
    />
  );

  const language = async () => {
    const language = await getSavedItem(SAVED_LANGUAGE);
    if (language !== null) {
      await i18n.changeLanguage(language);
    }
  };

  const renderNavigator = () => (
    <View style={styles.container}>
      {Platform.OS === "ios" && <StatusBar barStyle="default" />}
      <AppNavigator />
    </View>
  );

  const renderLoading = () => {
    language();
    if (!isLoadingComplete && !props.skipLoadingScreen) {
      return loading();
    } else {
      return renderNavigator();
    }
  };
  //TODO: replace KeyboardAvoidingView
  return (
    <Provider store={store}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <ErrorBoundary>{renderLoading()}</ErrorBoundary>
      </KeyboardAvoidingView>
    </Provider>
  );
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
