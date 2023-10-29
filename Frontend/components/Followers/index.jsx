import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BaseColors} from '../../config/theme';

const Followers = () => {
  const threeCard = [
    {
      title: 'Photo',
      data: 26,
    },
    {
      title: 'Followers',
      data: 59,
    },
    {
      title: 'Following',
      data: 13,
    },
  ];
  return (
    <View style={styles.main}>
      {threeCard?.map((item, index) => {
        return (
          <View
            style={[
              styles.outer,
              {borderRightWidth: index != threeCard?.length - 1 ? 1 : 0},
            ]}
            key={index}>
            <Text style={styles.title}>{item?.title}</Text>
            <Text style={styles.data}>{item?.data}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default Followers;

const styles = StyleSheet.create({
  main: {
    width: '90%',
    height: 100,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  outer: {
    borderColor: BaseColors.black20,
    width: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: BaseColors.black,
  },
  data: {
    fontSize: 17,
    fontWeight: '400',
    color: BaseColors.black,
  },
});
