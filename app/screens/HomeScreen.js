import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CookieText } from "../components/CookieText";
import { withTranslation } from "react-i18next";

class HomeScreen extends Component {
  render() {
    const { t } = this.props;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            paddingTop: 40,
            height: 30
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", paddingBottom: 20 }}>
            {t("home.welcome")}
          </Text>
          <View style={{ paddingTop: 40 }}>
            <CookieText style={styles.mytext}>
              Our app is created to share your driving licence exams with
              others! Before your exam, simply turn on 'recording route' and put
              your phone into a pocket. After your struggle with examination,
              you can post your route and help other!
            </CookieText>
          </View>
        </View>
      </View>
    );
  }
}

export default withTranslation()(HomeScreen);

const styles = StyleSheet.create({
  mytext: {
    backgroundColor: "grey",
    textAlign: "center",
    padding: 10,
    fontSize: 16,
    textShadowColor: "black",
    color: "white",
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 6
  }
});
