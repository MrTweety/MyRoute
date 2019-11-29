import React, { Component } from "react";
import CommentList from "../modules/CommentList/container/HomeCommentList";

export default class CommentScreen extends Component {
  render() {
    const { navigation } = this.props;
    const routeId = navigation.getParam("_id", 0);
    console.log("MG-log: CommentScreen -> render -> routeId", routeId);
    const comments = navigation.getParam("comments", []);
    const description = navigation.getParam("description", "");
    // const route = navigation.getParam("route", 0);

    if (!routeId) {
      navigation.navigate("HomeStack");
    }

    return (
      <CommentList
        routeId={routeId}
        description={description}
        comments={comments}
        simpleView={false}
        {...this.props}
      />
    );
  }
}
