import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Storage class to abstract away AsyncStorage. Generic get/set/delete item functions + some specific planet implementation
 * Works with stringified values.
 */

const saveItem = async (key, value) => {
  if (!key) {
    return false;
  }

  //currently we just accept string for saving
  if (typeof key != 'string') {
    throw createError('value should be a string');
  }

  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (e) {
    // saving error
    throw createError('error while saving value from storage');
  }
};

//
const getItem = async key => {
  if (!key) {
    return null;
  }
  try {
    const value = await AsyncStorage.getItem(key);
    //return the value or null, if not found
    return value;
  } catch (e) {
    // error reading value
    throw createError('error while reading value from storage');
  }
};

const createError = message => {
  return Error(message);
};

//Planet implementation of Storage
const storage_keys = {
  GET_ALL_PLANETS_KEY: 'ALL_PLANETS',
};

//TODO: Throw Error
const savePlanet = async (key, planets) => {
  try {
    let result = await saveItem(key, planets);
    return true;
  } catch (error) {
    console.log('Storage', error);
    return false;
  }
};

const saveAllPlanets = async planets => {
  console.log('Storage', 'saving planets', planets);
  return await saveItem(storage_keys.GET_ALL_PLANETS_KEY, planets);
};

//TODO: Throw Error
const getPlanet = async key => {
  try {
    let planets = await getItem(key);
    return planets;
  } catch (error) {
    return null;
  }
};

/**
 * Fetches all planets from the storage.
 * TODO: Throw Error
 */
const getAllPlanets = async () => {
  try {
    return await getItem(storage_keys.GET_ALL_PLANETS_KEY);
  } catch (error) {
    return createError('Error while Fetching Planets', error);
  }
};

const deleteAllPlanets = async () => {
  try {
    let _ = await AsyncStorage.removeItem(storage_keys.GET_ALL_PLANETS_KEY);
    console.log('Storage: Planets Deleted ');
  } catch (error) {
    return createError('Error while Deleting Planets', error);

  }
};

export default {
  saveAllPlanets,
  getAllPlanets,
  deleteAllPlanets,
};
