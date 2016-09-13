// @flow
import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import SourcesView from '../components/SourcesView';

export default class SourcesScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Sources',
      tintColor: 'grey'
    },
  };

  removeSource = (source: Object) => {

  };

  addSource = (source: Object) => {

  };

  render() {
    return (
      <View
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
        {
          this.props.sources.length
            ? <SourcesView
            setOrdering={this.props.setOrdering}
            sources={this.props.sources}
          />
            : null
        }
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
