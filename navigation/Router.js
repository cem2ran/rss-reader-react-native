// @flow
import {connect} from 'react-redux';

import {
  createRouter,
} from '@exponent/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import ArticleScreen from '../screens/ArticleScreen';
import SourcesScreen from '../screens/SourcesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RootNavigation from './RootNavigation';

const mapSourcesToProps = (reducers) => ({
  sources: reducers.sources.sources
});

const mapDispatchToProps = (dispatch) => ({
  setOrdering({from, to}) {
    dispatch({type: 'REORDER_SOURCES', from, to});
    dispatch({type: 'PERSIST_SOURCES'});
  }
});

export default createRouter(() => ({
  home: () => connect(mapSourcesToProps)(HomeScreen),
  article: () => ArticleScreen,
  sources: () => connect(mapSourcesToProps, mapDispatchToProps)(SourcesScreen),
  settings: () => SettingsScreen,
  rootNavigation: () => RootNavigation,
}));
