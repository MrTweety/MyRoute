import { StyleSheet, View } from "react-native";
import React from "react";
import Icon from "./Icon";
import { CookieText } from "./CookieText";

const Logo = ({ position }) => {
  const positions = ["center", "top"];
  return (
    <>
      <View
        style={position === positions[0] ? styles.logoCenter : styles.logoTop}
      >
        <Icon type="font-awesome" name="location-arrow" size={60} />
        <CookieText
          style={{
            fontSize: 60,
            paddingLeft: 0,
            margin: 0
          }}
        >
          My Route
        </CookieText>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  logoCenter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50
  },
  logoTop: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  }
});

export default Logo;
