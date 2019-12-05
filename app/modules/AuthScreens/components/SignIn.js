import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { LOGIN_SUCCESS } from "../actions/login";
import { setSaveItem, SAVED_JWT_TOKEN } from "../../../services/secureStorage";
import Logo from "../../_common/components/Logo";

class SignIn extends Component {
  state = {
    login: "",
    password: ""
  };

  wyjdz() {
    this.props.navigation.navigate("AppNavigator");
  }

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

  login = () => {
    this.props
      .login({
        login: this.state.login,
        password: this.state.password
      })
      .then(response => {
        console.log("\n\n\n", response, "\n\n\n");
        if (response.type === LOGIN_SUCCESS) {
          console.log("zalogowano!!!\n\n\n", response.response);
          setSaveItem(SAVED_JWT_TOKEN, response.response.token);
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
              placeholder="Login"
              onChangeText={this.handleLoginChange}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Hasło"
              onChangeText={this.handlePasswordChange}
            />
            <TouchableOpacity style={styles.button} onPress={this.login}>
              <Text>{t("common.signIn")}</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
          <Text onPress={this.wyjdz}>elo</Text>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: "#7bdaff",
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
