import { combineReducers } from 'redux';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
// ----------------------------------------------------------------------

export const createNoopStorage = () => ({
  getItem(_key: string): Promise<null> {
    return Promise.resolve(null);
  },
  // eslint-disable-next-line
  setItem(_key: string, value: any) {
    return Promise.resolve(value);
  },
  removeItem(_key: string): Promise<void> {
    return Promise.resolve();
  },
});

export const storage =
  typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const rootReducer = combineReducers({});

export default rootReducer;
