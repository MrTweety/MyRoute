import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";

const NoData = ({ t, infoKey, fetchData }) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <TouchableOpacity onPress={fetchData}>
      <Text>
        {t(infoKey)}{" "}
        <Text style={{ color: "blue" }}>{t("common.tryAgain")}</Text>
      </Text>
    </TouchableOpacity>
  </View>
);

NoData.defaultProps = {
  fetchData: () => console.log("missing fetchData"),
  infoKey: "common.noData"
};

NoData.propTypes = {
  t: PropTypes.func.isRequired,
  fetchData: PropTypes.func,
  infoKey: PropTypes.string
};

export default withTranslation()(NoData);
