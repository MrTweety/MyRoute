import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

import PropTypes from "prop-types";
import isComment from "../../_common/propTypes/isComment";
import dateFormat from "../../../services/dateFormat";
import { withTranslation } from "react-i18next";

const Comment = ({ t, comment, onClickReply, parentComment }) => {
  const { _id, author, parens, date } = comment;
  const commentStr = comment.comment;

  const renderComment = () => {
    return (
      <View
        style={{
          marginLeft: !parens ? 10 : 30,
          marginRight: 10,
          marginTop: 5,
          flexDirection: "row",
          alignItems: "center"
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
            uri: author && author.avatar
          }}
        />
        <View
          style={{
            flex: 1,
            marginLeft: 10,
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
            <Text>
              <Text style={{ fontWeight: "900" }}>
                {author && author.name}{" "}
              </Text>
              {/*{parens && <Text>@{parens}</Text>} */}
              <Text>{commentStr}</Text>
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between" // "space-around"
              }}
            >
              {onClickReply && (
                <TouchableOpacity
                  onPress={() => onClickReply(_id, parens, author.name)}
                >
                  <Text style={styles.textGrayM}>
                    {parentComment !== _id
                      ? t("comment.reply")
                      : t("comment.cancelReply")}{" "}
                  </Text>
                </TouchableOpacity>
              )}

              <Text style={styles.textGrayS}>{dateFormat(date)}</Text>
              {/*<Text>edit</Text>*/}
            </View>
          </View>
        </View>
      </View>
    );
  };

  return renderComment();
};
Comment.defaultProps = {
  simpleView: true
};

Comment.propTypes = {
  comment: isComment.isRequired,
  t: PropTypes.func.isRequired,
  onClickReply: PropTypes.func,
  parentComment: PropTypes.string
};

export default withTranslation()(Comment);

const styles = StyleSheet.create({
  textGrayS: { fontWeight: "400", color: "gray" },
  textGrayM: { fontWeight: "400", color: "gray" }
});
