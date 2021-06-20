import {
  saveItemToLocalStorage,
  loadItemToLocalStorage,
} from './storage';

describe('storage', () => {
  function mockLocalStorage(data) {
    global.localStorage = {
      setItem: jest.fn(() => null),
      getItem: jest.fn((key) => data[key]),
    };
  }

  describe('saveItemToLocalStorage', () => {
    beforeEach(() => {
      mockLocalStorage({ accessToken: 'ACCESS_TOKEN' });
    });

    it('renders undefined', () => {
      expect(saveItemToLocalStorage('accessToken', 'ACCESS_TOKEN')).toBeUndefined();
    });
  });

  describe('loadItemToLocalStorage', () => {
    beforeEach(() => {
      mockLocalStorage({ accessToken: 'ACCESS_TOKEN' });
    });

    it('returns item', () => {
      const accessToken = loadItemToLocalStorage('accessToken');

      expect(accessToken).toBe('ACCESS_TOKEN');
    });
  });
});
