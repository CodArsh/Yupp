import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {BaseColors} from '../../config/theme';

const Header = ({title, rightSideOption, profileHeader, noBack}) => {
  const navigation = useNavigation();
  const _handleMore = () => console.log('Shown more');
  return (
    <Appbar.Header
      style={{
        backgroundColor: profileHeader
          ? 'rgb(231, 200, 254)'
          : 'rgba(0, 0, 0, 0)',
      }}>
      {!noBack && (
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          color={BaseColors.secondary}
        />
      )}
      {/* <Appbar.Content> */}
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 25,
          marginLeft: noBack ? 10 : 0,
          color: BaseColors.secondary,
        }}>
        {title}
      </Text>

      {rightSideOption && (
        <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
      )}
    </Appbar.Header>
  );
};

export default Header;

const styles = StyleSheet.create({});
