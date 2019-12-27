/*TODO:
 * (nowy task) Obsługa blędów (logger blędów ) (do wyświetlania informacji dla uzytkownika)
 * (nowy task) DialogInput (Dialog -> Redux -> osoby plik, powinno sie dac łatwo (zrobić ogólną obsługę PopUp'ow))
 */
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  AppState,
  Slider
} from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import * as TaskManager from "expo-task-manager";
import { activateKeepAwake, deactivateKeepAwake } from "expo-keep-awake";
import * as FileSystem from "expo-file-system";

import MapPanel from "../../_common/components/MapPanel";
import DialogInput from "../../_common/components/MyDialogImputs";
import runKalmanOnLocations from "../../../services/kalman";

import { locationEventsEmitter, taskEventName } from "../locationEventsEmitter";
import backgroundTask from "../backgroundTask";
import enableNetworkProviderAsync from "../enableNetworkProviderAsync";

import {
  getSavedItemNotSecure,
  STORAGE_KEY_USER_COORDS,
  STORAGE_KEY_USER_DISTANCE,
  STORAGE_KEY_USER_TIME
} from "../../../services/storage";
import {
  deleteSavedItem,
  getSavedItem,
  ROUTES_PHOTOS
} from "../../../services/secureStorage";

const LOCATION_TASK_NAME = "background-location-task2";

const PHOTOS_DIR = FileSystem.documentDirectory + "photos";

// TODO: przenieść do ustawień gdy bedą robione
const locationAccuracyStates = {
  [Location.Accuracy.Lowest]: Location.Accuracy.Low,
  [Location.Accuracy.Low]: Location.Accuracy.Balanced,
  [Location.Accuracy.Balanced]: Location.Accuracy.High,
  [Location.Accuracy.High]: Location.Accuracy.Highest,
  [Location.Accuracy.Highest]: Location.Accuracy.BestForNavigation,
  [Location.Accuracy.BestForNavigation]: Location.Accuracy.Lowest
};

const kalmanFilterStates = {
  rawData: "kalman",
  kalman: "rawData"
};

Number.prototype.round = function(place) {
  return +(Math.round(this + "e+" + place) + "e-" + place);
};

export default class MapScreen extends React.Component {
  static navigationOptions = {
    title: "Background location"
  };

  mapViewRef = React.createRef();
  mapPanelRef = React.createRef();

  initialState = {
    selectedOption: "rawData",
    kalmanConstant: 300,
    accuracyConstant: 100,
    naiveSolution: true,
    dataToDisplay: [],
    accuracy: Location.Accuracy.Highest,
    isTracking: false,
    isPause: false,
    showsBackgroundLocationIndicator: false, //only iOS
    savedLocations: [],
    startTime: 0,
    timerDuration: 0,
    distance: 0,
    isDialogVisible_StopDecision: false,
    isDialogVisible_DiscardDecision: false,
    trackName: "Track name",
    appState: AppState.currentState
  };

  state = {
    ...this.initialState,
    centerStates: {
      isCenter: true,
      pitch: 0
    }
  };

