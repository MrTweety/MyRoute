import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { View, Text } from "react-native";

//Nie trzeba resetować Expo jak coś sie bardzo wysypie :P

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(
      "*******************************************************************"
    );
    console.log(error, info);
    console.log(
      "*******************************************************************"
    );
  }

  render() {
    const { t } = this.props;
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14 }}>{t("common.errorBoundary")}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

export default withTranslation()(ErrorBoundary);
