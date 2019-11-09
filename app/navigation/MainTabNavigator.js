import React from "react";

import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
// import { Ionicons, Entypo, MaterialCommunityIcons } from "@expo/vector-icons"; //TODO: Replace for Icon
import { CookieText } from "../components/CookieText";
import Icons from "../components/Icon";

import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import MapScreen from "../screens/MapScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";

const HomeScreenStack = createStackNavigator(
  {
    HomeStack: {
      screen: HomeScreen,
      navigationOptions: () => {
        return {
          headerLeft: (
            <Icons
              type="font-awesome"
              name="location-arrow"
              size={30}
              style={{ margin: 0, paddingLeft: 20, paddingRight: 0 }}
            />
          ),
          headerTitle: (
            <CookieText
              style={{
                fontSize: 40,
                paddingLeft: 0,
                margin: 0
              }}
            >
              My Route
            </CookieText>
          ),
          headerRight: (
            <Icons
              type="ionicons"
              name="ios-send"
              size={30}
              style={{ margin: 0, paddingRight: 20 }}
            />
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
        const { routeName } = navigation.state;

        return {
          title: routeName
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
          <Icons
            type="ionicons"
            name="md-settings"
            size={26}
            color={tintColor}
          />
          // <Ionicons name={"md-settings"} size={26} color={tintColor} />
        )
      }
    },
    Language: {
      screen: SettingsScreen,
      navigationOptions: {
        tabBarLabel: "Language",
        tabBarIcon: ({ tintColor }) => (
          // <Entypo name={"language"} size={26} color={tintColor} />
          <Icons type="entypo" name="language" size={26} color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: "Settings",
    tabBarPosition: "top",
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName
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
        const { routeName } = navigation.state;
        return {
          title: routeName,
          headerRight: (
            // <Ionicons
            //   style={{ paddingRight: 10 }}
            //   onPress={() => navigation.navigate("SettingsStack")}
            //   name="md-settings"
            //   size={30}
            //   color="black"
            // />
            <Icons
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
          <Icons
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

export default MainTabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeScreenStack,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          // <Ionicons name={"ios-home"} size={26} color={tintColor} />
          <Icons type="ionicons" name="ios-home" size={26} color={tintColor} />
        )
      }
    },
    Search: {
      screen: SearchScreenStack,
      navigationOptions: {
        tabBarLabel: "Search",
        tabBarIcon: ({ tintColor }) => (
          <Icons
            type="material-community"
            name="map-search"
            size={26}
            color={tintColor}
          />
          // <MaterialCommunityIcons
          //   name={"map-search"}
          //   size={26}
          //   color={tintColor}
          // />
        )
      }
    },
    Map: {
      screen: MapScreen,
      navigationOptions: {
        tabBarLabel: "Map",
        tabBarIcon: ({ tintColor }) => (
          // <Ionicons name={"md-map"} size={26} color={tintColor} />
          <Icons type="ionicons" name="md-map" size={26} color={tintColor} />
        )
      }
    },
    Profile: {
      screen: ProfileScreenStack,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          // <Ionicons name={"md-person"} size={26} color={tintColor} />
          <Icons type="ionicons" name="md-person" size={26} color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: "Home",
    shifting: false, //Color for the tab bar when the tab corresponding to the screen is active. Used for the ripple effect. This is only supported when shifting is true.
    labeled: true,
    activeColor: "#222",
    inactiveColor: "grey",
    barStyle: {
      backgroundColor: "#f2f2f2",
      height: 54
    }
  }
);
