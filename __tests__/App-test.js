/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import App from '../src/App';
import Storage from '../src/Data/Storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Network from '../src/Data/Network';
import PlanetComponent from '../src/Planets/PlanetComponent';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

describe('Storage Module Mocking', () => {
  it('checks if Storage Saves Correctly', async () => {
    let payload = JSON.stringify(['planet1', 'planet2']);
    await Storage.saveAllPlanets(payload);
    expect(AsyncStorage.setItem).toBeCalledWith('ALL_PLANETS', payload);
  });

  it('checks if Storage Deletes Correctly', async () => {
    await Storage.deleteAllPlanets();
    expect(AsyncStorage.removeItem).toBeCalledWith('ALL_PLANETS');
  });
});
