import React, { Component } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import BubbleButton from "../../_common/components/BubbleButton";
import geolocationService from "../../../assets/common/geolocationService";

class HeatMap extends Component {
  state = {
    points: [],
    clickPoint: {
      latitude: 49.96754078557588,
      longitude: 19.82071831487766
    },
    refreshing: false
  };

  componentDidMount() {
    this.getHeatMapPoints();
  }

  getHeatMapPoints = () => {
    this.props.getHeatMap().then(response => {
      console.log(response.response);
      this.setState({
        points: response.response
      });
    });
  };

  onRefresh = () => {
    this.getHeatMapPoints();
  };

  render() {
    const { points } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: this.state.clickPoint.latitude,
              longitude: this.state.clickPoint.longitude,
              latitudeDelta: 0.09,
              longitudeDelta: 0.0121
            }}
            onPress={event => {
              const coordinates = event.nativeEvent.coordinate;
              console.log(coordinates);
              geolocationService
                .fetchNameInfo(coordinates)
                .then(re => {
                  console.log(re);
                })
                .catch(error => {
                  console.log(error);
                });
              this.setState({
                clickPoint: event.nativeEvent.coordinate
              });
            }}
          >
            {points.length !== 0 &&
              points.map(point => (
                <MapView.Circle
                  key={point.latitude + Math.random()}
                  center={{
                    latitude: point.latitude,
                    longitude: point.longitude
                  }}
                  radius={1000}
                  strokeWidth={1}
                  strokeColor={"rgba(62,255,84, 0.4)"}
                  fillColor={"rgba(62,255,84, 0.4)"}
                />
              ))}
          </MapView>
        </View>
        <View style={styles.mapControlContainer}>
          <Text>{this.state.clickPoint.latitude}</Text>
          <BubbleButton
            onPress={this.onRefresh}
            icon={{
              name: "cycle",
              type: "entypo",
              size: 25,
              color: "rgba(0,0,0,0.7)"
            }}
            iconLeft
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mapContainer: {
    height: 300,
    width: "100%",
    alignItems: "center"
  },
  map: {
    height: 300,
    width: "100%"
  },
  scrollView: {
    justifyContent: "center"
  },
  mapControlContainer: {
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});

export default HeatMap;
