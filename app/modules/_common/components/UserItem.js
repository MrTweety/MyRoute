import React, { Component } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "./Icon";
import { Tooltip } from "react-native-elements";
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
    return (
      <View style={styles.userBar}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={this.navigateToBasicUserProfile}>
            <Image
              style={styles.userPic}
              source={{
                uri: "https://www.w3schools.com/howto/img_avatar2.png"
              }}
            />
          </TouchableOpacity>
          <View style={styles.userNameView}>
            <Text style={styles.textPrimary}>
              {this.props.name || "brunnett"}
            </Text>
            <Text style={styles.textSecondary}>Kraków</Text>
          </View>
        </View>
        {this.renderTooltip()}
      </View>
    );
  }
}

export default withNavigation(UserItem);

const styles = StyleSheet.create({
  userBar: {
    alignItems: "center",
    justifyContent: "space-between",
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
    flexDirection: "column",
    marginLeft: 10,
    justifyContent: "center"
  },
  textPrimary: {
    fontSize: 14,
    justifyContent: "flex-start",
    fontWeight: "bold",
    color: "#000000"
  },
  textSecondary: {
    fontSize: 12,
    justifyContent: "flex-start",
    fontWeight: "normal",
    color: "#808080"
  },
  containerStyle: {
    padding: 0
  }
});
