import AppConfig from '../AppConfig';

console.debugLog = (...args) => {
  if (!!AppConfig.debug_mode) {
    console.log('-------DEBUG------');
    console.log(args);
    console.log('-------DEBUG------');
  }
};

export default {};
