/** In order for logging to stream to XDE or the exp CLI you must import the
  * exponent module at some point in your app */
import Exponent from 'exponent';

import React from 'react';
import {
  AppRegistry,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import {
  NavigationProvider,
  StackNavigation,
} from '@exponent/ex-navigation';

import {
  FontAwesome,
} from '@exponent/vector-icons';

import Router from './navigation/Router';
import cacheAssetsAsync from './utilities/cacheAssetsAsync';

import {
  NavigationContext
} from '@exponent/ex-navigation';

import {Provider} from 'react-redux';

import store from './state/store';

const context = new NavigationContext({store, router: Router});

class AppContainer extends React.Component {
  state = {
    appIsReady: false,
  };

  componentWillMount() {
    this._loadAssetsAsync();
    store.dispatch({type: 'LOAD_SOURCES'});
  }

  async _loadAssetsAsync() {
    await cacheAssetsAsync({
      images: [
        require('./assets/images/exponent-wordmark.png'),
      ],
      fonts: [
        FontAwesome.font,
        {'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')},
      ],
    });

    this.setState({appIsReady: true});
  }

  render() {
    return this.state.appIsReady
      ? <Provider store={store}>
          <View style={styles.container}>
            <NavigationProvider context={context}>

              <StackNavigation
                  id='root'
                  initialRoute={Router.getRoute('rootNavigation')}
              />
            </NavigationProvider>

            {Platform.OS === 'ios' && <StatusBar barStyle='default'/>}
            {Platform.OS === 'android' &&
            <View style={styles.statusBarUnderlay}/>}
          </View>
        </Provider>
        : <Exponent.Components.AppLoading />;

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

AppRegistry.registerComponent('main', () => AppContainer);
