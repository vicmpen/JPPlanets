import {NativeModules} from 'react-native';
const {NetworkManager} = NativeModules;

//function used internally to call the API
const get = async url => {
  console.log('----', NetworkManager);
  if (!url) {
    console.log('No url found, returning');
    return null;
  }

  let response = await NetworkManager.doGet(url);
  console.log(response);
  return response;
};
//Exported func to fetch the planets
const getAllPlanets = () => {
  return get('https://swapi.dev/api/planets/');
};

export default {
  getAllPlanets,
};