  componentDidMount() {
    if (__DEV__) {
      this.keepAwakeActivate();
    } else {
      this.keepAwakeDeactivate();
    }
    this.getLocationAsync();
    this.filterData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.selectedOption !== this.state.selectedOption ||
      prevState.savedLocations !== this.state.savedLocations ||
      prevState.kalmanConstant !== this.state.kalmanConstant
    ) {
      this.filterData();
    }
  }

  componentWillUnmount() {
    if (this.eventSubscription) {
      this.eventSubscription.remove();
    }

    AppState.removeEventListener("change", this.handleAppStateChange);
  }

  keepAwakeActivate = () => {
    activateKeepAwake();
  };

  keepAwakeDeactivate = () => {
    deactivateKeepAwake();
  };

  getLocationAsync = async () => {
    const response = await Permissions.askAsync(Permissions.LOCATION).then(
      r => r.status
    );

    if (response !== "granted") {
      AppState.addEventListener("change", this.handleAppStateChange);
      this.setState({
        error:
          'Location permissions are required in order to use this feature. You can manually enable them at any time in the "Location Services" section of the Settings app.'
      });

      return;
    } else {
      this.setState({ error: undefined });
    }
    const locationStatus = await enableNetworkProviderAsync();

    if (locationStatus) {
      this.setState({ error: locationStatus });
      return;
    } else {
      this.setState({ error: "" });
    }

    const { coords } = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true
    });
    const isTracking = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK_NAME
    );

    const task = (await TaskManager.getRegisteredTasksAsync()).find(
      ({ taskName }) => taskName === LOCATION_TASK_NAME
    );

    const savedLocations = await getSavedItemNotSecure(STORAGE_KEY_USER_COORDS);
    const savedDistance = await getSavedItemNotSecure(
      STORAGE_KEY_USER_DISTANCE
    );

    if (savedDistance == null || savedDistance.length == 0) {
      distance = 0;
    } else {
      distance = parseFloat(savedDistance);
    }

    const accuracy = (task && task.options.accuracy) || this.state.accuracy;

    this.eventSubscription = locationEventsEmitter.addListener(
      taskEventName,
      locations => {
        this.setState({
          savedLocations: locations.savedLocations,
          distance: locations.distance
        });
      }
    );

    this.setState({
      accuracy,
      isTracking,
      distance,
      showsBackgroundLocationIndicator:
        task && task.options.showsBackgroundLocationIndicator,
      savedLocations,
      initialRegion: {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.004,
        longitudeDelta: 0.002
      }
    });
  };

  handleAppStateChange = nextAppState => {
    if (nextAppState !== "active") {
      return;
    }

    if (this.state.initialRegion) {
      AppState.removeEventListener("change", this.handleAppStateChange);
      return;
    }

    this.getLocationAsync();
  };

  async startLocationUpdates(accuracy = this.state.accuracy) {
    this.keepAwakeActivate();
    this.handlerSetCenter();
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy,
      showsBackgroundLocationIndicator: this.state
        .showsBackgroundLocationIndicator,
      timeInterval: 2500, // default?
      distanceInterval: 5, // default?
      foregroundService: {
        notificationTitle: "expo-location-demo",
        notificationBody: "Background location is running...",
        notificationColor: "#463"
      }
    });
  }

  async stopLocationUpdates() {
    if (!__DEV__) {
      this.keepAwakeDeactivate();
    }
    await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
  }

  async stopLocationSave() {
    const { saveRoute, user } = this.props;
    const {
      savedLocations,
      dataToDisplay,
      trackName,
      distance,
      startTime,
      timerDuration
    } = this.state;

    let returnPhotos = [];

    const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
    const photosCords = JSON.parse(await getSavedItem(ROUTES_PHOTOS));

    if (photosCords !== null) {
      photos.map(async fileName => {
        let date = fileName.split(".")[0];
        let point = photosCords.find(data => data.date == date); // Ma być ==
        console.log(
          "Type: \n\n",
          typeof photosCords[0].date,
          "\n",
          typeof date,
          "\n\n"
        );
        if (point !== undefined) {
          let photoFile = await FileSystem.readAsStringAsync(
            `${PHOTOS_DIR}/${fileName}`,
            { encoding: FileSystem.EncodingType.Base64 }
          );

          returnPhotos.push({
            photoBase64: photoFile,
            latitude: point.point.latitude,
            longitude: point.point.longitude,
            pointTimestamp: point.point.timestamp
          });
        }
      });
    }

    if (savedLocations && savedLocations.length > 1) {
      //TODO: zrobić zapis jak bedzie serwer gotowy :)
      saveRoute({
        name: trackName,
        startDate: startTime,
        endDate: new Date().getTime(),
        coords: dataToDisplay,
        // coordsOrigin: savedLocations,
        distance,
        timerDuration,
        routeAuthor: user._id,
        photos: returnPhotos
      });
    }
    this.clearPhotosFromGallery(photos);
  }

  clearPhotosFromGallery = photos => {
    photos.map(async photo => {
      await FileSystem.deleteAsync(`${PHOTOS_DIR}/${photo}`);
    });
  };

  clearLocations = async () => {
    await AsyncStorage.setItem(
      STORAGE_KEY_USER_COORDS,
      JSON.stringify([])
    ).then(this.setState({ savedLocations: [] }));
  };

  //TODO: Dialog -> Redux -> osoby plik, powinno sie dac łatwo (zrobić ogólną obsługę PopUp'ow)
  showSaveDialog(isShow) {
    this.setState({ isDialogVisible_StopDecision: isShow });
  }

  stopAndSaveDialog(inputText) {
    this.setState({
      isDialogVisible_StopDecision: false,
      trackName: inputText
    });
    this.stopTracking(true);
  }

  showDiscard(isShow) {
    this.setState({ isDialogVisible_StopDecision: false });
    this.setState({ isDialogVisible_DiscardDecision: isShow });
  }

  discard() {
    this.stopTracking(false);
    this.setState({ isDialogVisible_DiscardDecision: false });
  }

  stopTracking = async (save = true) => {
    if (!this.state.isPause) {
      await this.stopLocationUpdates();
    }
    this.setState({ isTracking: false });
    this.animatedToggleTracking();
    if (save) {
      await this.stopLocationSave();
    }

    await AsyncStorage.removeItem(STORAGE_KEY_USER_COORDS);
    await AsyncStorage.removeItem(STORAGE_KEY_USER_TIME);
    await AsyncStorage.removeItem(STORAGE_KEY_USER_DISTANCE);
    await deleteSavedItem(ROUTES_PHOTOS);
    this.setState({ ...this.initialState });
  };

  toggleTracking = async ({ timerDuration, startTime }) => {
    if (timerDuration && startTime) {
      this.setState({ timerDuration, startTime });
    }

    if (this.state.isTracking) {
      if (this.state.savedLocations && this.state.savedLocations.length > 1) {
        this.showSaveDialog(true);
      } else {
        this.stopTracking(false);
      }
    } else {
      await this.startLocationUpdates();
      this.setState({ isTracking: true });
    }

    this.animatedToggleTracking();
  };

  togglePause = async () => {
    try {
      if (!this.state.isPause) {
        await this.stopLocationUpdates();
        this.setState({ isPause: true });
      } else {
        await this.startLocationUpdates();
        this.setState({ isPause: false });
      }
    } catch (error) {
      console.log("Error: ", error.message);
    }
    const {
      savedTime,
      isPause,
      timerStart,
      timerDuration,
      timerDurationNew
    } = this.state;

    await AsyncStorage.setItem(
      STORAGE_KEY_USER_TIME,
      JSON.stringify({
        savedTime,
        isPause,
        timerStart,
        timerDuration: timerDuration,
        timerDurationNew: timerDurationNew
      })
    );
  };

  onAccuracyChange = () => {
    const accuracy = locationAccuracyStates[this.state.accuracy];
    this.setState({ accuracy });

    if (this.state.isTracking) {
      // Restart background task with the new accuracy.
      this.startLocationUpdates(accuracy);
    }
  };

  onFilterChange = () => {
    const selectedOption = kalmanFilterStates[this.state.selectedOption];
    this.setState({ selectedOption });
  };

  filterData() {
    const {
      savedLocations,
      selectedOption,
      kalmanConstant,
      naiveSolution,
      accuracyConstant
    } = this.state;

    if (savedLocations && savedLocations.length === 0) {
      return null;
    }

    let dataToDisplay = [];

    if (naiveSolution) {
      dataToDisplay = savedLocations.filter(l => l.accuracy < accuracyConstant);
    } else {
      dataToDisplay = savedLocations;
    }

    if (selectedOption === "kalman") {
      const kalmanSolution = runKalmanOnLocations(
        dataToDisplay,
        kalmanConstant
      );
      kalmanSolution.push(dataToDisplay[dataToDisplay.length - 1]);
      dataToDisplay = kalmanSolution;
    }
    // console.log(dataToDisplay.length, savedLocations.length);

    this.setState({ dataToDisplay: dataToDisplay });
  }

  handlerSetCenter = (pitch = 0) => {
    const { centerStates } = this.state;
    if (centerStates.isCenter) {
      this.setState(prevState => ({
        centerStates: {
          ...prevState.centerStates,
          pitch: pitch
        }
      }));
    } else {
      this.setState(prevState => ({
        centerStates: {
          ...prevState.centerStates,
          isCenter: true
        }
      }));
    }
    this.onCenterMap();
  };

  setNoCenter = () => {
    const { centerStates } = this.state;
    if (centerStates.isCenter) {
      this.setState(prevState => ({
        centerStates: {
          ...prevState.centerStates,
          isCenter: false
        }
      }));
    }
  };

  onCenterMap = async () => {
    let response = await Permissions.askAsync(Permissions.LOCATION).then(
      r => r.status
    );
    if (response !== "granted") {
      this.setState({
        errors: "Please grant location permission in the system settings!"
      });
      return;
    }

    const locationStatus = await enableNetworkProviderAsync();
    if (locationStatus) {
      this.setState({ error: locationStatus });
      return;
    } else {
      this.setState({ error: "" });
    }

    const { centerStates } = this.state;

    const { coords } = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true
    });
    const { latitude, longitude, heading, altitude } = coords;

    const mapView = this.mapViewRef.current;
    if (mapView) {
      mapView.animateCamera({
        center: { latitude, longitude },
        heading,
        altitude,
        pitch: centerStates.pitch
      });
    }
  };

  animatedToggleTracking = () => {
    const mapPanel = this.mapPanelRef.current;
    if (mapPanel) {
      mapPanel.animatedToggleTracking();
    }
  };

  renderPolyline() {
    const { dataToDisplay, savedLocations } = this.state;
    // console.log("MG-log: renderPolyline -> selectedOption", selectedOption);

    // if (dataToDisplay && dataToDisplay.length === 0) {
    //   return null;
    // }

    return (
      <>
        {!(dataToDisplay && dataToDisplay.length === 0) && (
          <MapView.Polyline
            coordinates={dataToDisplay}
            strokeWidth={5}
            strokeColor={"#4630ec"}
          />
        )}
        {!(1 || (savedLocations && savedLocations.length === 0)) && (
          <MapView.Polyline
            coordinates={savedLocations}
            strokeWidth={3}
            strokeColor={"red"}
          />
        )}
      </>
    );
  }

  handleCameraButton = () => {
    const lastPoint = this.state.savedLocations.slice(-1).pop();
    this.props.navigation.navigate("CameraStack", {
      point: lastPoint
    });
  };

  render() {
    const { t } = this.props;
    return (
      <View style={styles.container}>
        {// TODO: Obsługa blędów (logger blędów ) (do wyświetlania informacji dla uzytkownika)
        this.state.error ? (
          <Text style={styles.errorText}>{this.state.error}</Text>
        ) : null}

        {!!this.state.initialRegion && (
          <MapView
            style={{ flex: 1 }}
            legalLabelInsets={{ bottom: 200 }}
            showsUserLocation={true}
            showsMyLocationButton={false}
            showsScale={true}
            ref={this.mapViewRef}
            initialRegion={this.state.initialRegion}
            provider="google"
            onUserLocationChange={() => {
              this.state.centerStates.isCenter &&
                !this.state.error &&
                this.onCenterMap();
            }}
            onPanDrag={() => {
              this.setNoCenter();
            }}
          >
            {this.renderPolyline()}
          </MapView>
        )}
        <View style={styles.bottons}>
          {/* <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Text>Naive Solution:</Text>
            <Switch
              onValueChange={naiveSolution => {
                this.setState({ naiveSolution });
              }}
              value={this.state.naiveSolution}
            />
          </View>
          {this.state.naiveSolution && (
            <View>
              <Text>Accuracy Constant: {this.state.accuracyConstant}</Text>
              <Slider
                step={10}
                maximumValue={500}
                onValueChange={accuracyConstant => {
                  this.setState({
                    accuracyConstant: parseFloat(accuracyConstant)
                  });
                }}
                value={this.state.accuracyConstant}
              />
            </View>
          )} */}

          {this.state.selectedOption === "kalman" && (
            <View
              style={{
                flexDirection: "column"
              }}
            >
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              ></View>
              <Text>Kalman Constant: {this.state.kalmanConstant}</Text>
              <Slider
                step={100}
                maximumValue={2000}
                onValueChange={kalmanConstant => {
                  this.setState({
                    kalmanConstant: parseFloat(kalmanConstant)
                  });
                }}
                value={this.state.kalmanConstant}
              />
            </View>
          )}
        </View>

        <MapPanel
          ref={this.mapPanelRef}
          onCenterMap={this.handlerSetCenter}
          onFilterChange={() => this.onFilterChange(this.state.selectedOption)}
          togglePause={this.togglePause}
          toggleTracking={this.toggleTracking}
          centerStates={this.state.centerStates}
          isPause={this.state.isPause}
          isTracking={this.state.isTracking}
          distance={this.state.distance}
          handleCameraButton={this.handleCameraButton}
          filter={this.state.selectedOption}
          t={t}
        />

        <DialogInput
          isDialogVisible={this.state.isDialogVisible_StopDecision}
          title={t("map.stopSave")}
          message={t("map.trackName")}
          hintInput={t("map.trackName")}
          initValueTextInput={t("map.trackName")}
          submitInput={inputText => {
            this.stopAndSaveDialog(inputText);
          }}
          closeDialog={() => {
            this.showSaveDialog(false);
          }}
          opcionalAction={() => {
            this.showDiscard(true);
          }}
          opcionalTextVisible={true}
          cancelText={t("common.cancel")}
          submitText={t("common.save")}
          opcionalText={t("common.discard")}
        >
          <View style={{ marginBottom: 20 }} />
        </DialogInput>

        <DialogInput
          isDialogVisible={this.state.isDialogVisible_DiscardDecision}
          title={t("map.discardQuestion")}
          message={t("map.stopInformation")}
          textInputVisible={false}
          submitInput={() => {
            this.discard();
          }}
          closeDialog={() => {
            this.showDiscard(false);
          }}
          submitText={t("common.discard")}
        />
      </View>
    );
  }
}
// define backgroundTask
TaskManager.defineTask(LOCATION_TASK_NAME, backgroundTask);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  errorText: {
    fontSize: 15,
    color: "rgba(0,0,0,0.7)",
    margin: 20
  },
  bottons: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0
    // bottom: 14
  }
});
