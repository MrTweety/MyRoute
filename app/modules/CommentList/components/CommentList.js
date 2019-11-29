import React from "react";
import Comment from "./Comment";
import { View } from "react-native";

export default CommentList = ({ comments, simpleView }) => {
  // console.log("MG-log: CommentList -> comments", comments);
  return (
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
};
