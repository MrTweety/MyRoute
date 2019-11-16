import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import i18next from "i18next";

class LanguageScreen extends Component {
  state = {
    currentLanguage: i18next.language,
    allLanguages: i18next.languages
  };

  changeLanguage(language) {
    i18next
      .changeLanguage(language)
      .then(() => {
        this.setState({
          currentLanguage: language
        });
      })
      .catch(error => console.log("Change language error", error));
  }

  render() {
    const en = i18next.getFixedT("en");
    return (
      <View style={{ flex: 1 }}>
        <Text>This is the LanguageScreen</Text>
        <Text>Current language: {this.state.currentLanguage}</Text> //to do
        wyjebania, narazie jest do testów
        <Text>available languages: {this.state.allLanguages}</Text>
        <>
          {this.state.allLanguages.map(language => {
            return (
              <View key={language} style={styles.padding}>
                <TouchableOpacity onPress={() => this.changeLanguage(language)}>
                  <Text style={styles.textPrimary}>
                    {en(`common.languages.${language}`)}
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
    fontSize: 17,
    justifyContent: "flex-start",
    fontWeight: "bold",
    color: "#000000"
  },
  textSecondary: {
    fontSize: 15,
    justifyContent: "flex-start",
    fontWeight: "normal",
    color: "#808080"
  },
  padding: {
    marginLeft: 8,
    marginTop: 12
  }
});

export default LanguageScreen;
