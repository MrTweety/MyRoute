import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Icon from "../../_common/components/Icon";
import SimpleMap from "../../_common/components/SimpleMap";
import UserItem from "../../_common/components/UserItem";
import DescriptionItem from "../../_common/components/DescriptionItem";

import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import isRoute from "../../_common/propTypes/isRoute";

const { width, height } = Dimensions.get("window");

class CardComponent extends Component {
  state = {
    cardImgHeight: width
  };

  render() {
    const { t, route, shouldAnimation, navigation } = this.props;
    const { _id, comments, coords } = route;
    const description = route.name;

    return (
      <View style={styles.container}>
        <UserItem {...this.props} />
        <DescriptionItem description={description} />

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <SimpleMap
            coords={coords}
            nrRoute={this.props.imageNr}
            shouldAnimation={shouldAnimation}
          />
        </View>
        <View style={styles.icons}>
          <Icon
            type="entypo"
            name={this.props.heart || "heart-outlined"}
            size={30}
            color={this.props.heart ? "red" : "black"}
            style={styles.icon}
          />
          <Icon
            type="SimpleLineIcons"
            name="bubble"
            size={30}
            color="black"
            style={styles.icon}
            onPress={() =>
              navigation.navigate("CommentStack", {
                _id,
                comments,
                description
              })
            }
          />
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text>101 likes</Text>
        </View>
      </View>
    );
  }
}

export default withTranslation()(CardComponent);

CardComponent.defaultProps = {
  shouldAnimation: false
};

CardComponent.propTypes = {
  t: PropTypes.func.isRequired,
  route: isRoute.isRequired,
  shouldAnimation: PropTypes.bool
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
