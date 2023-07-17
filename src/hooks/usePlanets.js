import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Text, StyleSheet} from 'react-native';
import PlanetRepository from '../Repositories/PlanetRepository';

export const usePlanets = forceReload => {
  let [planets, setPlanets] = useState([]);
  let [loading, setLoading] = useState(false);

  //If there is already a request going on, return
  if (loading) {
    console.log('Loading is in Progress');
    return;
  }
  console.log('usePlanets', forceReload);

  //
  const getPlanets = useCallback(async () => {
    let planets = await PlanetRepository.fetchPlanets(forceReload);
    console.log('usePlanets', 'Planets Received!', planets);
    setPlanets(planets);
  }, [forceReload]);

  useEffect(() => {
    try {
      //Force reloading, sto everything comes fresh from network, start from scratch
      if (forceReload) {
        setPlanets([]);
      }
      
      setLoading(true);
      getPlanets();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    // make sure to catch any error
  }, [forceReload]);
  return [planets, loading];
};
