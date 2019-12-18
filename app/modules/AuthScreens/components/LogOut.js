import React, { Component } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import {
  deleteSavedItem,
  getSavedItem,
  SAVED_JWT_TOKEN
} from "../../../services/secureStorage";
import { LOGOUT_SUCCESS } from "../actions/logout";

class LogOut extends Component {
  logOut = async () => {
    const token = await getSavedItem(SAVED_JWT_TOKEN);

    this.props
      .logout({
        token: token
      })
      .then(response => {
        if (response.type === LOGOUT_SUCCESS) {
          console.log("logout");
          deleteSavedItem(SAVED_JWT_TOKEN);
          this.props.navigation.navigate("Auth");
        }
      });
  };

  render() {
    const { t } = this.props;
    return (
      <View>
        <Text style={styles.textPrimary}>{t("common.logOptions")}</Text>
        <View style={{ marginTop: 5 }}>
          <TouchableOpacity onPress={this.logOut}>
            <Text style={styles.textSecondary}>{t("common.logOut")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textPrimary: {
    fontSize: 18,
    justifyContent: "flex-start",
    fontWeight: "bold",
    color: "#000000"
  },
  textSecondary: {
    fontSize: 16,
    justifyContent: "flex-start",
    fontWeight: "normal",
    color: "#808080"
  }
});

export default LogOut;
