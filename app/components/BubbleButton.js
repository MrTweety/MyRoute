import React from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewPropTypes
} from "react-native";
import PropTypes from "prop-types";

import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons
} from "@expo/vector-icons";

const getTypeIcon = type => {
  switch (type) {
    case "material":
      return MaterialIcons;
    case "material-community":
      return MaterialCommunityIcons;
    case "ionicons":
      return Ionicons;
    case "entypo":
      return Entypo;
    case "font-awesome":
      return FontAwesome;
    default:
      return MaterialIcons;
  }
};

export default BubbleButton = ({
  children,
  onPress,
  loading,
  loadingProps,
  icon,
  disabled,
  style,
  title,
  titleStyle
}) => {
  const IconComponent = getTypeIcon(icon && icon.type);

  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[styles.bubble, style]}
      disabled={disabled}
    >
      {loading && (
        <ActivityIndicator
          color={loadingProps.color}
          size="small"
          {...loadingProps}
        />
      )}
      {!loading && icon && (
        <IconComponent
          name={icon.name}
          size={icon.size || 25}
          color={icon.color || "black"}
        />
      )}
      {!loading && title ? <Text style={titleStyle}>{title}</Text> : null}
      {!loading && children}
    </TouchableOpacity>
  );
};

BubbleButton.defaultProps = {
  disabled: false,
  loading: false
};

BubbleButton.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  icon: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  loading: PropTypes.bool,
  loadingProps: PropTypes.node,
  onPress: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
  title: PropTypes.string,
  titleStyle: ViewPropTypes.style
};

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: "rgba(255,255,255,0.9)",
    width: 50,
    height: 50,
    borderRadius: 30,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 25
  }
});
