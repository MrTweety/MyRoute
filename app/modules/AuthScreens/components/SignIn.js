import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from "react-native";
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

  login = async () => {
    const a = await this.props.login({
      login: this.state.login,
      password: this.state.password
    });
    console.log(a);
  };

  render() {
    const { t } = this.props;
    return (
      <>
        <View style={styles.container}>
          <Logo position="top" />
          <View style={styles.form}>
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
          </View>
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
    justifyContent: "center",
    width: "80%"
  }
});

export default SignIn;
