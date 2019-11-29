import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

import PropTypes from "prop-types";
import isComment from "../../_common/propTypes/isComment";

export default function Comment({ comment, simpleView }) {
  const { _id, author, parens, date } = comment;
  const commentStr = comment.comment;

  const renderSimpleView = () => {
    return (
      <View style={{ marginHorizontal: !parens ? 10 : 20, marginTop: 5 }}>
        <Text>
          <Text style={{ fontWeight: "900" }}>{author.name} </Text>
          {commentStr}
        </Text>
      </View>
    );
  };

  return renderSimpleView();
}

Comment.defaultProps = {
  simpleView: true
};

Comment.propTypes = {
  comment: isComment.isRequired,
  simpleView: PropTypes.bool
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "green"
    paddingBottom: 5,
    marginBottom: 10,
    borderBottomColor: "grey"
  },
  icons: {
    flexDirection: "row",
    marginVertical: 10
  },
  icon: {
    marginLeft: 10
  }
});
