import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BaseColors} from '../../config/theme';
import {ImageBundle} from '../../config/ImageBundle';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {follow_API_CALL} from '../../services/api';
const CardDetails = ({
  username,
  data,
  firstCard,
  profession,
  photo,
  index,
  buttonTag,
  btn,
  setBtn,
}) => {
  const userData = useSelector(state => state.userData.userData);
  const navigation = useNavigation();

  const getFollow = async () => {
    const bundle = {
      email: userData?.email,
      user: data?.email,
    };
    await follow_API_CALL(bundle);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate('Profile', {from: 'card', data: data});
      }}
      style={[
        styles.main,
        {
          marginLeft: index || firstCard ? 20 : 0,
        },
      ]}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={photo ? {uri: photo} : ImageBundle.avatar}
          style={{height: 85, width: 85, borderRadius: 50}}
        />

        <Text style={styles.cardName}>{username}</Text>
        <Text>{profession}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          setBtn(!btn);
          getFollow();
        }}
        style={[
          styles.followBtn,
          {
            backgroundColor:
              buttonTag === 'Following'
                ? BaseColors.primaryLight
                : BaseColors.white,

            borderWidth: buttonTag !== 'Following' ? 1 : 0,
            borderColor:
              buttonTag !== 'Following'
                ? BaseColors.secondary
                : BaseColors.primaryLight,
          },
        ]}>
        <Text style={{color: BaseColors.secondary, fontSize: 14}}>
          {buttonTag}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default CardDetails;

const styles = StyleSheet.create({
  main: {
    elevation: 3,
    borderColor: BaseColors.secondary,
    borderRadius: 10,
    backgroundColor: BaseColors.white,
    width: 150,
    marginRight: 20,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: BaseColors.secondary,
    marginTop: 8,
    marginBottom: 3,
    textAlign: 'center',
  },
  followBtn: {
    paddingHorizontal: 25,
    paddingVertical: 5,
    marginTop: 12,
    borderRadius: 10,
  },
});
