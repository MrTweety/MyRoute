import React from "react";
import { View, Dimensions } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { CookieText } from "../modules/_common/components/CookieText";
import Icon from "../modules/_common/components/Icon";
import BubbleButton from "../modules/_common/components/BubbleButton";

import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import LanguageScreen from "../screens/LanguageScreen";
import MapScreen from "../screens/MapScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CommentScreen from "../screens/CommentScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
// import CameraScreen from "../screens/CameraScreen";
import i18next from "i18next";
const { width } = Dimensions.get("window");

const CommentStack = {
  screen: CommentScreen,
  navigationOptions: () => ({
    headerTitle: i18next.t("common.comments")
  }),
  headerLayoutPreset: "center"
};

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
    CommentStack: CommentStack,
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

const MapScreenStack = createStackNavigator(
  {
    MapStack: {
      screen: MapScreen,
      navigationOptions: () => ({
        header: null
      })
    }
    // CameraStack: {
    //   screen: CameraScreen,
    //   headerLayoutPreset: "center",
    //   header: null,
    //   headerMode: "none"
    // }
  },
  {
    initialRouteName: "MapStack",
    headerMode: "none"
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
    },
    CommentStack: CommentStack
  },
  { headerLayoutPreset: "center" }
);

const SettingsScreenTopTabNavigator = createMaterialTopTabNavigator(
  {
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        title: "Settings",
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
    swipeEnabled: false,
    initialRouteName: "Language",
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
    CommentStack: CommentStack,
    SettingsStack: {
      screen: LanguageScreen,
      navigationOptions: {
        title: "Settings",
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

const MainTabNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreenStack,
      navigationOptions: {
        // headerTitle: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon type="ionicons" name="ios-home" size={26} color={tintColor} />
        )
      }
    },
    Search: {
      screen: SearchScreenStack,
      navigationOptions: {
        // title: "Search",

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
      screen: MapScreenStack,
      navigationOptions: ({ navigation }) => {
        const currentRoute = navigation.state.routes[navigation.state.index];
        const { routeName } = currentRoute;

        let tabBarVisible = true;
        if (routeName === "CameraStack") {
          tabBarVisible = false;
        }
        return {
          tabBarIcon: ({ tintColor }) => (
            <Icon type="ionicons" name="md-map" size={26} color={tintColor} />
          ),
          tabBarVisible: tabBarVisible
        };
      }
    },
    Profile: {
      screen: ProfileScreenStack,
      navigationOptions: {
        // headerTitle: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <Icon type="ionicons" name="md-person" size={26} color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      console.log("MG-log: navigation.state.routes", navigation.state.routes);
      console.log("MG-log: navigation.state.index", navigation.state.index);
      console.log("MG-log: routeName", routeName);

      return {
        title: i18next.t(`common.${routeName}`),

        headerLeft: (
          <View
            style={{ marginLeft: width > 1024 ? 100 : 0, flexDirection: "row" }}
          >
            <Icon
              onPress={() => navigation.navigate("Home")}
              type="font-awesome"
              name="location-arrow"
              size={30}
              color="black"
              style={{ paddingRight: 5, paddingTop: 5 }}
            />
            {/* <Icon
              type="font-awesome"
              name="location-arrow"
              size={30}
              style={{ margin: 0, paddingLeft: 20, paddingRight: 0 }}
            /> */}
            <CookieText
              style={{
                fontSize: width > 1024 ? 40 : 32,
                paddingLeft: 2,
                margin: 0
              }}
            >
              My Route
            </CookieText>
          </View>
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
        headerRight:
          width < 1024 ? (
            <View style={{ flexDirection: "row" }}>
              <Icon
                onPress={() => navigation.navigate("Home")}
                type="ionicons"
                name="ios-home"
                size={26}
                color="black"
                style={{ paddingRight: 5 }}
              />
              <Icon
                onPress={() => navigation.navigate("Search")}
                type="material-community"
                name="map-search"
                size={26}
                color="black"
                style={{ paddingRight: 5 }}
              />
              <Icon
                onPress={() => navigation.navigate("Profile")}
                type="ionicons"
                name="md-person"
                size={26}
                color="black"
                style={{ paddingRight: 5 }}
              />

              <Icon
                type="ionicons"
                name="md-settings"
                size={26}
                color="black"
                onPress={() => navigation.navigate("SettingsStack")}
                style={{ paddingRight: 5 }}
              />
            </View>
          ) : (
            <View style={{ marginRight: 100, flexDirection: "row" }}>
              <BubbleButton
                onPress={() => navigation.navigate("Home")}
                icon={{
                  type: "ionicons",
                  name: "ios-home",
                  size: 26,
                  color: "black"
                }}
                iconLeft
              />
              <BubbleButton
                onPress={() => navigation.navigate("Search")}
                icon={{
                  type: "material-community",
                  name: "map-search",
                  size: 26,
                  color: "black"
                }}
                iconLeft
              />
              <BubbleButton
                onPress={() => navigation.navigate("Profile")}
                icon={{
                  type: "ionicons",
                  name: "md-person",
                  size: 26,
                  color: "black"
                }}
                iconLeft
              />
              <BubbleButton
                onPress={() => navigation.navigate("SettingsStack")}
                icon={{
                  type: "ionicons",
                  name: "md-settings",
                  size: 26,
                  color: "black"
                }}
                iconLeft
              />
            </View>
          )
      };
    },
    headerLayoutPreset: "center",
    // headerMode: "none",

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
