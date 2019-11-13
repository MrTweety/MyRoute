import React, { Component, Fragment } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  Animated
} from "react-native";

import MapView from "react-native-maps";
import * as Location from "expo-location";

import route from "./cord";

const { width, height } = Dimensions.get("window");
console.log("MG-log: route", route.coords[1]);
console.log("MG-log: route length", route.coords.length);

const images = {
  "../assets/imgMock/1.jpg": require("../assets/imgMock/1.jpg"),
  "../assets/imgMock/2.jpg": require("../assets/imgMock/2.jpg"),
  "../assets/imgMock/3.jpg": require("../assets/imgMock/3.jpg"),
  "../assets/imgMock/7.jpg": require("../assets/imgMock/7.jpg")
};
export default class MapScreen extends Component {
  animatedValue = new Animated.Value(0);

  state = { imgSrc: false };

  setImgSrc = imgSrc => {
    this.setState({
      imgSrc
    });
  };

  showImage = imgSrc => {
    this.setImgSrc(imgSrc, true);
    Animated.sequence([
      // Animated.spring(this.animatedValue, {
      //   toValue: 1,
      //   speed: 20,
      //   // useNativeDriver: true
      // }),
      // Animated.spring(this.animatedValue, {
      //   toValue: 0,
      //   speed: 20
      //   // userNativeDriver: true
      // })

      Animated.timing(this.animatedValue, {
        toValue: 1,
        duration: 500
        // useNativeDriver: true
      }),
      Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: 500,
        delay: 1000
        // userNativeDriver: true
      })
    ]).start(() => {
      console.log("end animation");
      this.setImgSrc(null);
    });
  };

  renderOverlay = () => {
    const imageStyles = {
      opacity: this.animatedValue,
      transform: [
        {
          scale: this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.7, 1]
          })
        }
      ]
    };

    //mapa is not clickable
    const bgColor = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgba(255,255,255,0)", "rgba(255,255,255,0.8)"]
    });

    const animatedStyle = {
      backgroundColor: bgColor
      // opacity: this.animatedValue,
    };

    var imgSource = this.state.imgSrc
      ? this.state.imgSrc
      : "../assets/imgMock/1.jpg";
    console.log("MG-log: MapScreen -> renderOverlay -> imgSource", imgSource);

    return (
      <Animated.View style={[styles.overlay, animatedStyle]}>
        {/* <Image
          source={require("../assets/imgMock/1.jpg")}
          // style={styles.overlayHeart}
        /> */}
        <Animated.View style={{ ...imageStyles }}>
          <Image
            style={{ width: width }}
            // style={{ flex: 1 }}
            width={width}
            height={width}
            resizeMode="contain"
            source={images[this.state.imgSrc || "../assets/imgMock/7.jpg"]}
          />
        </Animated.View>
      </Animated.View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            ...route.coords[parseInt(route.coords.length / 2)],
            latitudeDelta: 0.047 / 4,
            longitudeDelta: 0.017 / 4
          }}
          provider="google"
          liteMode
        >
          <MapView.Circle
            center={route.coords[1]}
            radius={20}
            strokeColor={"#484848"}
            strokeWidth={5}
            fillColor={"#fff"}
            zIndex={1}
          />
          {/* Destination Circle */}
          <MapView.Circle
            center={route.coords[route.coords.length - 1]}
            radius={20}
            strokeColor={"#484848"}
            strokeWidth={5}
            fillColor={"#fff"}
            zIndex={1}
          />
          {route.coords &&
            route.coords.map(coord => {
              if (coord.image) {
                console.log("MG-log: render -> coord", coord);
                return (
                  <MapView.Marker
                    key={coord._id}
                    coordinate={coord}
                    title="hfhfgh"
                    description="{marker.description}"
                  />
                );
              }
            })}
          {/* Animating polyline */}
          {/* <AnimatingPolylineComponent Direction={route.coords.reverse()} /> */}
          <AnimatingPolylineComponent
            Direction={route.coords}
            showImage={this.showImage}
            isPause={this.state.imgSrc}
          />

          <MapView.Polyline
            coordinates={route.coords}
            strokeWidth={2}
            strokeColor={"#666"}
          />
        </MapView>
        {this.renderOverlay()}
      </View>
    );
  }
}

class AnimatingPolylineComponent extends Component {
  state = {
    polylinePath: this.props.Direction, //route.coords.reverse()
    polylinePath2: []
  };

  componentDidMount() {
    this.animatePolyline();
  }

  animatePolyline = () => {
    this.interval = setInterval(() => this.animatePolylineStart(), 70);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  animatePolylineStart = () => {
    console.log(!this.props.isPause);
    if (!this.props.isPause) {
      if (this.state.polylinePath.length <= this.props.Direction.length) {
        const Direction = this.props.Direction;

        const polylinePath = [
          ...Direction.slice(0, this.state.polylinePath.length - 1)
        ];
        this.setState({ polylinePath });
      } else {
        this.setState({ polylinePath: [] });
      }

      if (this.state.polylinePath2.length < this.props.Direction.length - 1) {
        const Direction = this.props.Direction;
        const newCords = Direction[this.state.polylinePath2.length];
        if (newCords && newCords.image) {
          // console.log("MG-log: AnimatingPolylineComponent -> animatePolylineStart -> newCords", newCords)
          this.props.showImage(newCords.image);
        }

        const polylinePath2 = [...this.state.polylinePath2, { ...newCords }];
        this.setState({ polylinePath2 });
      } else {
        this.setState({ polylinePath2: [] });
      }
    }
  };

  render() {
    return (
      <Fragment>
        {this.state.polylinePath2.length > 0 && (
          <MapView.Polyline
            coordinates={this.state.polylinePath2}
            //  strokeColor="#666"
            strokeColor="white"
            strokeWidth={9}
          />
        )}
        {this.state.polylinePath2.length > 0 && (
          <MapView.Polyline
            coordinates={this.state.polylinePath2}
            //  strokeColor="#666"
            strokeColor="#484848"
            strokeWidth={5}
          />
        )}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  mytext: {
    // textAlign: 'center',
    padding: 10,
    fontSize: 16,
    textShadowColor: "black",
    color: "white",
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 6
  },
  overlay: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
});
