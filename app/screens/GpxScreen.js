import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import React, { Component } from "react";
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import DomSelector from "react-native-dom-parser";
import { saveRoute } from "../modules/RecordRoute/actions/saveRoute";
import SimpleCardComponent from "../modules/_common/components/SimpleCardComponent";

class GpxScreen extends Component {
  state = {
    document: null,
    copyToCache: true,
    error: false,
    savedRoute: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.document !== this.state.document) {
      console.log(
        "MG-log: GpxScreen -> componentDidUpdate -> componentDidUpdate"
      );
      this.readDocumentAsString();
    }
  }

  async saveImportRoute() {
    const save = await this.props.saveRoute(this.state.savedRoute);
    console.log("MG-log: GpxScreen -> saveRoute -> save", save);
  }

  openPicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: this.state.copyToCache
    });
    if (result.type === "success") {
      this.setState({ document: result });
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  async readDocumentAsString() {
    try {
      FileSystem.documentDirectory + "myroute.gpx";
      const res = await FileSystem.readAsStringAsync(this.state.document.uri);
      // const res = await FileSystem.readAsStringAsync(
      //   FileSystem.documentDirectory + "myroute.gpx"
      // );
      console.log("MG-log: GpxScreen -> readDocumentAs -> res", res);

      var rootNode = DomSelector(res);

      var xml = rootNode.getElementsByTagName("?xml");
      if (!xml[0]) {
        throw new Error("not xml");
      }
      if (!xml[0].attributes || xml[0].attributes.encoding !== "UTF-8") {
        throw new Error("use UTF-8 encoding");
      }
      var trk = rootNode.getElementsByTagName("trk");
      var name = " ";
      if (trk[0]) {
        name = this.getValueFromElement(trk[0].getElementsByTagName("name"));
      }

      var node = rootNode.getElementsByTagName("trkpt");
      let coords = this.getCoords(node);
      console.log(
        "MG-log: GpxScreen -> readDocumentAsString -> coords",
        coords
      );
      this.setState({
        savedRoute: {
          name,
          startDate: coords[0].timestamp,
          endDate: coords[coords.length - 1].timestamp,
          coords
        },
        error: false
      });
      return;
    } catch (error) {
      this.setState({ error: error.message, savedRoute: false });
      console.log(
        "MG-log: GpxScreen -> readDocumentAs -> error",
        error.message
      );
      return;
    }
  }
  _parseFloat(str) {
    let num = parseFloat(str);
    return typeof num === "number" ? num : str;
  }

  getCoords(trkpt) {
    if (!Array.isArray(trkpt)) {
      throw new Error("trkpt should be an Array!!!");
    }

    let coords = trkpt.map(node => {
      if (!(node.attributes && node.attributes.lat && node.attributes.lon)) {
        throw new Error("error node.attributes.lat or node.attributes.lon");
      }
      const latitude = node.attributes.lat;
      const longitude = node.attributes.lon;
      const altitude = this.getValueFromElement(
        node.getElementsByTagName("gpxtpx:altitude")
      );
      const heading = this.getValueFromElement(
        node.getElementsByTagName("ele")
      );
      const timestamp = this.getValueFromElement(
        node.getElementsByTagName("time")
      );
      const speed = this.getValueFromElement(
        node.getElementsByTagName("speed")
      );
      const image = this.getValueFromElement(node.getElementsByTagName("url"));

      return {
        latitude: this._parseFloat(latitude),
        longitude: this._parseFloat(longitude),
        altitude: this._parseFloat(altitude),
        heading: this._parseFloat(heading),
        timestamp: this._parseFloat(timestamp),
        speed: speed,
        image
      };
    });

    return coords;
  }

  getValueFromElement(elementArray) {
    if (!Array.isArray(elementArray)) {
      throw new Error("trkpt should be an Array!!!");
    }

    if (
      !elementArray.length ||
      !{}.hasOwnProperty.call(elementArray[0], "children") ||
      !elementArray[0].children.length
    ) {
      return null;
    }

    const element = elementArray[0].children[0];

    if (!{}.hasOwnProperty.call(element, "children")) {
      return elementArray[0].children[0].text;
    } else {
      return this.getValueFromElement(
        element.getElementsByTagName(element.tagName)
      );
    }
  }

  checkError() {
    if (this.state.error) {
      return (
        <View>
          <Text>{this.state.error}</Text>
          <Text>try again</Text>
        </View>
      );
    }
    return (
      <View>
        {this.renderSavedRoute()}
        {this.renderDocument()}
      </View>
    );
  }

  renderSavedRoute() {
    if (!this.state.savedRoute) {
      return null;
    }

    return (
      <View>
        <SimpleCardComponent
          route={{ _id: "none", comments: [], ...this.state.savedRoute }}
          shouldAnimation={true}
        />
        <Icon
          type="ionicons"
          name="ios-save"
          size={30}
          color="black"
          style={styles.icon}
          onPress={() => this.saveImportRoute()}
        />
      </View>
    );
  }

  renderDocument() {
    if (!this.state.document) {
      return null;
    }
    return (
      <View>
        {this.state.document.name.match(/\.(png|jpg)$/gi) ? (
          <Image
            source={{ uri: this.state.document.uri }}
            resizeMode="cover"
            style={{ width: 100, height: 100 }}
          />
        ) : null}
        <Text>
          {this.state.document.name} ({this.state.document.size / 1000} KB)
        </Text>
        <Text>URI: {this.state.document.uri}</Text>
        {!this.state.document.name.match(/\.(gpx|xml)$/gi) && (
          <Text>Błedny Format Pliku</Text>
        )}
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Button onPress={this.openPicker} title="Open document picker" />
          </View>
          {this.checkError()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  saveRoute
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(GpxScreen)
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    marginHorizontal: 0
  }
});
