import React from "react";

import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { Ionicons, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { CookieText } from "../components/CookieText";

import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import LanguageScreen from "../screens/LanguageScreen";
import MapScreen from "../screens/MapScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";

import i18next from "i18next";

const HomeScreenStack = createStackNavigator(
  {
    HomeStack: {
      screen: HomeScreen,
      navigationOptions: () => {
        return {
          headerTitle: (
            <CookieText
              style={{
                fontSize: 40,
                padding: 10
              }}
            >
              My Route
            </CookieText>
          )
        };
      }
    }
    // ViewSaveMap:{screen: ViewSaveMapScreen,
    // navigationOptions in ViewSaveMap.js
    // },
  },
  {
    initialRouteName: "HomeStack"
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
          <Ionicons name={"md-settings"} size={26} color={tintColor} />
        )
      }
    },
    Language: {
      screen: LanguageScreen,
      navigationOptions: () => {
        return {
          headerTitle: "Language",
          tabBarIcon: ({ tintColor }) => (
            <Entypo name={"language"} size={26} color={tintColor} />
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
            <Ionicons
              style={{ paddingRight: 10 }}
              onPress={() => navigation.navigate("SettingsStack")}
              name="md-settings"
              size={30}
              color="black"
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
          <Ionicons name={"md-settings"} size={26} color={tintColor} />
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
          <Ionicons name={"ios-home"} size={26} color={tintColor} />
        )
      }
    },
    Search: {
      screen: SearchScreenStack,
      navigationOptions: {
        tabBarLabel: "Search",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name={"map-search"}
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
          <Ionicons name={"md-map"} size={26} color={tintColor} />
        )
      }
    },
    Profile: {
      screen: ProfileScreenStack,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name={"md-person"} size={26} color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: "Search",
    shifting: false, //Color for the tab bar when the tab corresponding to the screen is active. Used for the ripple effect. This is only supported when shifting is true.
    labeled: false,
    activeColor: "#222",
    inactiveColor: "grey",
    barStyle: {
      backgroundColor: "#f2f2f2",
      height: 54
    }
  }
);

export default MainTabNavigator;
