import React from 'react';
import {FlatList, Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import PlanetRepository from '../Repositories/PlanetRepository';
import PlanetContainer, {usePlanets} from '../hooks/usePlanets';

const EmpyList = () => {
  return <Text>No Planets Nearby!</Text>;
};
//TODO: Add Referesh
const PlanetComponent = ({debug}) => {
  let [planets, loading] = usePlanets(false);
  return (
    <>
      <FlatList
        ListEmptyComponent={EmpyList}
        style={styles.flatlist}
        data={planets}
        renderItem={({item, index, separators}) => {
          return (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                }}>
                {item.name}
              </Text>
            </View>
          );
        }}
      />
      <PlanetRepoControlView debug={debug} />
    </>
  );
};

const styles = StyleSheet.create({
  flatlist: {
    flexGrow: 0,
    padding: 8,
    backgroundColor: 'yellow',
  },
});

export default PlanetComponent;

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
