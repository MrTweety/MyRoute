import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { withTranslation } from "react-i18next";
import Follows from "../../ProfileScreen/constainer/Follows";

const ProfileInfo = ({ t, user, routesNumber, textSecondary }) => {
  return (
    <View style={styles.userBar}>
      <View style={{ flexDirection: "row", flex: 1, flexWrap: "wrap" }}>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Image
            style={styles.userPic}
            source={{
              uri: user.avatar
            }}
          />
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
            <Text style={styles.textSecondary}>{routesNumber}</Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.textPrimary}>{t("profile.follows")}</Text>
            <Text style={styles.textSecondary}>{user.followed.length}</Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.textPrimary}>{t("profile.followedBy")}</Text>
            <Text style={styles.textSecondary}>{user.followers.length}</Text>
          </View>
        </View>
        <View
          style={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Follows user={user} />
        </View>
      </View>

      <View style={[styles.item, { flexDirection: "column", marginTop: 5 }]}>
        <Text style={styles.textPrimary}>{user.name}</Text>
        <Text style={styles.textSecondary}>{textSecondary}</Text>
      </View>
    </View>
  );
};

ProfileInfo.defaultProps = {
  textSecondary: null
};

//TODO: propsTypes

export default withTranslation()(ProfileInfo);

const styles = StyleSheet.create({
  userBar: {
    marginTop: 8,
    minHeight: 120,
    marginHorizontal: 10,
    borderBottomColor: "grey",
    alignItems: "flex-start",
    flexDirection: "column"
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
