/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useCallback, useEffect} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';

import Network from './src/Network';
import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

const App: () => Node = () => {
  let [planets, setPlanets] = useState([]);
  const isDarkMode = useColorScheme() === 'dark';

  const getPlanets = useCallback(async () => {
    let planets = await Network.get('https://swapi.dev/api/planets/');
    console.log('Planets Received!', planets);
    setPlanets(planets.results);
  }, []);

  // the useEffect is only there to call `someAsyncFunction` at the right time
  useEffect(() => {
    console.log('Calling getPlanets');
    getPlanets()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <FlatList
        style={styles.flatlist}
        data={planets}
        renderItem={({item, index, separators}) => {
          console.log('item!', item);
          return <Text style={{flex: 1}}>{item.name}</Text>;
        }}
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'black',
  },
  flatlist: {
    flex: 1,
    padding: 8,
    backgroundColor: 'yellow',
  },
});
