// HomeScreenList

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
import CardComponent from "../../_common/components/CardComponent";
import PropTypes from "prop-types";
import isRoute from "../../_common/propTypes/isRoute";

class HomeScreenList extends Component {
  state = {
    viewableItemsMap: new Map(),
    refreshing: false
  };

  refCardsArray = [];

  componentDidMount() {
    if (this.props.fetchRoutes) {
      this.props.fetchRoutes();
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.props.fetchRoutes &&
      prevState.refreshing !== this.state.refreshing
    ) {
      await this.props.fetchRoutes();
      this.setState({ refreshing: false });
    }
  }

  renderFetchLoading = () => {
    const { t } = this.props;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  renderFetchErrorTryAgain = fetchData => {
    const { t } = this.props;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity onPress={fetchData}>
          <Text>
            {t("common.fetchError")}{" "}
            <Text style={{ color: "blue" }}>{t("common.tryAgain")}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderNoData = message => (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{message}</Text>
    </View>
  );

  renderContent = () => {
    const { homeRoutes } = this.props;
    return homeRoutes.data.map(route => (
      <CardComponent
        key={route._id}
        route={route}
        userName="User1"
        imageNr={0}
      />
    ));
  };
  handleRefresh = () => {
    this.setState({ refreshing: true });
  };

  //******************************************************* */
  //**************ListViewabilityConfig******************** */

  clippingListViewabilityConfig = {
    waitForInteraction: false,
    itemVisiblePercentThreshold: 30,
    minimumViewTime: 100 //In milliseconds
  };

  onClippingListViewableChanged = info => {
    console.log(
      "***************************NUMBER OF CURRENT VIEWABLE ITEMS:",
      info.viewableItems.length
    );

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
    const { t, homeRoutes, navigation } = this.props;
    // console.log("MG-log: HomeScreenList -> render -> homeRoutes", this.props.navigation)
    const { viewableItemsMap } = this.state;
    if (!homeRoutes)
      if (homeRoutes === null || homeRoutes === undefined) {
        // console.log("MG-log: HomeScreenList -> render -> homeRoutes", homeRoutes);
        return this.renderFetchLoading();
      }
    if (!homeRoutes) {
      return this.renderFetchErrorTryAgain(this.props.fetchRoutes);
    }
    if (!homeRoutes.length) {
      return this.renderNoData(t("homeScreen.noData"));
    }

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          viewabilityConfig={this.clippingListViewabilityConfig}
          data={homeRoutes}
          keyExtractor={item => item._id}
          extraData={viewableItemsMap}
          refreshing={this.state.refreshing}
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
    // return (
    //   <SafeAreaView style={styles.container}>
    //     <ScrollView>
    //       <CardComponent
    //         key={homeRoutes._id}
    //         route={homeRoutes[0]}
    //         userName="User1"
    //         imageNr={0}
    //       />
    //     </ScrollView>
    //   </SafeAreaView>
    // );
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
