import React from "react";
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

export default Icon = ({ type, ...props }) => {
  const IconComponent = getTypeIcon(type);

  return <IconComponent {...props} />;
};
