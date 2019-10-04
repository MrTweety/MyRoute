import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";

export default AuthStackNavigator = createStackNavigator(
  {
    SignIn: {
      screen: LoginScreen
      // navigationOptions: () => ({
      //     header:null,
      // }),
    },
    SignUpScreen: { screen: SignUpScreen }
  },
  {
    headerMode: "none"
  }
);
