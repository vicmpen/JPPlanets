import Storage from '../Data/Storage';
import Network from '../Data/Network';

/**
 * Responsible for fetching data for the application, and abstracting away the implementation, when coupled with an interface.
 * Uses Storage and Network modules and handles any logic regarding, saving, fetching, mapping etc
 */

const fetchPlanets = async forceReload => {
  console.log(
    'PlanetRepository',
    'FetchPlanets Called!',
    'force ',
    forceReload,
  );
  try {
    if (forceReload) {
      await Storage.deleteAllPlanets();
      let planets = await loadPlanetsFromApiAndSaveToStorage();
      return planets;
    }

    let savedPlanets = await Storage.getAllPlanets();
    //If nothing is found in storage, go to network
    if (!savedPlanets) {
      let fetchedPlanets = await loadPlanetsFromApiAndSaveToStorage();
      return fetchedPlanets;
    } else {
      //load the saved response and return the data to be rendered
      let storedResponse = await Storage.getAllPlanets();
      console.log('Storage, got saved Response,', storedResponse);
      return JSON.parse(storedResponse).results;
    }
  } catch (error) {
    console.log('PlanetRepository', error);
    return [];
  }
};

const loadFromApi = async () => {
  let fetchedPlanets = await Network.getAllPlanets();
  console.debugLog('PlanetRepo ->', JSON.parse(fetchedPlanets));
  return fetchedPlanets;
};

const loadPlanetsFromApiAndSaveToStorage = async () => {
  let fetchedPlanets = await loadFromApi();
  //Could run without await, to save some time for the user
  //save the response for next Time
  await Storage.saveAllPlanets(fetchedPlanets);
  //Return only the data that need rendering, maybe save the 'next' pointer
  return JSON.parse(fetchedPlanets).results;
};

const deleteAllPlanets = () => {
  Storage.deleteAllPlanets();
};

export default {
  fetchPlanets,
  deleteAllPlanets,
};
