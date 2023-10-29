import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';
import NavigationStack from './navigation/NavigationStack';
import {PaperProvider} from 'react-native-paper';
import {Alert, StatusBar} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import NToast from 'react-native-toast-message';
const App = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        remoteMessage?.notification?.title,
        remoteMessage?.notification?.body,
      );
    });

    return unsubscribe;
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <StatusBar
            backgroundColor={'rgb(231, 200, 254)'}
            barStyle={'dark-content'}
          />
          <NavigationStack />
        </PaperProvider>
      </PersistGate>
      <NToast />
    </Provider>
  );
};

export default App;
