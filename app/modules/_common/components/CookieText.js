import React from "react";
import { Text } from "react-native";

export function CookieText(props) {
  return <Text {...props} style={[props.style, { fontFamily: "cookie" }]} />;
}
