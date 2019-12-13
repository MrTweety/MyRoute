import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { lightBlue, sadGrey } from "../../../assets/colors";
import { LOGIN_SUCCESS } from "../actions/login";
import { setSaveItem, SAVED_JWT_TOKEN } from "../../../services/secureStorage";
import Logo from "../../_common/components/Logo";

class SignIn extends Component {
  state = {
    login: "",
    password: "",
    buttonDisabled: true
  };

  navigateToLogin = () => {
    this.props.navigation.navigate("Login");
  };

  navigateToMain = () => {
    this.props.navigation.navigate("AppNavigator");
  };

  handleLoginChange = login => {
    this.setState({
      login: login
    });
  };

  handlePasswordChange = password => {
    this.setState({
      password: password
    });
  };

  disableButton = () => {
    const { login, password } = this.state;
    return !(login !== "" && password !== "");
  };

  login = () => {
    this.props
      .login({
        login: this.state.login,
        password: this.state.password
      })
      .then(response => {
        if (response.type === LOGIN_SUCCESS) {
          setSaveItem(SAVED_JWT_TOKEN, response.response.token);
          this.navigateToMain();
        } else {
          console.log("Nie udało się zalogować");
        }
      });
  };

  render() {
    const { t } = this.props;
    return (
      <>
        <View style={styles.container}>
          <Logo position="top" />
          <KeyboardAvoidingView style={styles.form} behavior="padding" enabled>
            <TextInput
              style={styles.inputField}
              placeholder={t("common.login")}
              onChangeText={this.handleLoginChange}
            />
            <TextInput
              style={styles.inputField}
              placeholder={t("common.password")}
              onChangeText={this.handlePasswordChange}
            />
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: this.disableButton() ? sadGrey : lightBlue
                }
              ]}
              onPress={this.login}
              disabled={this.disableButton()}
            >
              <Text>{t("common.signIn")}</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
          <View style={{ marginBottom: 10 }}>
            <Text onPress={this.navigateToLogin}>Nie mam konta</Text>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },
  inputField: {
    height: 40,
    borderColor: "#868686",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 30
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 50
  },
  form: {
    flex: 1,
    justifyContent: "flex-end",
    width: "80%",
    marginBottom: 20
  }
});

export default SignIn;
