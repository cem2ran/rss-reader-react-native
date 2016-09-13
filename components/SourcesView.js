import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
} from 'react-native';

import SortableListView from 'react-native-sortable-listview';

const getKeys = sources => sources.reduce((acc, item) =>
  [...acc, item.feed], []);

const getMap = sources => sources.reduce((acc, item) => {
  acc[item.feed] = item;
  return acc;
}, {});

const SourcesView = ({sources, setOrdering, handlePress}) => {
  return (
    <SortableListView
      style={{flex: 1}}
      order={getKeys(sources)}
      data={getMap(sources)}
      onRowMoved={setOrdering}
      renderRow={source =>
        <TouchableOpacity style={styles.optionsContainer} onPress={handlePress}>
          <View style={styles.option}>
            <View style={styles.optionIconContainer}>
              <Image
                source={require('../assets/images/exponent-icon.png')}
                resizeMode='contain'
                fadeDuration={0}
                style={{width: 20, height: 20, marginTop: 1}}
              />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>
                {source.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      }
    />);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15
  },
  optionsTitleText: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 9,
    marginBottom: 12
  },
  optionsContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EDEDED'
  },
  optionIconContainer: {
    marginRight: 9
  },
  option: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.02)',
    paddingHorizontal: 15,
    paddingVertical: 15
  },
  optionText: {
    fontSize: 15,
    marginTop: 1
  }
});

export default SourcesView;
