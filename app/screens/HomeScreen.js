import React, { Component } from "react";
import HomeScreenList from "../modules/HomeScreenList/container/HomeScreenList";

export default class HomeScreen extends Component {
  render() {
    return <HomeScreenList {...this.props} />;
  }
}
