import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";

const ErrorFetchTryAgain = ({ t, fetchData }) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <TouchableOpacity onPress={fetchData}>
      <Text>
        {t("common.fetchError")}{" "}
        <Text style={{ color: "blue" }}>{t("common.tryAgain")}</Text>
      </Text>
    </TouchableOpacity>
  </View>
);

ErrorFetchTryAgain.defaultProps = {
  fetchData: () => console.log("missing fetchData")
};

ErrorFetchTryAgain.propTypes = {
  t: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired
};

export default withTranslation()(ErrorFetchTryAgain);
