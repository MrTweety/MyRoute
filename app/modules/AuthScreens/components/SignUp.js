import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import Logo from "../../_common/components/Logo";

class SignUp extends Component {
  state = {
    isLogoVisible: true,
    login: "",
    password: "",
    name: "",
    email: ""
  };

  navigateToLogin() {
    this.props.navigation.navigate("SignUp");
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
      isLogoVisible: false
    });
  };

  showLogo = () => {
    this.setState({
      isLogoVisible: true
    });
  };

  render() {
    console.log(this.props.navigation);
    const formData = [
      {
        onChangeText: this.handleEmailChange,
        placeholder: "email"
      },
      {
        onChangeText: this.handleNameChange,
        placeholder: "Name"
      },
      {
        onChangeText: this.handleLoginChange,
        placeholder: "Login"
      },
      {
        onChangeText: this.handlePasswordChange,
        placeholder: "Hasło"
      }
    ];

    const { t } = this.props;
    return (
      <>
        <View style={styles.container}>
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
            <TouchableOpacity style={styles.button} onPress={this.login}>
              <Text>{t("common.signIn")}</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
          <Text onPress={this.navigateToLogin}>Juz mam konto</Text>
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
    marginBottom: 20,
    marginTop: 30
  }
});

export default SignUp;
