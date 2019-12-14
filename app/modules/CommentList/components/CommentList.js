/*
 * TODO:
 *  usuwanie
 *  edaycja komentarzy
 *  zgłaszanie
 *  <3
 *  oznaczanie użytkowników
 * */

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  Text
} from "react-native";
import Comment from "./Comment";
import AddNewComment from "../container/AddNewComment";
import ErrorFetchTryAgain from "../../_common/components/ErrorFetchTryAgain";
import NoData from "../../_common/components/NoData";

export default CommentList = ({
  t,
  routeId,
  description,
  comments,
  simpleView,
  fetchComments,
  routeAuthor,

  routeEndDate
}) => {
  useEffect(() => {
    if (fetchComments) {
      fetchComments({ routeId });
    }
  }, [fetchComments]);

  const [replyComment, setParentComment] = useState({
    parentId: null,
    myId: null,
    userName: null
  });

  const onClickReply = useCallback(
    (myId, parentId, userName) => {
      if (myId != replyComment.myId) {
        setParentComment({ parentId: parentId, myId: myId, userName });
      } else {
        setNullParentComment();
      }
    },
    [replyComment]
  );

  const setNullParentComment = () => {
    setParentComment({ parentId: null, myId: null, userName: null });
  };

  const renderDescription = () => (
    <>
      <Comment
        comment={{
          _id: "description",
          comment: description,
          author: routeAuthor,
          date: routeEndDate
        }}
        simpleView={!!simpleView}
      />
      <View
        style={{
          margin: 5,
          marginBottom: 0,
          borderBottomColor: "#B0B0B0",
          borderBottomWidth: 1,
          elevation: 5
        }}
      />
    </>
  );

  const renderCommentsList = () => (
    <FlatList
      data={comments && comments.filter(comment => !comment.parens)}
      keyExtractor={item => item._id}
      refreshing={!comments && comments !== false}
      onRefresh={() => fetchComments({ routeId })}
      // onEndReached={() => fetchComments({ routeId })}
      // onEndReachedThreshold={0}
      extraData={replyComment}
      renderItem={({ item, index }) => {
        return (
          <View>
            <Comment
              comment={item}
              simpleView={true}
              onClickReply={onClickReply}
              parentComment={replyComment.myId}
            />
            {comments.map(
              response =>
                response.parens &&
                response.parens === item._id && (
                  <Comment
                    key={response._id}
                    comment={response}
                    onClickReply={onClickReply}
                    parentComment={replyComment.myId}
                  />
                )
            )}
          </View>
        );
      }}
    />
  );

  const renderContent = () => {
    if (comments === false) {
      return (
        <ScrollView>
          <ErrorFetchTryAgain fetchData={() => fetchComments({ routeId })} />
        </ScrollView>
      );
    }
    if (comments && comments.length == 0) {
      return (
        <ScrollView>
          <NoData
            fetchData={() => fetchComments({ routeId })}
            infoKey={"comment.noData"}
          />
        </ScrollView>
      );
    }
    return renderCommentsList();
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderDescription()}
      {renderContent()}
      <AddNewComment
        routeId={routeId}
        parentComment={replyComment.parentId || replyComment.myId}
        userName={replyComment.userName}
        onSuccess={() => setNullParentComment()}
      />
    </SafeAreaView>
  );
};

//routeAuthor: isUser.isRequired
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
