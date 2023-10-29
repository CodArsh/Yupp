// import messaging from '@react-native-firebase/messaging';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// export async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//   }
// }

// export async function getFCM_Token() {
//   let fcmtoken = await AsyncStorage.getItem('fcmtoken');
//   console.log('OLD TOKEN => ', fcmtoken);
//   if (!fcmtoken) {
//     try {
//       const fcmtoken = messaging().getToken();
//       if (fcmtoken) {
//         console.log('NEW TOKEN => ', fcmtoken);
//         await AsyncStorage.setItem('fcmtoken', fcmtoken);
//       }
//     } catch (error) {
//       console.log('ERROR WHILE GET FCM TOKEN => ', error);
//     }
//   }
// }

// export const NotificationListner = () => {
//   messaging().onNotificationOpenedApp(remoteMessage => {
//     console.log(
//       'Notification caused app to open from background state:',
//       remoteMessage.notification,
//     );
//   });

//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       if (remoteMessage) {
//         console.log(
//           'Notification caused app to open from quit state:',
//           remoteMessage.notification,
//         );
//       }
//     });

//   messaging().onMessage(async remoteMessage => {
//     console.log('Notification on Forground .... ', remoteMessage);
//   });
// };
