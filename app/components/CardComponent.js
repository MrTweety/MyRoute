import React, { Component } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import Icon from "./Icon";
import AnimatingPolyline from "./AnimatingPolyline";

const { width, height } = Dimensions.get("window");

const images = {
  1: require("../assets/imgMock/1.jpg"),
  2: require("../assets/imgMock/2.jpg"),
  3: require("../assets/imgMock/3.jpg"),
  7: require("../assets/imgMock/7.jpg")
};
export default class CardComponent extends Component {
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
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.userBar}>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={styles.userPic}
              source={require("../assets/imgMock/avatar3.png")}
            />
            <View
              style={{
                flexDirection: "column",
                marginLeft: 10,
                justifyContent: "center"
              }}
            >
              <Text>{this.props.userName || "brunnett"}</Text>
              {/* <Text>Kraków</Text> */}
            </View>
          </View>
          <View style={{}}>
            <Icon
              type="material-community"
              name="dots-horizontal"
              size={30}
              color="black"
            />
          </View>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {/* <Image
            style={{ flex: 1 }}
            width={width}
            height={this.state.cardImgHeight}
            resizeMode="contain"
            source={images[this.props.imageNr || 1]}
          /> */}
          <AnimatingPolyline nrRoute={this.props.imageNr} />
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
          />
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text>101 likes</Text>
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text>
            <Text style={{ fontWeight: "900" }}>
              {this.props.userName || "brunnett"}{" "}
            </Text>
            💖💖💖Lorem ipsum dolor sit amet{" "}
            <Text style={{ fontWeight: "400", color: "gray" }}>...More</Text>
          </Text>
        </View>
        <View style={{ marginLeft: 10, marginTop: 5 }}>
          <Text>
            <Text style={{ fontWeight: "900" }}>antonina559 </Text>
            Excepteur😃💖 sint occaecat cupidatat.
          </Text>
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 5 }}>
          <Text>
            <Text style={{ fontWeight: "900" }}>
              {this.props.userName || "brunnett"}{" "}
            </Text>
            Excepteur😃💖 sint occaecat cupidatat non proidenta💖💖💖
          </Text>
        </View>
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
            source={require("../assets/imgMock/avatar2.png")}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "green"
    paddingBottom: 5,
    marginBottom: 10,
    borderBottomColor: "grey"
  },
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
  icons: {
    flexDirection: "row",
    marginVertical: 10
  },
  icon: {
    marginLeft: 10
  }
});
