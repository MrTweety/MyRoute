import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Text
} from "react-native";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import Logo from "../modules/_common/components/Logo";

const LoginScreen = ({ navigation, t }) => {
  _signInAsync = async () => {
    await AsyncStorage.setItem("userToken", "abc");
    navigation.navigate("SignInScreen");
  };

  _SignUp = () => {
    navigation.navigate("SignUpScreen");
  };

  return (
    <>
      <Logo position="center" />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button} onPress={this._signInAsync}>
            <Text>{t("common.signIn")}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button} onPress={this._SignUp}>
            <Text>{t("common.signUp")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

LoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: "#7bdaff",
    borderRadius: 10
  },
  buttonWrapper: {
    padding: 10
  }
});

export default withTranslation()(LoginScreen);
