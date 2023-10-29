import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../components/Header';
import { BaseColors } from '../../config/theme';
const Chat = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const profileData = useSelector(state => state.profileData.profileData);
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    const email = profileData?.email;
    firestore()
      .collection('users')
      .where('email', '!=', email)
      .get()
      .then(res => {
        if (res?.docs != []) {
          setUsers(res?.docs);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <LinearGradient
      colors={['rgb(230, 192, 254)', 'rgb(254, 254, 254)']}
      style={{flex: 1}}
      start={{x: 0.0, y: 0.0}}
      end={{x: 1.0, y: 1.0}}>
      <Header title={'Chat'} />
      <FlatList
        data={users}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Message', {
                  data: item.data(),
                  email: profileData?.email,
                })
              }
              style={styles.list}>
              <Image
                source={{uri: item.data().profile_pic}}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                  marginRight: 10,
                }}
              />
              <Text style={{fontSize: 20, fontWeight: '400', color: BaseColors.black80}}>
                {item.data().username}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </LinearGradient>
  );
};

export default Chat;
