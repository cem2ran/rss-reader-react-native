import React from "react";

import { View, Text, StyleSheet } from "react-native";

const ListItem = ({ title, published, updated }) => (
  <View>
    <View style={styles.row}>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.description}>
        {new Date(published || updated).toDateString()}
      </Text>
    </View>
    <View style={styles.separator} />
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: "#F6F6F6"
  },
  title: {
    paddingTop: 10,
    paddingBottom: 25,
    paddingRight: 15,
    fontSize: 16,
    flex: 1
  },
  description: {
    color: "#B4AEAE",
    fontSize: 12,
    position: "absolute",
    left: 14,
    bottom: 4
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  }
});

export default ListItem;
