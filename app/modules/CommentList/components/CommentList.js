import React, { useState } from "react";
import Comment from "./Comment";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput
} from "react-native";
import Icon from "../../_common/components/Icon";

export default CommentList = ({
  routeId,
  description,
  comments,
  simpleView,
  addComment
}) => {
  const [value, onChangeText] = React.useState("");

  const addCommentButton = () => {
    console.log("MG-log: addComment -> addComment", value);
    addComment({ id: routeId, comment: value });
    onChangeText("");
  };
  const renderSimpleView = () => (
    <>
      {comments.map(
        comment =>
          !comment.parens && (
            <View key={comment._id}>
              <Comment
                key={comment._id}
                comment={comment}
                simpleView={simpleView}
              />
              {comments.map(
                response =>
                  response.parens &&
                  response.parens === comment._id && (
                    <Comment
                      key={response._id}
                      comment={response}
                      simpleView={simpleView}
                    />
                  )
              )}
            </View>
          )
      )}
    </>
  );

  const renderDescription = () => (
    <>
      <Comment
        comment={{
          _id: "description",
          comment: description,
          author: { name: routeId }
        }}
        simpleView={!!simpleView}
      />
      <View
        style={{
          margin: 10,
          borderBottomColor: "gray",
          borderBottomWidth: 1
        }}
      />
    </>
  );

  const renderNewComment = () => {
    return (
      <View
        style={{
          margin: 10,
          flexDirection: "row"
        }}
      >
        <View
          style={{
            borderBottomColor: "gray",
            borderBottomWidth: 1
          }}
        />
        <Image
          style={{
            width: 40,
            height: 40,
            borderRadius: 20
          }}
          source={{ uri: "https://www.w3schools.com/howto/img_avatar.png" }}
        />
        <View
          style={{
            flex: 1,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 20,
            marginLeft: 10,
            paddingHorizontal: 15,
            paddingVertical: 5,
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <TextInput
            style={{
              flex: 1
            }}
            placeholder="Add a comment..."
            placeholderTextColor="gray"
            multiline={true}
            value={value}
            onChangeText={text => onChangeText(text)}
          />
          <Icon
            type="ionicons"
            name={"ios-send"}
            size={30}
            color={"black"}
            style={{
              marginLeft: 10
            }}
            onPress={addCommentButton}
          />
        </View>
      </View>
    );
  };

  return simpleView ? (
    renderSimpleView()
  ) : (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {renderDescription()}
        {renderSimpleView()}
      </ScrollView>
      {renderNewComment()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    marginHorizontal: 10
  },
  text: {
    fontSize: 42
  }
});
