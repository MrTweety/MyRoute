import React, { Component } from "react";
import { StyleSheet, View, Image, Dimensions, Animated } from "react-native";
import PropTypes from "prop-types";

import MapView from "react-native-maps";
import AnimatingPolyline from "./AnimatingPolyline";

const { width } = Dimensions.get("window");

export default class SimpleMap extends Component {
  animatedValue = new Animated.Value(0);

  state = { imgSrc: false };

  setImgSrc = imgSrc => {
    this.setState({ imgSrc });
  };

  showImage = imgSrc => {
    this.setImgSrc(imgSrc);
    Animated.sequence([
      Animated.timing(this.animatedValue, {
        toValue: 1,
        duration: 500
      }),
      Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: 500,
        delay: 1000
      })
    ]).start(() => {
      // end animation callback
      this.setImgSrc(null);
    });
  };

  renderOverlay = () => {
    const { imgSrc } = this.state;
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
    };

    return (
      <Animated.View style={[styles.overlay, animatedStyle]}>
        <Animated.View style={{ ...imageStyles }}>
          <Image
            style={{ width: width }}
            width={width}
            height={width}
            resizeMode="contain"
            source={{ uri: imgSrc }}
          />
        </Animated.View>
      </Animated.View>
    );
  };

  mapViewRef = React.createRef();

  componentDidMount() {
    const { coords } = this.props;
    const mapView = this.mapViewRef.current;
    if (mapView) {
      mapView.animateCamera({
        center: {
          ...coords[parseInt(coords.length / 2) - 2]
        },
        ...coords[parseInt(coords.length / 2) - 2],
        zoom: 15
      });
    }
  }

  componentDidUpdate() {
    const { coords } = this.props;
    const mapView = this.mapViewRef.current;
    if (mapView) {
      mapView.animateCamera({
        center: {
          ...coords[parseInt(coords.length / 2) - 2]
        },
        ...coords[parseInt(coords.length / 2) - 2],
        zoom: 15
      });
    }
  }

  render() {
    const { coords, shouldAnimation } = this.props;
    const { imgSrc } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <MapView
          ref={this.mapViewRef}
          style={{ width: width, height: width }}
          provider="google"
          liteMode
        >
          <MapView.Circle
            center={coords[1]}
            radius={20}
            strokeColor={"#484848"}
            strokeWidth={5}
            fillColor={"#fff"}
            zIndex={1}
          />
          <MapView.Circle
            center={coords[coords.length - 1]}
            radius={20}
            strokeColor={"#484848"}
            strokeWidth={5}
            fillColor={"#fff"}
            zIndex={1}
          />
          {coords &&
            coords.map((coord, index) => {
              if (coord.image) {
                return (
                  <MapView.Marker key={coord._id || index} coordinate={coord} />
                );
              }
            })}
          <AnimatingPolyline
            coords={coords}
            showImage={this.showImage}
            isPause={!!imgSrc}
            shouldAnimation={shouldAnimation}
          />

          <MapView.Polyline
            coordinates={coords}
            strokeWidth={2}
            strokeColor={"#666"}
          />
        </MapView>
        {!!imgSrc && this.renderOverlay()}
      </View>
    );
  }
}

SimpleMap.propTypes = {
  coords: PropTypes.arrayOf(PropTypes.object).isRequired,
  shouldAnimation: PropTypes.bool
};

const styles = StyleSheet.create({
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
