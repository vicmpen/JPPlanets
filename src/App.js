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
} from 'react-native';

import PlanetRepository from './Repositories/PlanetRepository';
import PlanetList from './Planets/PlanetComponent';
import PlanetComponent from './Planets/PlanetComponent';
import AppConfig from './AppConfig';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
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
