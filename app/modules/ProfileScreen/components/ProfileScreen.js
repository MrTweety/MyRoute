import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StyleSheet
} from "react-native";
import ProfileInfo from "../../_common/components/ProfileInfo";
import CardComponent from "../../HomeScreenList/container/CardComponent";

class ProfileScreen extends Component {
  state = {
    viewableItemsMap: new Map(),
    refreshing: false
  };

  componentDidMount() {
    console.log(this.props.user);
    if (this.props.getRoutes) {
      this.props.getRoutes(this.props.user._id);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.getRoutes &&
      prevState.refreshing !== this.state.refreshing &&
      this.state.refreshing
    ) {
      this.props.getRoutes(this.props.user._id);
    }
    if (
      prevProps.userRoutes !== this.props.userRoutes &&
      !!this.props.userRoutes &&
      this.state.refreshing
    )
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

  renderNoData = fetchData => {
    const { t, userRoutes } = this.props;
    return (
      <View style={styles.container}>
        <ProfileInfo
          userName={this.props.user.name}
          routesNumber={userRoutes ? userRoutes.length : 0}
          folowersNumber={10}
          folowedByNumber={500}
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity onPress={fetchData}>
            <Text>
              {t("home.noData")}{" "}
              <Text style={{ color: "blue" }}>{t("common.tryAgain")}</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

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

  render() {
    const { t, userRoutes, navigation } = this.props;
    const { refreshing } = this.state;
    const { viewableItemsMap } = this.state;
    if ((userRoutes === null || userRoutes === undefined) && !refreshing) {
      return this.renderFetchLoading();
    }
    if (userRoutes && !userRoutes.length) {
      return this.renderNoData(() => this.props.getRoutes(this.props.user._id));
    }

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          viewabilityConfig={this.clippingListViewabilityConfig}
          data={userRoutes}
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
                user={this.props.user}
                withOutUserItem
              />
            );
          }}
          onViewableItemsChanged={this.onClippingListViewableChanged}
          ListHeaderComponent={
            <ProfileInfo
              userName={this.props.user.name}
              routesNumber={userRoutes ? userRoutes.length : 0}
              folowersNumber={10}
              folowedByNumber={500}
            />
          }
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});

export default ProfileScreen;
