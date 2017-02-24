//@flow
import React from "react";

import { StyleSheet, View, Text } from "react-native";

import {
  StackNavigation,
  DrawerNavigation,
  DrawerNavigationItem
} from "@exponent/ex-navigation";

import { FontAwesome } from "@exponent/vector-icons";

import Colors from "../constants/Colors";
import Router from "../navigation/Router";

export default class RootNavigation extends React.Component {
  render() {
    return (
      <DrawerNavigation
        renderHeader={this._renderHeader}
        drawerWidth={260}
        drawerPosition={"right"}
        initialItem="home"
      >
        <DrawerNavigationItem
          id="home"
          renderTitle={isSelected => this._renderTitle("Home", isSelected)}
          renderIcon={isSelected => this._renderIcon("home", isSelected)}
        >
          <StackNavigation
            initialRoute={Router.getRoute("home", { sources: [], page: 0 })}
          />
        </DrawerNavigationItem>

        <DrawerNavigationItem
          id="sources"
          renderTitle={isSelected => this._renderTitle("Sources", isSelected)}
          renderIcon={isSelected => this._renderIcon("book", isSelected)}
        >
          <StackNavigation initialRoute={Router.getRoute("sources")} />
        </DrawerNavigationItem>

        <DrawerNavigationItem
          id="settings"
          renderTitle={isSelected => this._renderTitle("Settings", isSelected)}
          renderIcon={isSelected => this._renderIcon("cog", isSelected)}
        >
          <StackNavigation initialRoute={Router.getRoute("settings")} />
        </DrawerNavigationItem>
      </DrawerNavigation>
    );
  }

  _renderTitle(text: string, isSelected: boolean) {
    return (
      <Text
        style={[
          styles.buttonTitleText,
          isSelected ? styles.buttonTitleTextSelected : {}
        ]}
      >
        {text}
      </Text>
    );
  }

  _renderIcon(name: string, isSelected: boolean) {
    return (
      <FontAwesome
        name={name}
        size={32}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }

  _renderHeader() {
    return (
      <View
        style={{
          height: 75,
          paddingBottom: 12,
          paddingLeft: 12,
          backgroundColor: Colors.tintColor,
          justifyContent: "flex-end"
        }}
      >
        <Text style={{ fontSize: 18, color: "#fff" }}>
          Mainstream
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  selectedTab: {
    color: Colors.tabIconSelected
  },
  buttonTitleText: {
    color: Colors.drawerTextDefault,
    fontWeight: "bold",
    marginLeft: 18
  },
  buttonTitleTextSelected: {
    color: Colors.tintColor
  },
  selectedItemStyle: {
    backgroundColor: "#EBEBEB"
  }
});
