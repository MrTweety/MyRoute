import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StyleSheet
} from "react-native";

const Follows = ({ t, user, currentUser, follow, unFollow }) => {
  const isFollow = !!user.followers.find(userId => userId === currentUser._id);

  const onClick = () => {
    if (isFollow) {
      unFollow({}, { currentUserId: currentUser._id, userId: user._id });
    } else {
      follow({}, { currentUserId: currentUser._id, userId: user._id });
    }
  };

  if (currentUser._id == user._id) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onClick}>
      <Text>{isFollow ? "UNFOLLOW" : "FOLLOW"}</Text>
    </TouchableOpacity>
  );
};

export default Follows;
