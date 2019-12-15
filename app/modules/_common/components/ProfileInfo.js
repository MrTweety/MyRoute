import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { withTranslation } from "react-i18next";

class ProfileInfo extends Component {
  render() {
    const { t } = this.props;
    return (
      <View style={styles.userBar}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Image
              style={styles.userPic}
              source={{
                uri: "https://www.w3schools.com/howto/img_avatar2.png"
              }}
            />

            <View
              style={[styles.item, { flexDirection: "column", marginTop: 5 }]}
            >
              <Text style={styles.textPrimary}>
                {this.props.userName || "brunnett"}
              </Text>
              <Text style={styles.textSecondary}>Kraków</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              marginLeft: 10
            }}
          >
            <View style={styles.item}>
              <Text style={styles.textPrimary}>{t("profile.routes")}</Text>
              <Text style={styles.textSecondary}>
                {this.props.routesNumber}
              </Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.textPrimary}>{t("profile.follows")}</Text>
              <Text style={styles.textSecondary}>
                {this.props.folowersNumber}
              </Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.textPrimary}>{t("profile.followedBy")}</Text>
              <Text style={styles.textSecondary}>
                {this.props.folowedByNumber}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default withTranslation()(ProfileInfo);

const styles = StyleSheet.create({
  userBar: {
    marginTop: 8,
    height: 140,
    marginHorizontal: 10,
    borderBottomColor: "grey",
    alignItems: "flex-start"
  },
  userPic: {
    width: 80,
    height: 80,
    borderRadius: 40
  },
  item: {
    flexDirection: "row",
    marginTop: 2,
    justifyContent: "center",
    marginRight: 10,
    alignItems: "center"
  },
  textPrimary: {
    fontSize: 16,
    justifyContent: "flex-start",
    fontWeight: "bold",
    color: "#000000"
  },
  textSecondary: {
    fontSize: 14,
    justifyContent: "flex-start",
    fontWeight: "normal",
    color: "#808080"
  }
});
