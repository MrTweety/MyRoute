import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Tooltip } from "react-native-elements";
import Icon from "./Icon";
import dateFormat from "../../../services/dateFormat";
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
    if (this.props._id) {
      this.props.navigation.navigate("BasicUserProfileStack", {
        id: this.props._id
      });
    }
  };

  render() {
    const { routeEndDate, name, avatar, textSecondary } = this.props;
    return (
      <View style={styles.userBar}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={this.navigateToBasicUserProfile}>
            <Image style={styles.userPic} source={{ uri: avatar }} />
          </TouchableOpacity>
          <View style={styles.userNameView}>
            {/* <Text style={styles.textPrimary}>{name}</Text> */}
            <View style={styles.textSecondaryWrap}>
              <Text style={styles.textPrimary}>{name}</Text>
              {/* <Text style={styles.textSecondary}>{textSecondary}</Text> */}
              <Text style={styles.textSecondary}>
                {dateFormat(routeEndDate)}
              </Text>
            </View>
          </View>
          {/* <View>{this.renderTooltip()}</View> */}
        </View>
      </View>
    );
  }
}

UserItem.defaultProps = {
  textSecondary: null
};

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
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center"
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
