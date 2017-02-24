import React from "react";
import { View, WebView, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6EF",
    flexDirection: "column"
  }
});

export default class ArticleScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: true,
      tintColor: "white",
      title: ({ title }) =>
        title.slice(0, 24) + (title.length > 24 ? "..." : ""),
      backgroundColor: ({ color }) => color
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <WebView source={{ uri: this.props.link }} startInLoadingState={true} />
      </View>
    );
  }
}
