import React from "react";

import { StyleSheet, View, TouchableOpacity, Image } from "react-native";

var styles = StyleSheet.create({
  iconbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  favicon: {
    width: 22,
    height: 22,
    margin: 6,
    opacity: 0.7
  }
});

const isActive = (activeTab, idx) => activeTab === idx;

const CustomTabBar = ({ tabs, activeTab, goToPage, colors }) => (
  <View style={[styles.iconbar, { backgroundColor: colors[activeTab] }]}>
    {tabs.map((tab, idx) => (
      <TouchableOpacity key={idx} onPress={() => goToPage(idx)}>
        <Image
          style={[
            styles.favicon,
            isActive(activeTab, idx) ? { opacity: 1 } : {}
          ]}
          source={tab}
        />
      </TouchableOpacity>
    ))}
  </View>
);

CustomTabBar.propTypes = {
  goToPage: React.PropTypes.func,
  activeTab: React.PropTypes.number,
  tabs: React.PropTypes.array
};

export default CustomTabBar;
