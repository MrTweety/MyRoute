import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, ActivityIndicator } from "react-native";
import Icon from "../../_common/components/Icon";
import PropTypes from "prop-types";

const AddNewComment = ({
  t,
  routeId,
  parentComment,
  userName: parentUserName,
  status,
  addComment,
  onSuccess,
  user
}) => {
  const [value, onChangeText] = React.useState("");

  useEffect(() => {
    if (status) {
      onChangeText("");
      onSuccess();
    }
  }, [status]);

  const addCommentButton = () => {
    addComment(
      { routeId, comment: value, parens: parentComment, author: user._id },
      { user }
    );
  };

  const renderAddIcon = () => {
    return status === null ? (
      <ActivityIndicator size="small" />
    ) : (
      <Icon
        type="ionicons"
        name={"ios-send"}
        size={30}
        color={status !== false ? "black" : "red"}
        style={{
          marginLeft: 10
        }}
        onPress={addCommentButton}
      />
    );
  };

  const renderNewComment = () => {
    return (
      <View
        style={{
          marginTop: 5,
          flexDirection: "column"
        }}
      >
        {parentUserName && (
          <View
            style={{
              marginBottom: 2,
              flexDirection: "row",
              backgroundColor: "#B0B0B0",
              justifyContent: "space-between",
              alignItems: "center",
              paddingLeft: 10,
              paddingRight: 25,
              paddingVertical: 5
            }}
          >
            <Text>
              {t("comment.replyTo")} {parentUserName}
            </Text>
            <Icon
              type="Feather"
              name={"x"}
              size={15}
              color="black"
              style={{
                marginLeft: 10
              }}
              onPress={onSuccess}
            />
          </View>
        )}
        <View
          style={{
            marginHorizontal: 10,
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
            source={{
              uri: user && user.avatar
            }}
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
            <View
              style={{
                flex: 1,
                flexDirection: "column"
              }}
            >
              {/*{parentUserName && (
              <Text>
                @{parentUserName}
             </Text>
            )}*/}

              <TextInput
                style={{}}
                placeholder="Add a comment..."
                placeholderTextColor="gray"
                multiline={true}
                value={value}
                onChangeText={text => onChangeText(text)}
              />
            </View>
            {renderAddIcon()}
          </View>
        </View>
      </View>
    );
  };

  return renderNewComment();
};

AddNewComment.propTypes = {
  // user: isUser.isRequired,
  t: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  parentComment: PropTypes.string,
  routeId: PropTypes.string,
  userName: PropTypes.string,
  status: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
};

export default AddNewComment;
