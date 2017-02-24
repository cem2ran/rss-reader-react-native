import React, {
  Component,
  PropTypes,
} from 'react';

import {
  View,
  Text,
  ListView,
  ActivityIndicator,
  TouchableHighlight,
  RefreshControl
} from 'react-native';

import ListItem from './ListItem';

export default class MainList extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: this.ds.cloneWithRows([]),
      loading: true
    };
  }
  componentDidMount() {
    this._loadArticles();
  }

  _loadArticles = () => {
    this.props.load().then((responseData) => {
      if (responseData) {
        this.setState({
          dataSource: this.ds.cloneWithRows(responseData.query.results.feed.entry),
          loading: false
        });
      }
      else {
        this.setState({
          loading: false
        });
      }
    }).catch(() => {
      this.setState({
        loading: false
      });
    });

  };

  renderItem = (item, sectionID, rowID) => {
    return (
      <TouchableHighlight
        key={`${this.props.id}_${rowID}`}
        underlayColor='rgba(0,0,0,.1)'
        onPress={() => this.props.onPress(item) }
        onLongPress={() => this.props.onLongPress(item) }>
        <View>
          <ListItem {...item}/>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      this.state.loading
        ? <View style={{
          flex: 1,
          backgroundColor: '#F6F6F6',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ActivityIndicator size='large'/>
          <Text>Loading</Text>
        </View>
        : <ListView
          ref={this.props.id}
          style={{
            backgroundColor: '#F6F6F6'
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={this._loadArticles}
            />}
          initialListSize={15}
          dataSource={this.state.dataSource}
          keyboardDismissMode='on-drag'
          keyboardShouldPersistTaps="always" 
          showsVerticalScrollIndicator={false}
          renderRow={this.renderItem}/>
    );
  }
}

MainList.propTypes = {
  onPress: PropTypes.func.isRequired,
  load: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};
