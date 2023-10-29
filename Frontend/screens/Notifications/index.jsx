import {View, Text, Image} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../components/Header';
import {ImageBundle} from '../../config/ImageBundle';
import {BaseColors} from '../../config/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';
const Notifications = () => {
  return (
    <LinearGradient
      colors={['rgb(230, 192, 254)', 'rgb(254, 254, 254)']}
      style={{flex: 1}}
      start={{x: 0.0, y: 0.0}}
      end={{x: 1.0, y: 1.0}}>
      <Header title={'Notifications'} noBack />
      <View>
        <Text style={{fontSize: 13, marginLeft: 15}}>From Yupp team</Text>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          marginBottom: 18,
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={ImageBundle.status}
            style={{
              height: 50,
              width: 50,
              backgroundColor: BaseColors.white,
              borderRadius: 50,
            }}
          />

          <View>
            <Text style={{fontSize: 18, fontWeight: '700', marginLeft: 15}}>
              Do you need any help ?
            </Text>
            <Text style={{fontSize: 13, marginLeft: 15}}>Feel free to ask</Text>
          </View>
        </View>

        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Icon name={'delete-outline'} size={25} />
        </View>
      </View>
      <View>
        <Text style={{fontSize: 13, marginLeft: 15}}>General Alerts</Text>
      </View>

      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <LottieView
          source={require('../../assets/Lottie/empty.json')} // Path to your animation file
          autoPlay
          style={{height: 240, width: 240}}
          loop
          speed={0.6}
        />
      </View>
    </LinearGradient>
  );
};

export default Notifications;
