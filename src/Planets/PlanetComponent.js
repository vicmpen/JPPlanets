import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import PlanetRepository from '../Repositories/PlanetRepository';
import PlanetContainer, {usePlanets} from '../hooks/usePlanets';

//Helper Components
const EmpyList = () => {
  return <Text>No Planets Nearby! Swipe To load!</Text>;
};

const renderSeparator = () => {
  return <View style={styles.separator} />;
};

const PlanetEntry = ({item, index, separators}) => {
  const {name, gravity, rotation_period} = item;
  return (
    <View style={styles.planet}>
      <Text style={styles.planetName}>{name}</Text>
      <Text>
        <Text style={styles.label}>Gravity:</Text> {gravity}
      </Text>
      <Text>
        <Text style={styles.label}>Rotation Period:</Text> {rotation_period}
      </Text>
    </View>
  );
};

//Helper View to control Storage manually. Can be extended with any debug functionality
const PlanetRepoControlView = ({debug}) => {
  if (!debug) {
    return null;
  }
  return (
    <View>
      <TouchableOpacity onPress={PlanetRepository.deleteAllPlanets}>
        <Text>Clear Storage</Text>
      </TouchableOpacity>
    </View>
  );
};

const PlanetComponent = ({debug}) => {
  const forceReload = useRef(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  //using the ref, we avoid relying on isRefreshing changes, that will trigger usePlanet to be called again
  let [planets, loading] = usePlanets(forceReload.current);
  console.log('planet Refreshing, ', isRefreshing);

  const handleRefresh = () => {
    forceReload.current = true;
    setIsRefreshing(true);
  };

  //When the planets change, toggle refreshing states to false
  useEffect(() => {
    forceReload.current = false;
    setIsRefreshing(false);
  }, [planets]);

  return (
    <>
      <FlatList
        ListEmptyComponent={EmpyList}
        style={styles.flatlist}
        data={planets}
        keyExtractor={item => item.url}
        ItemSeparatorComponent={renderSeparator}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefresh}
            colors={['#000000']} // Set desired loading indicator colors
          />
        }
        renderItem={PlanetEntry}
      />
      <PlanetRepoControlView debug={debug} />
    </>
  );
};

const styles = StyleSheet.create({
  flatlist: {
    flexGrow: 0,
    padding: 8,
    backgroundColor: 'white',
  },
  planet: {
    marginBottom: 16,
  },
  planetName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
});

export default PlanetComponent;
