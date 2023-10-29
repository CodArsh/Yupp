import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For AsyncStorage
import rootReducer from './reducers'; // Import your rootReducer

const persistConfig = {
  key: 'root', // Change this key to a unique identifier for your app
  storage: AsyncStorage, // Use AsyncStorage for storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

// Create a persistor object to persist the store
const persistor = persistStore(store);

export { store, persistor };
