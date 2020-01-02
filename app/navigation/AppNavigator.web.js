import { createBrowserApp } from "@react-navigation/web";
import { createSwitchNavigator } from "react-navigation";

import AuthStackNavigator from "./AuthNavigator";
import MainTabNavigator from "./MainTabNavigator.web";
import LoadingScreen from "../screens/LoadingScreen";

const switchNavigator = createSwitchNavigator(
  {
    AuthLoading: LoadingScreen,
    AppNavigator: MainTabNavigator,
    Auth: AuthStackNavigator
  },
  {
    initialRouteName: "AuthLoading"
  }
);
switchNavigator.path = "";

export default createBrowserApp(switchNavigator, { history: "hash" });
