import React from "react";
import PropTypes from "prop-types";
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
  SimpleLineIcons,
  Feather
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
    case "Feather":
      return Feather;
    default:
      return MaterialIcons;
  }
};

const Icon = ({ type, ...props }) => {
  const IconComponent = getTypeIcon(type);

  return <IconComponent {...props} />;
};

Icon.defaultProps = {
  type: "material"
};

Icon.propTypes = {
  type: PropTypes.string
};
export default Icon;
