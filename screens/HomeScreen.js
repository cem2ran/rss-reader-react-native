import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Color from 'color';

import Alerts from '../constants/Alerts';

import Rss from '../api/rss';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomTabBar from '../components/CustomTabBar';

import MainList from '../components/MainList';
import Router from '../navigation/Router';

const MainListEl = React.createFactory(MainList);

import store from '../state/store';

const selectPage = reducers => reducers.sources.page;

const selectSources = reducers => reducers.sources.sources;

export class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: true,
      tintColor: 'white',
      title: ({sources, page}, config) => sources.length
        ? sources[page].name
        : 'Mainstream',
      backgroundColor: ({sources, page}, config) => sources.length
        ? sources[page].color
        : 'silver'
    },
  };

  componentWillMount() {
    //TODO: HACK :( if only props were accessible from title(props) and backgroundColor(props)
    this.unsubscribe = store.subscribe(() => {
      let previousPage = this.currentPage;
      let previousSources = this.currentSources;
      const state = store.getState();
      this.currentPage = selectPage(state);
      this.currentSources = selectSources(state);

      if (previousPage !== this.currentPage || previousSources !== this.currentSources) {
        this.props.navigator.updateCurrentRouteParams({
          sources: this.currentSources,//this.props.sources
          page: this.currentPage
        });
      }
    });

    this.props.dispatch({
      type: 'CHANGE_PAGE', page: 0
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  setActivePage = page => {
    this.props.dispatch({
      type: 'CHANGE_PAGE', page
    });
  };

  openPage = ({title, link}) => {

    const {navigator, sources, page} = this.props;

    navigator.push(Router.getRoute('article', {
      title, link: link.href, color: sources[page] && sources[page].color
    }));

  };

  render() {

    if (this.props.sources.length === 0) {
      return <View style={styles.container}>
        <Text>{'Empty State: ' + this.props.time}</Text>
      </View>;
    }

    let pages = this.props.sources.map(({name, icon, feed}, idx) => MainListEl({
      key: name, id: name, tabLabel: icon,
      onPress: (item) => this.openPage(item),
      onLongPress: (item) => {
        //TODO: Implement save for late / star
        console.log('onLongPress', item);
      },
      load: () => Rss.fetch(feed).catch(() => {
        this.props.navigator.showLocalAlert(
          'Load failed. Pull to reload',
          Alerts.error
        );
      })
    }));
    return (
      <View style={styles.container}>
        <ScrollableTabView
          onChangeTab={({i}) => {
            this.setActivePage(i);
          }}
          renderTabBar={() => <CustomTabBar
                colors={this.props.sources.map(s => Color(s.color).lighten(0.1).rgb())}
            />
            }>
          { pages }
        </ScrollableTabView>
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 80,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 19,
    color: 'rgba(96,100,109, 1)',
  },
  welcomeImage: {
    width: 200,
    height: 34.5,
    marginTop: 3,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 23,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {height: -3},
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
