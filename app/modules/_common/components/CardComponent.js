import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Share,
  PermissionsAndroid
} from "react-native";
import Icon from "./Icon";
import SimpleMap from "../../HomeScreenList/components/SimpleMap";
import UserItem from "./UserItem";
import DescriptionItem from "./DescriptionItem";
import CommentList from "../../CommentList/components/CommentList";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as Permissions from "expo-permissions";

import createGpx from "../../../services/createGpx";

import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import isRoute from "../propTypes/isRoute";

const { width, height } = Dimensions.get("window");

class CardComponent extends Component {
  static navigationOptions = () => {
    return {
      headerRight: (
        <Icon
          type="ionicons"
          name="ios-send"
          size={30}
          style={{ margin: 0, paddingRight: 20 }}
        />
      )
    };
  };

  state = {
    cardImgHeight: width
  };
  componentDidMount() {
    // const img = Image.resolveAssetSource(images[this.props.imageNr]);
    // const imgWidth = img.width;
    // // console.log("MG-log: CardComponent -> componentDidMount -> imgWidth", imgWidth)
    // const imgHeight = img.height;
    // // console.log("MG-log: CardComponent -> componentDidMount -> imgHeight", imgHeight)
    // if (imgWidth > imgHeight) {
    //   const cardImgHeight = (imgHeight * width) / imgWidth;
    //   this.setState({ cardImgHeight });
    // }
  }

  saveGPXDrive = async () => {
    const { route } = this.props;
    const { _id, comments, coords, startDate } = route;
    const description = route.name;
    try {
      var gpx = createGpx(coords, {
        activityName: description,
        startTime: startDate
      });

      const gpxFile = await FileSystem.writeAsStringAsync(
        FileSystem.documentDirectory + "myroute.gpx",
        gpx
      );
      console.log(gpx);
      const gpxFileStatus = await FileSystem.getInfoAsync(
        FileSystem.documentDirectory + "myroute.gpx"
      );
      console.log(
        "MG-log: CardComponent -> saveGPX -> catalog2",
        gpxFileStatus
      );

      const sharing = await Sharing.shareAsync(
        FileSystem.documentDirectory + "myroute.gpx",
        { mimeType: "text/xml", dialogTitle: "dupa" }
      );
      console.log("MG-log: CardComponent -> saveGPX -> Sharing", sharing);
      console.log(
        "MG-log: CardComponent -> saveGPX -> documentDirectory",
        FileSystem.documentDirectory
      );
    } catch (error) {
      console.log("MG-log: saveGPX -> error", error);
    }
  };

  saveGPX = async () => {
    const { route } = this.props;
    const { _id, comments, coords, startDate } = route;
    const description = route.name;
    try {
      var gpx = createGpx(coords, {
        activityName: description,
        startTime: startDate
      });

      const gpxFile = await FileSystem.writeAsStringAsync(
        FileSystem.documentDirectory + "myroute.gpx",
        gpx
      );
      console.log(gpx);
      const gpxFileStatus = await FileSystem.getInfoAsync(
        FileSystem.documentDirectory + "myroute.gpx"
      );
      console.log(
        "MG-log: CardComponent -> saveGPX -> catalog2",
        gpxFileStatus
      );

      const result = await Share.share({
        title:
          "React Native | A framework for building native apps using React",
        url:
          "data:text/xml;harset=utf-8," +
          FileSystem.documentDirectory +
          "myroute.gpx"
        // FileSystem.documentDirectory + "myroute.gpx",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log("MG-log: saveGPX -> error", error);
    }
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

          <Icon
            type="ionicons"
            name="ios-save"
            size={30}
            color="black"
            style={styles.icon}
            onPress={() => this.saveGPXDrive()}
          />
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text>101 likes</Text>
        </View>

        {/* <CommentList comments={comments} simpleView={true} /> */}

        <View
          style={{
            marginHorizontal: 10,
            flexDirection: "row",
            marginTop: 5
          }}
        >
          <Image
            style={{
              width: 30,
              height: 30,
              borderRadius: 20
            }}
            source={{ uri: "https://www.w3schools.com/howto/img_avatar.png" }}
          />
          <View
            style={{
              flex: 1,
              borderRadius: 15,
              borderColor: "gray",
              alignContent: "center"
            }}
          >
            <Text style={{ marginLeft: 10, fontWeight: "400", color: "gray" }}>
              Add a comment...
            </Text>
          </View>
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
  // navigation: PropTypes.node
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "green"
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