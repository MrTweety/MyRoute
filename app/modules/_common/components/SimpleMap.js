import React, { Component } from "react";
import { StyleSheet, View, Image, Dimensions, Animated } from "react-native";
import PropTypes from "prop-types";

import MapView from "react-native-web-maps";
import AnimatingPolyline from "./AnimatingPolyline";
import haversine from "../../../services/haversine";
import getRegionForCoordinates from "../../../services/getRegionForCoordinates";

const { width } = Dimensions.get("window");

export default class SimpleMap extends Component {
  animatedValue = new Animated.Value(0);

  state = {
    imgSrc: false,
    regionForCoordinates: getRegionForCoordinates(this.props.coords)
  };
  F;

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
        <Animated.View
          style={{
            ...imageStyles,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Image
            style={{
              width: width > 1024 ? width / 4 : width,
              height: width > 1024 ? width / 4 : width,
              alignItems: "center",
              justifyContent: "center"
            }}
            width={width > 1024 ? width / 4 : width}
            height={width > 1024 ? width / 4 : width}
            resizeMode="contain"
            source={{ uri: `data:image/png;base64,${imgSrc}` }}
          />
        </Animated.View>
      </Animated.View>
    );
  };

  render() {
    const { coords, shouldAnimation } = this.props;
    const { imgSrc, regionForCoordinates } = this.state;

    const deltaLat = haversine(
      regionForCoordinates,
      {
        ...regionForCoordinates,
        latitude:
          regionForCoordinates.latitude + regionForCoordinates.latitudeDelta
      },
      { unit: "meter" }
    );

    const deltaLon = haversine(
      regionForCoordinates,
      {
        ...regionForCoordinates,
        longitude:
          regionForCoordinates.longitude + regionForCoordinates.longitudeDelta
      },
      { unit: "meter" }
    );
    const radius = Math.round((deltaLat + deltaLon) / 2 / 20);

    return (
      <View style={{ flex: 1 }}>
        {/* <MapView region={{ latitude: 48.88, longitude: 2.32 }}
        style={{ width: width/4, height: width/4 }}>
          <MapView.Marker
            title="BAM"
            description="Shape the future of mobile with us"
            coordinate={{ latitude: 48.8828463, longitude: 2.3229091 }}
          />
        </MapView> */}
        <MapView
          region={{
            latitude: regionForCoordinates.latitude,
            longitude: regionForCoordinates.longitude
          }}
          style={{
            width: width > 1024 ? width / 4 : width,
            height: width > 1024 ? width / 4 : width
          }}
        >
          {/* <MapView.Circle
            center={coords[1]}
            radius={radius}
            strokeColor={"#484848"}
            strokeWidth={5}
            fillColor={"#fff"}
            zIndex={1}
          />
          <MapView.Circle
            center={coords[coords.length - 1]}
            radius={radius}
            strokeColor={"#484848"}
            strokeWidth={5}
            fillColor={"#fff"}
            zIndex={1}
          />*/}
          {coords &&
            coords.map(coord => {
              if (coord.image) {
                return <MapView.Marker key={coord._id} coordinate={coord} />;
              }
            })}
          <AnimatingPolyline
            coords={coords}
            showImage={this.showImage}
            isPause={!!imgSrc}
            shouldAnimation={shouldAnimation}
          />

          <MapView.Polyline
            path={coords.map(coordinates => ({
              lat: coordinates.latitude,
              lng: coordinates.longitude
            }))}
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
  // coords: PropTypes.arrayOf(PropTypes.object).isRequired,
  // shouldAnimation: PropTypes.bool
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
