import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Icon from "../../_common/components/Icon";
import SimpleMap from "../../_common/components/SimpleMap";
import UserItem from "../../_common/components/UserItem";
import DescriptionItem from "../../_common/components/DescriptionItem";
import PropTypes from "prop-types";
import isRoute from "../../_common/propTypes/isRoute";

const CardComponent = ({
  t,
  route,
  shouldAnimation,
  navigation,
  likeRoute,
  dislikeRoute,
  user,
  withOutUserItem
}) => {
  const { coords, routeAuthor, likes } = route;
  const description = route.name;
  const routeEndDate = route.endDate;
  const heart = !!likes.find(userId => userId === user._id);
  console.log("heart", heart);

  const clickLike = () => {
    if (heart) {
      dislikeRoute({ userId: user._id }, { routeId: route._id });
    } else {
      likeRoute({ userId: user._id }, { routeId: route._id });
    }
  };

  return (
    <View style={styles.container}>
      {!withOutUserItem && (
        <UserItem {...routeAuthor} routeEndDate={routeEndDate} />
      )}
      <DescriptionItem description={description} />

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <SimpleMap coords={coords} shouldAnimation={shouldAnimation} />
      </View>
      <View style={styles.icons}>
        <Icon
          type="entypo"
          name={heart ? "heart" : "heart-outlined"}
          size={30}
          color={heart ? "red" : "black"}
          style={styles.icon}
          onPress={clickLike}
        />
        <Icon
          type="SimpleLineIcons"
          name="bubble"
          size={30}
          color="black"
          style={styles.icon}
          onPress={() =>
            navigation.navigate("CommentStack", {
              route
            })
          }
        />
      </View>
      <View style={{ marginLeft: 10 }}>
        <Text>{likes.length} likes</Text>
      </View>
    </View>
  );
};

export default CardComponent;

CardComponent.defaultProps = {
  shouldAnimation: false,
  withOutUserItem: false
};

CardComponent.propTypes = {
  t: PropTypes.func.isRequired,
  route: isRoute.isRequired,
  shouldAnimation: PropTypes.bool,
  withOutUserItem: PropTypes.bool
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 5,
    marginBottom: 10,
    borderBottomColor: "grey"
  },
  icons: {
    flexDirection: "row",
    marginVertical: 10
  },
  icon: {
    marginLeft: 10
  }
});
