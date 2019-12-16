import React from "react";

import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { CookieText } from "../modules/_common/components/CookieText";
import Icon from "../modules/_common/components/Icon";

import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import LanguageScreen from "../screens/LanguageScreen";
import MapScreen from "../screens/MapScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CommentScreen from "../screens/CommentScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import i18next from "i18next";

const HomeScreenStack = createStackNavigator(
  {
    HomeStack: {
      screen: HomeScreen,
      navigationOptions: () => {
        return {
          headerLeft: (
            <>
              <Icon
                type="font-awesome"
                name="location-arrow"
                size={30}
                style={{ margin: 0, paddingLeft: 20, paddingRight: 0 }}
              />
              <CookieText
                style={{
                  fontSize: 40,
                  paddingLeft: 10,
                  margin: 0
                }}
              >
                My Route
              </CookieText>
            </>
          ),
          // headerTitle: (
          //   <CookieText
          //     style={{
          //       fontSize: 40,
          //       paddingLeft: 0,
          //       margin: 0
          //     }}
          //   >
          //     My Route
          //   </CookieText>
          // ),
          headerRight: (
            <Icon
              type="ionicons"
              name="ios-send"
              size={30}
              style={{ margin: 0, paddingRight: 20 }}
            />
          )
        };
      }
    },
    CommentStack: {
      screen: CommentScreen,
      navigationOptions: () => ({
        headerTitle: i18next.t("common.comments")
      }),
      headerLayoutPreset: "center"
    },
    BasicUserProfileStack: {
      screen: UserProfileScreen,
      navigationOptions: () => ({
        title: i18next.t("profile.title")
      }),
      headerLayoutPreset: "center"
    }
  },
  {
    initialRouteName: "HomeStack",
    headerLayoutPreset: "center"
  }
);

const SearchScreenStack = createStackNavigator(
  {
    SearchStack: {
      screen: SearchScreen,
      navigationOptions: ({ navigation }) => {
        return {
          title: navigation.getParam("title")
        };
      }
    }
  },
  { headerLayoutPreset: "center" }
);

const SettingsScreenTopTabNavigator = createMaterialTopTabNavigator(
  {
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        tabBarLabel: "Settings",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="ionicons"
            name="md-settings"
            size={26}
            color={tintColor}
          />
        )
      }
    },
    Language: {
      screen: LanguageScreen,
      navigationOptions: () => {
        return {
          headerTitle: "Language",
          tabBarIcon: ({ tintColor }) => (
            <Icon type="entypo" name={"language"} size={26} color={tintColor} />
          )
        };
      }
    }
  },
  {
    initialRouteName: "Settings",
    tabBarPosition: "top",
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        title: i18next.t(`common.${routeName}`)
      };
    },
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      inactiveTintColor: "grey",
      activeTintColor: "#222",
      indicatorStyle: { backgroundColor: "blue" },

      style: {
        backgroundColor: "#f2f2f2",
        height: 54
      }
    }
  }
);

const ProfileScreenStack = createStackNavigator(
  {
    ProfileStack: {
      screen: ProfileScreen,
      navigationOptions: ({ navigation }) => {
        return {
          title: i18next.t("common.profile"),
          headerRight: (
            <Icon
              type="ionicons"
              name="md-settings"
              size={30}
              color="black"
              style={{ paddingRight: 10 }}
              onPress={() => navigation.navigate("SettingsStack")}
            />
          )
        };
      }
    },
    SettingsStack: {
      screen: SettingsScreenTopTabNavigator,
      navigationOptions: {
        tabBarLabel: "Settings",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="ionicons"
            name="md-settings"
            size={26}
            color={tintColor}
          />
        )
      }
    }
  },
  { headerLayoutPreset: "center" }
);

const MainTabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeScreenStack,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon type="ionicons" name="ios-home" size={26} color={tintColor} />
        )
      }
    },
    Search: {
      screen: SearchScreenStack,
      navigationOptions: {
        tabBarLabel: "Search",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="map-search"
            size={26}
            color={tintColor}
          />
        )
      }
    },
    Map: {
      screen: MapScreen,
      navigationOptions: {
        tabBarLabel: "Map",
        tabBarIcon: ({ tintColor }) => (
          <Icon type="ionicons" name="md-map" size={26} color={tintColor} />
        )
      }
    },
    Profile: {
      screen: ProfileScreenStack,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <Icon type="ionicons" name="md-person" size={26} color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: "Home",
    shifting: false, //Color for the tab bar when the tab corresponding to the screen is active. Used for the ripple effect. This is only supported when shifting is true.
    labeled: false,
    activeColor: "#222",
    inactiveColor: "grey",
    height: 42,
    barStyle: {
      backgroundColor: "white", //"#f2f2f2",
      height: 44,
      paddingBottom: 2,
      marginBottom: 6,
      alignItems: "center"
    }
  }
);

export default MainTabNavigator;
