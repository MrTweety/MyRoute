import { createStackNavigator } from "react-navigation-stack";

import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import SignInScreen from "../screens/SignInScreen";

const AuthStackNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      path: ""
      // navigationOptions: () => ({
      //     header:null,
      // }),
    },
    SignUp: {
      screen: SignUpScreen,
      path: ""
    },
    SignIn: {
      screen: SignInScreen,
      path: ""
    }
  },
  {
    headerMode: "none"
  }
);

export default AuthStackNavigator;
