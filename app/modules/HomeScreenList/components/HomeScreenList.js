import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { withTranslation } from "react-i18next";
import CardComponent from "../container/CardComponent";
import PropTypes from "prop-types";
import isRoute from "../../_common/propTypes/isRoute";
import ErrorFetchTryAgain from "../../_common/components/ErrorFetchTryAgain";
import NoData from "../../_common/components/NoData";

class HomeScreenList extends Component {
  state = {
    viewableItemsMap: new Map(),
    refreshing: false
  };

  componentDidMount() {
    if (this.props.fetchRoutes) {
      this.props.fetchRoutes();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.fetchRoutes &&
      prevState.refreshing !== this.state.refreshing &&
      this.state.refreshing
    ) {
      this.props.fetchRoutes();
    }
    if (prevProps.homeRoutes !== this.props.homeRoutes && this.state.refreshing)
      this.setState({ refreshing: false });
  }

  handleRefresh = () => {
    this.setState({ refreshing: true });
  };

  renderFetchLoading = () => {
    const { t } = this.props;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  //******************************************************* */
  //**************ListViewabilityConfig******************** */

  clippingListViewabilityConfig = {
    waitForInteraction: false,
    itemVisiblePercentThreshold: 30,
    minimumViewTime: 100 //In milliseconds
  };

  onClippingListViewableChanged = info => {
    const viewableItems = info.viewableItems.map(item => item.index);
    const viewableItemsMap = new Map();
    viewableItems.map(id => viewableItemsMap.set(id, true));

    this.setState({
      ...this.state,
      viewableItemsMap: viewableItemsMap
    });
  };

  //******************************************************* */
  //******************************************************* */

  render() {
    const { t, homeRoutes, navigation, fetchRoutes } = this.props;
    const { refreshing } = this.state;
    const { viewableItemsMap } = this.state;
    if ((homeRoutes === null || homeRoutes === undefined) && !refreshing) {
      return this.renderFetchLoading();
    }
    if (!homeRoutes && !refreshing) {
      console.log("homeRoutes", homeRoutes);
      return <ErrorFetchTryAgain fetchData={fetchRoutes} />;
    }
    if (homeRoutes && !homeRoutes.length) {
      return <NoData fetchData={fetchRoutes} infoKey={"home.noData"} />;
    }

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          viewabilityConfig={this.clippingListViewabilityConfig}
          data={homeRoutes}
          keyExtractor={item => item._id}
          extraData={viewableItemsMap}
          refreshing={refreshing}
          onRefresh={this.handleRefresh}
          renderItem={({ item, index }) => {
            return (
              <CardComponent
                shouldAnimation={viewableItemsMap.get(index)}
                key={index}
                route={item}
                imageNr={0}
                navigation={navigation}
              />
            );
          }}
          onViewableItemsChanged={this.onClippingListViewableChanged}
        />
      </SafeAreaView>
    );
  }
}

export default withTranslation()(HomeScreenList);

HomeScreenList.propTypes = {
  t: PropTypes.func.isRequired,
  fetchRoutes: PropTypes.func.isRequired,
  homeRoutes: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf(isRoute).isRequired
  ])
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});
