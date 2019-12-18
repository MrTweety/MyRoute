import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StyleSheet,
  ViewPropTypes
} from "react-native";

const Follows = ({ t, follow, unFollow, user, currentUser }) => {
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

Follows.propTypes = {
  t: PropTypes.func.isRequired,
  follow: PropTypes.func.isRequired,
  unFollow: PropTypes.func.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired
  }),
  currentUser: PropTypes.shape({
    _id: PropTypes.string.isRequired
  })
};

export default Follows;
