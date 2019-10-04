import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import LoadingScreen from "../screens/LoadingScreen";

import AuthStackNavigator from "./AuthNavigator";
import MainBottomTabNavigator from "./MainTabNavigator";

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: LoadingScreen,
      AppNavigator: MainBottomTabNavigator,
      Auth: AuthStackNavigator
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
