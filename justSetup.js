import React from 'react';

import 'react-native';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import App from './src/App';
import Storage from './src/Data/Storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
