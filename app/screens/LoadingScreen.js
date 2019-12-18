import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import {
  View,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  Text
} from "react-native";
import ErrorFetchTryAgain from "../modules/_common/components/ErrorFetchTryAgain";
import {
  getSavedItem,
  deleteSavedItem,
  SAVED_JWT_TOKEN,
  setSaveItem
} from "../services/secureStorage";
import {
  getUserById,
  userStateKey
} from "../modules/AuthScreens/actions/getUserById";
import { returnUser } from "../modules/AuthScreens/selectors/user";
import { injectReducer } from "../redux/store";
import userReducer from "../modules/AuthScreens/reducers/userReducer";

injectReducer(userStateKey, userReducer);

class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  componentDidUpdate() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = async () => {
    const userToken = await getSavedItem(SAVED_JWT_TOKEN);
    const { user } = this.props;

    if (userToken !== null) {
      if (user) {
        return this.props.navigation.navigate("AppNavigator");
      }
      if (user === undefined) {
        return this.props.getUserById();
      }
      if (user === false) {
        //TODO:
        return;
        // return this.props.getUserById();
      }
      if (user === null) {
        return;
      }
    } else {
      return this.props.navigation.navigate("Auth");
    }
  };

  render() {
    const { t, user, getUserById } = this.props;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {user !== false ? (
          <ActivityIndicator size="large" />
        ) : (
          <View
            style={{
              flex: 1
            }}
          >
            <ErrorFetchTryAgain fetchData={getUserById} size="large" />
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={async () => {
                await deleteSavedItem(SAVED_JWT_TOKEN);
                this.setState({ a: "a" });
              }}
            >
              <Text>{t("common.logOut")}</Text>
            </TouchableOpacity>
          </View>
        )}
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: returnUser(state)
  };
};

const mapDispatchToProps = {
  getUserById
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoadingScreen)
);
