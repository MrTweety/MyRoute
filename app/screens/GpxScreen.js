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
import DomSelector from "react-native-dom-parser";

// import tj from "@mapbox/togeojson";

export default class GpxScreen extends Component {
  state = {
    copyToCache: true
  };

  _openPicker = async () => {
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

  async readDocumentAs() {
    try {
      FileSystem.documentDirectory + "myroute.gpx";
      // const res = await FileSystem.readAsStringAsync(document.uri);
      const res = await FileSystem.readAsStringAsync(
        FileSystem.documentDirectory + "myroute.gpx"
      );
      console.log("MG-log: GpxScreen -> readDocumentAs -> res", res);

      this.rootNode = DomSelector(res);
      // console.log(
      // "MG-log: GpxScreen -> readDocumentAs -> document",
      // this.rootNode.children[0].children[1]
      // );
      console.log("test");

      // var node = this.rootNode.getElementsByTagName("gpx");
      // node = node.children[0].getElementsByTagName("trk");
      var node = this.rootNode.getElementsByTagName("trkpt");
      this.getCoords(node);
      console.log(
        "node:",
        node[0].getElementsByTagName("gpxtpx:altitude")[0].children[0].text
      );
      console.log("test2");
    } catch (error) {
      console.log("MG-log: GpxScreen -> readDocumentAs -> error", error);
    }

    return null;
  }

  getCoords(trkpt) {
    if (!Array.isArray(trkpt)) {
      throw new Error("trkpt should be an Array!!!");
    }

    newTrkpt = trkpt.map(node => {
      // latitude: coords.latitude,
      // longitude: coords.longitude,
      // altitude: coords.altitude,
      // heading: coords.heading,
      // timestamp: timestamp,
      // speed: coords.speed

      const latitude = node.attributes.lat;
      // console.log("MG-log: GpxScreen -> getCoords -> latitude", latitude)

      const longitude = node.attributes.lon;
      // console.log("MG-log: GpxScreen -> getCoords -> longitude", longitude)

      const altitude = node.getElementsByTagName("gpxtpx:altitude")[0]
        .children[0].text;
      // console.log("MG-log: GpxScreen -> getCoords -> altitude", altitude)

      const heading = node.getElementsByTagName("ele")[0].children[0].text;
      // console.log("MG-log: GpxScreen -> getCoords -> heading", heading)

      const timestamp = this.getValueFromElement(
        node.getElementsByTagName("time")
      );
      console.log("MG-log: GpxScreen -> getCoords -> timestamp", timestamp);
      console.log(
        "MG-log: GpxScreen -> getCoords -> timestamp",
        new Date(timestamp).getTime()
      );

      const speed = this.getValueFromElement(
        node.getElementsByTagName("speed")
      );
      console.log("MG-log: GpxScreen -> getCoords -> speed", speed);
      // this.getValueFromElement(node.getElementsByTagName("time"));
      // this.getValueFromElement(node.getElementsByTagName("speed"));
      // node.children.map(chil=>{
      // console.log("MG-log: GpxScreen -> getCoords -> chil.name", chil.tagName) })
    });
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
    // console.log("MG-log: GpxScreen -> getValueFromElement -> elementArray[0]", elementArray[0])
    // console.log("MG-log: GpxScreen -> getValueFromElement -> elementArray[0].children[0]", elementArray[0].children[0])
    // console.log("MG-log: GpxScreen -> getValueFromElement -> elementArray[0].children[0].text", elementArray[0].children[0].text)
    return elementArray[0].children[0].text;
  }

  ///////////////////////////////////////

  async readDocumentAsV1() {
    // const { document } = this.state;
    // if (!document) {
    //   return null;
    // }
    try {
      FileSystem.documentDirectory + "myroute.gpx";
      // const res = await FileSystem.readAsStringAsync(document.uri);
      const res = await FileSystem.readAsStringAsync(
        FileSystem.documentDirectory + "myroute.gpx"
      );
      console.log("MG-log: GpxScreen -> readDocumentAs -> res", res);

      console.log("MG-log: GpxScreen -> readDocumentAs -> res", res);
      // const res2 = res.replace(/ /g, "")
      console.log("MG-log: GpxScreen -> readDocumentAs -> res2", res2);

      // const res3 = res.replace(/\\n/g, '')

      this.rootNode = await DomSelector(res);
      console.log(
        "MG-log: GpxScreen -> readDocumentAs -> document",
        this.rootNode.children[0].children[1]
      );
      console.log(Object.keys(this.rootNode.children[0]));
      // await this.rootNodeMap(this.rootNode);

      console.log(
        "MG-log: GpxScreen -> readDocumentAs -> rootNode",
        this.geoJson
      );

      console.log(
        "MG-log: GpxScreen -> readDocumentAs -> rootNode",
        this.rootNode
      );

      // rootNode.children.map(rs => console.log("1"));
    } catch (error) {}

    return null;
  }

  geoJson = {
    cosrds: []
  };
  lastTag = "";

  newObj = {};

  aaaa(obj) {
    console.log("test");
    switch (this.lastTag) {
      case undefined:
        console.log("Oranges are $0.59 a pound.");
        break;
      case "<gpxtpx:altitude>":
        if (!obj.tagName) {
          this.newObj = { ...this.newObj, altitude: obj.text };
        } else {
          this.newObj = { ...this.newObj, ...obj.attributes };
        }
        break;
      case "Papayas":
        console.log("Mangoes and papayas are $2.79 a pound.");
        // expected output: "Mangoes and papayas are $2.79 a pound."
        break;
      default:
        console.log(
          "MG-log: GpxScreen -> aaaa -> obj.attributes",
          obj.attributes
        );

        // this.newObj = { ...this.newObj, ...obj.attributes };
        console.log("MG-log: GpxScreen -> aaaa -> obj.attributes", this.newObj);
      // break;
    }
    console.log("test2");
    if (obj.tagName) {
      this.lastTag = obj.text;
    }
    if (this.lastTag === "<gpxtpx:altitude>" && !obj.tagName) {
      console.log("test3");
      this.geoJson.cosrds.push(this.newObj);
      this.newObj = {};
    }
  }

  rootNodeMap(rootNode) {
    rootNode.children.map(rs => {
      rs.tagName && console.log(rs.text);
      this.aaaa(rs);
      if ({}.hasOwnProperty.call(rs, "children")) {
        this.rootNodeMap(rs);
      }
    });
  }

  _renderDocument() {
    if (!this.state.document) {
      return null;
    }
    console.log(
      "MG-log: GpxScreen -> _renderDocument -> this.state.document",
      this.state.document
    );
    this.readDocumentAs();
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
    this.readDocumentAs();
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Button onPress={this._openPicker} title="Open document picker" />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    marginHorizontal: 10
  }
});
