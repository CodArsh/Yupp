import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage'

import {ImageBundle} from '../../config/ImageBundle';
const SplashScreen = ({navigation}) => {
  useEffect(() => {
    requestUserPermission();
  }, []);
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      GetFcmToken();
    }
  }
  async function GetFcmToken() {
    let fcmToken = await AsyncStorage.getItem('fcmtoken');
    console.log('oldToken => ', fcmToken);
    if (!fcmToken) {
      try {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
          console.log('NEW Token => ', fcmToken);
          await AsyncStorage.setItem('fcmtoken', fcmToken);
        }
      } catch (error) {
        console.log('Error while get fcmtoken ===> ', error);
      }
    }
  }
  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={['rgb(230, 192, 254)', 'rgb(254, 254, 254)']}
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        start={{x: 0.0, y: 0.0}}
        end={{x: 1.0, y: 1.0}}>
        <Image source={ImageBundle?.logo} style={{height: 100, width: 100}} />
      </LinearGradient>
    </View>
  );
};

export default SplashScreen;
