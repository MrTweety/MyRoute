import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import i18next from "i18next";

class LanguageScreen extends Component {
  state = {
    allLanguages: i18next.languages
  };

  componentDidMount() {
    this.updateTitle();
  }

  componentDidUpdate() {
    this.updateTitle();
  }

  updateTitle() {
    const { getParam, setParams } = this.props.navigation;
    const prevTitle = getParam("title");
    const newTitle = i18next.t("common.Language");

    if (prevTitle !== newTitle) {
      setParams({ title: newTitle });
    }
  }

  changeLanguage(language) {
    i18next
      .changeLanguage(language)
      .then(() => {
        this.updateTitle();
      })
      .catch(error => console.log("Change language error", error));
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <>
          {this.state.allLanguages.map(language => {
            return (
              <View key={language} style={styles.padding}>
                <TouchableOpacity onPress={() => this.changeLanguage(language)}>
                  <Text style={styles.textPrimary}>
                    {i18next.getFixedT(language)(
                      `common.languages.${language}`
                    )}
                  </Text>
                  <Text style={styles.textSecondary}>
                    {i18next.t(`common.languages.${language}`)}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </>
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
  },
  padding: {
    marginLeft: 10,
    marginTop: 12
  }
});

export default LanguageScreen;
