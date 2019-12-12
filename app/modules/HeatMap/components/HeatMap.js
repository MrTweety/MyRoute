import React, { Component } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import BubbleButton from "../../_common/components/BubbleButton";
import geolocationService from "../../../assets/common/geolocationService";

const heatMapColors = {
  green: "rgba(62,255,84, 0.4)",
  yellow: "rgba(255,252,36,0.4)",
  red: "rgba(255,52,82,0.4)"
};

class HeatMap extends Component {
  state = {
    points: [],
    clickPoint: {
      latitude: 50.06754078557588,
      longitude: 19.94071831487766
    },
    refreshing: false,
    location: ""
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

  mapClickHandle = event => {
    const coordinates = event.nativeEvent.coordinate;

    geolocationService
      .fetchNameInfo(coordinates)
      .then(response => {
        this.setState({
          location: response
        });
      })
      .catch(error => {
        console.log(error);
      });

    this.setState({
      clickPoint: event.nativeEvent.coordinate
    });
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
            zoomControlEnabled={true}
            onPress={this.mapClickHandle}
          >
            {points.length !== 0 &&
              points.map(point => (
                <MapView.Circle
                  key={point.latitude + Math.random()}
                  center={{
                    latitude: point.latitude,
                    longitude: point.longitude
                  }}
                  radius={100 * point.weight}
                  strokeWidth={1}
                  strokeColor={heatMapColors.green}
                  fillColor={heatMapColors.green}
                />
              ))}
          </MapView>
        </View>
        <View style={styles.mapControlContainer}>
          <Text>{this.state.location}</Text>
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
