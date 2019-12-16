import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Tooltip } from "react-native-elements";
import Icon from "./Icon";
import dateFormat from "../../../services/dateFormat";
import isRoute from "../propTypes/isRoute";
import { withNavigation } from "react-navigation";

class UserItem extends Component {
  renderTooltip = () => (
    <Tooltip
      backgroundColor="white" // backgroundColor of the tooltip and pointer.
      containerStyle={styles.containerStyle}
      popover={<Text>Info here</Text>}
    >
      <Icon
        type="material-community"
        name="dots-horizontal"
        size={30}
        color="black"
      />
    </Tooltip>
  );

  navigateToBasicUserProfile = () => {
    if (this.props.route.routeAuthor) {
      this.props.navigation.navigate("BasicUserProfileStack", {
        id: this.props.route.routeAuthor._id
      });
    }
  };

  render() {
    const { routeEndDate, name, avatar } = this.props;
    return (
      <View style={styles.userBar}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={this.navigateToBasicUserProfile}>
            <Image style={styles.userPic} source={{ uri: avatar }} />
          </TouchableOpacity>
          <View style={styles.userNameView}>
            <Text style={styles.textPrimary}>{name}</Text>
            <View style={styles.textSecondaryWrap}>
              <Text style={styles.textSecondary}>Kraków</Text>
              <Text style={styles.textSecondary}>
                {dateFormat(routeEndDate)}
              </Text>
            </View>
          </View>
          <View>{this.renderTooltip()}</View>
        </View>
      </View>
    );
  }
}

UserItem.propTypes = {
  avatar: PropTypes.string, //.isRequired,
  name: PropTypes.string, //.isRequired,
  routeEndDate: PropTypes.string //.isRequired,
};

export default withNavigation(UserItem);

const styles = StyleSheet.create({
  userBar: {
    alignItems: "center",
    // justifyContent: "space-between",
    height: 50,
    // backgroundColor: "red",
    marginHorizontal: 10,
    flexDirection: "row",
    borderBottomColor: "grey"
  },
  userPic: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  userNameView: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center"
  },
  textPrimary: {
    fontSize: 14,
    justifyContent: "flex-start",
    fontWeight: "bold",
    color: "#000000"
  },
  textSecondaryWrap: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row"
  },
  textSecondary: {
    fontSize: 12,
    fontWeight: "normal",
    color: "#808080"
  },
  containerStyle: {
    padding: 0,
    marginHorizontal: 10,
    alignContent: "center"
  }
});
