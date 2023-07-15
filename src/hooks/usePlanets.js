import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Text, StyleSheet} from 'react-native';
import PlanetRepository from '../Repositories/PlanetRepository';

export const usePlanets = forceReload => {
  let [planets, setPlanets] = useState([]);
  let [loading, setLoading] = useState(false);

  const getPlanets = useCallback(async () => {
    let planets = await PlanetRepository.fetchPlanets(forceReload);
    console.log('usePlanets', 'Planets Received!', planets);
    setPlanets(planets);
  }, [forceReload]);

  useEffect(() => {
    try {
      console.log('Calling getPlanets');
      setLoading(true);
      getPlanets().catch();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    // make sure to catch any error
  }, []);
  return [planets, loading];
};
