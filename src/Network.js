import {NativeModules} from 'react-native';
const {NetworkManager} = NativeModules;

const get = async url => {
  console.log('----', NetworkManager);
  if (!url) {
    console.log('No url found, returning');
    return null;
  }

  let response = await NetworkManager.doGet(url);
  return JSON.parse(response);
};

export default {
  get,
};
