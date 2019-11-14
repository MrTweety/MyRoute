import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";

import Exemplar from "../modules/exemplar/container/Exemplar";
import AnimatingPolyline from "../components/AnimatingPolyline";
class SearchScreen extends Component {
  render() {
    return <AnimatingPolyline nrRoute={2} />;
  }
}

export default SearchScreen;
