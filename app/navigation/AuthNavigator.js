import { createStackNavigator } from "react-navigation-stack";

import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import SignInScreen from "../screens/SignInScreen";

const AuthStackNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen
      // navigationOptions: () => ({
      //     header:null,
      // }),
    },
    SignUp: {
      screen: SignUpScreen
    },
    SignIn: {
      screen: SignInScreen
    }
  },
  {
    headerMode: "none"
  }
);

export default AuthStackNavigator;
