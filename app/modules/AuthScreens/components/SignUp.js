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
import Logo from "../../_common/components/Logo";
import { REGISTER_SUCCESS } from "../actions/register";
import { setSaveItem, SAVED_JWT_TOKEN } from "../../../services/secureStorage";

class SignUp extends Component {
  state = {
    isLogoVisible: true,
    registerState: "",
    login: "",
    password: "",
    name: "",
    email: ""
  };

  navigateToSignIn = () => {
    this.props.navigation.navigate("SignIn");
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

  handleNameChange = name => {
    this.setState({
      name: name
    });
  };

  handleEmailChange = email => {
    this.setState({
      email: email
    });
  };

  hideLogo = () => {
    this.setState({
      isLogoVisible: false,
      registerState: ""
    });
  };

  showLogo = () => {
    this.setState({
      isLogoVisible: true
    });
  };

  disableButton = () => {
    const { login, password, email, name } = this.state;
    return !(login !== "" && password !== "" && email !== "" && name !== "");
  };

  register = () => {
    this.props
      .register({
        login: this.state.login,
        password: this.state.password,
        name: this.state.name,
        mail: this.state.email
      })
      .then(response => {
        console.log(response);
        if (response.type !== REGISTER_SUCCESS) {
          this.setState({
            registerState: response.message
          });
        } else {
          setSaveItem(SAVED_JWT_TOKEN, response.response.token);
          this.props.navigation.navigate("AppNavigator");
        }
      });
  };

  render() {
    const { t } = this.props;

    const formData = [
      {
        onChangeText: this.handleEmailChange,
        placeholder: t("common.email")
      },
      {
        onChangeText: this.handleNameChange,
        placeholder: t("common.name")
      },
      {
        onChangeText: this.handleLoginChange,
        placeholder: t("common.login")
      },
      {
        onChangeText: this.handlePasswordChange,
        placeholder: t("common.password")
      }
    ];

    return (
      <>
        <View style={styles.container}>
          {this.state.registerState.length !== 0 && (
            <View>
              <Text>{this.state.registerState}</Text>
            </View>
          )}
          {this.state.isLogoVisible && <Logo position="top" />}
          <KeyboardAvoidingView style={styles.form} behavior="padding" enabled>
            {formData.map(data => (
              <TextInput
                key={data.placeholder}
                style={styles.inputField}
                placeholder={data.placeholder}
                onChangeText={data.onChangeText}
                onFocus={this.hideLogo}
                onSubmitEditing={this.showLogo}
              />
            ))}
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: this.disableButton() ? sadGrey : lightBlue
                }
              ]}
              onPress={this.register}
              disabled={this.disableButton()}
            >
              <Text>{t("common.signUp")}</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
          <View style={{ marginBottom: 10 }}>
            <Text onPress={this.navigateToSignIn}>Juz mam konto</Text>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: lightBlue,
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
    marginBottom: 20,
    marginTop: 30
  }
});

export default SignUp;
