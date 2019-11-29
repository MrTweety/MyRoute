import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";

const mockText =
  "💖💖💖Lorem ipsum dolor sit 💖💖💖Lorem ipsum dolor sit ametbfffffd bfbfg ametbfffffd bfbfg 💖💖💖Lorem ipsum dolor sit ametbfffffd bfbfg";

const DescriptionItem = ({ t, description }) => {
  const text = description || mockText;
  const [showAll, setShowAll] = useState(text.length <= 38);

  return (
    <View style={styles.description}>
      {showAll ? (
        <Text>{text}</Text>
      ) : (
        <View style={{ flexDirection: "row" }}>
          <Text>{text.substring(0, 38)}</Text>
          <TouchableOpacity onPress={() => setShowAll(s => !s)}>
            <Text style={styles.textMore}>{t("common.more")}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default withTranslation()(DescriptionItem);

DescriptionItem.propTypes = {
  t: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired
};
const styles = StyleSheet.create({
  description: {
    marginTop: 0,
    marginLeft: 10,
    marginBottom: 10,
    marginRight: 10
  },
  textMore: { fontWeight: "400", color: "gray" }
});
