import React, { Component } from "react";
import { Animated, Dimensions, View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import BubbleButton from "./BubbleButton";

import TimerView from "./TimerView";
const screen = Dimensions.get("window");
const COLOR_BUTTON_TEXT = "rgba(0,0,0,0.7)";

export default class MapPanel extends Component {
  state = {
    translateX: new Animated.Value(screen.width - 140),
    fadeAnim: new Animated.Value(0)
  };

  timerViewRef = React.createRef();

  animatedToggleTracking = () => {
    Animated.spring(this.state.translateX, {
      toValue: !this.props.isTracking ? screen.width - 140 : 0,
      velocity: 3
    }).start();
    Animated.spring(this.state.fadeAnim, {
      toValue: !this.props.isTracking ? 0 : 1,
      velocity: 3
    }).start();
  };

  render() {
    const { fadeAnim, translateX } = this.state;
    const {
      distance,
      centerStates,
      isTracking,
      isPause,
      onCenterMap,
      togglePause,
      toggleTracking
    } = this.props;

    isTracking && this.animatedToggleTracking();

    const timerView = this.timerViewRef.current;
    if (timerView) {
      this.timerDuration = this.timerViewRef.current.time;
      this.startTime = this.timerViewRef.current.state.startTime;
    }

    return (
      <View style={styles.buttons} pointerEvents="box-none">
        <View style={styles.topButtons}></View>
        <View style={styles.buttonsColumn}>
          <View style={styles.bottomButtons}>
            <BubbleButton
              onPress={() =>
                onCenterMap(
                  centerStates.isCenter && !centerStates.pitch ? 60 : 0
                )
              }
              icon={{
                name: centerStates.pitch
                  ? "ios-compass" // location-arrow from FontAwesome
                  : centerStates.isCenter
                  ? "my-location"
                  : "location-searching",
                type: centerStates.pitch ? "ionicons" : "material",
                size: 25,
                color: centerStates.isCenter ? "blue" : "gray"
              }}
              iconLeft
            />
          </View>
          <View style={styles.bottomButtons}>
            <Animated.View
              style={{
                flexDirection: "row",
                opacity: fadeAnim,
                transform: [{ translateX }]
              }}
            >
              <View
                style={{
                  backgroundColor: COLOR_BUTTON_TEXT,
                  width: screen.width - 140,
                  height: 50,
                  borderRadius: 50,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  paddingHorizontal: 20
                }}
              >
                <View>
                  <TimerView
                    ref={this.timerViewRef}
                    styleText={{
                      color: "white",
                      fontSize: 18,
                      textAlign: "center"
                    }}
                    {...this.props}
                  />
                  <Text style={{ fontSize: 14, textAlign: "center" }}>
                    duration
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 18,
                      textAlign: "center"
                    }}
                  >
                    {distance < 100
                      ? distance.round(3).toFixed(3)
                      : distance.round(2).toFixed(2)}{" "}
                    km
                  </Text>
                  <Text style={{ fontSize: 14, textAlign: "center" }}>
                    distance
                  </Text>
                </View>
              </View>

              <BubbleButton
                icon={
                  !isPause
                    ? {
                        name: "controller-paus",
                        type: "entypo",
                        size: 25,
                        color: COLOR_BUTTON_TEXT
                      }
                    : {
                        name: "controller-play",
                        type: "entypo",
                        size: 25,
                        color: COLOR_BUTTON_TEXT
                      }
                }
                iconLeft
                onPress={togglePause}
              />
            </Animated.View>
            <BubbleButton
              buttonStyle={[styles.circleButton]}
              icon={
                !isTracking
                  ? {
                      name: "controller-play",
                      type: "entypo",
                      size: 25,
                      color: "green"
                    }
                  : {
                      name: "controller-stop",
                      type: "entypo",
                      size: 25,
                      color: "red"
                    }
              }
              iconLeft
              onPress={() =>
                toggleTracking({
                  timerDuration: this.timerDuration,
                  startTime: this.startTime
                })
              }
            />
          </View>
        </View>
      </View>
    );
  }
}

MapPanel.propTypes = {
  distance: PropTypes.number.isRequired,
  onCenterMap: PropTypes.func.isRequired,
  centerStates: PropTypes.shape({
    isCenter: PropTypes.bool.isRequired,
    pitch: PropTypes.number.isRequired
  }).isRequired,
  isPause: PropTypes.bool.isRequired,
  isTracking: PropTypes.bool.isRequired,
  togglePause: PropTypes.func.isRequired,
  toggleTracking: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 10,
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  topButtons: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    marginBottom: 10
  },
  buttonsColumn: {
    flexDirection: "column",
    alignItems: "flex-end",
    marginBottom: 10
  },
  circleButton: {
    backgroundColor: "rgba(255,255,255,0.9)",
    width: 50,
    height: 50,
    borderRadius: 50,
    marginLeft: 10,
    padding: 0
  }
});
