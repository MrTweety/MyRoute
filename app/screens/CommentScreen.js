import React, { Component } from "react";
import CommentList from "../modules/CommentList/container/HomeCommentList";

export default class CommentScreen extends Component {
  render() {
    const { navigation } = this.props;
    const route = navigation.getParam("route", null);

    if (!route) {
      navigation.navigate("HomeStack");
    }

    return (
      <CommentList
        routeId={route._id}
        description={route.name}
        routeEndDate={route.endDate}
        routeAuthor={route.routeAuthor}
        {...this.props}
      />
    );
  }
}
