/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import x from './Polyfills/console';

import React, {useState, useCallback, useEffect} from 'react';

import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import PlanetRepository from './Repositories/PlanetRepository';
import PlanetList from './Planets/PlanetComponent';
import PlanetComponent from './Planets/PlanetComponent';
import AppConfig from './AppConfig';
import {useNetInfo} from '@react-native-community/netinfo';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NetInfo />
      <PlanetComponent debug={AppConfig.debug_mode} />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'white',
  },
  flatlist: {
    flexGrow: 0,
    padding: 8,
    backgroundColor: 'yellow',
  },
});

export const NetInfo = () => {
  return (
    <View style={{height: 50, width: '100%', backgroundColor: 'green'}}>
      <Text>Device Online: {useNetInfo().isConnected?.toString()}</Text>
    </View>
  );
};
