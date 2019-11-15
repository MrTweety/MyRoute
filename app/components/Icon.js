import React from "react";
import PropTypes from "prop-types";
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
  SimpleLineIcons
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
    case "SimpleLineIcons":
      return SimpleLineIcons;
    default:
      return MaterialIcons;
  }
};

export default Icon = ({ type, ...props }) => {
  const IconComponent = getTypeIcon(type);

  return <IconComponent {...props} />;
};

Icon.defaultProps = {
  type: "material"
};

Icon.propTypes = {
  type: PropTypes.string
};
