import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Icon from "./Icon";
import SimpleMap from "../../HomeScreenList/components/SimpleMap";
import DescriptionItem from "./DescriptionItem";

import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import isRoute from "../propTypes/isRoute";

class SimpleCardComponent extends Component {
  render() {
    const { t, route, shouldAnimation, navigation } = this.props;
    const { _id, comments, coords } = route;
    const description = route.name;

    return (
      <View style={styles.container}>
        <DescriptionItem description={description} />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <SimpleMap coords={coords} shouldAnimation={shouldAnimation} />
        </View>
      </View>
    );
  }
}

export default withTranslation()(SimpleCardComponent);

SimpleCardComponent.defaultProps = {
  shouldAnimation: false
};

SimpleCardComponent.propTypes = {
  t: PropTypes.func.isRequired,
  route: isRoute.isRequired,
  shouldAnimation: PropTypes.bool
  // navigation: PropTypes.node
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
