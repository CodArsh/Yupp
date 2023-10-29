import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/FontAwesome6';
import {BaseColors} from '../../config/theme';
const ProfileDetails = ({iconName, title, description}) => {
  return (
    <View style={styles.main}>
      <View style={styles.icon}>
        {iconName === 'earth-americas' ? (
          <Icon3 name={iconName} size={15} color={BaseColors.black} />
        ) : (
          <Icon name={iconName} size={15} color={BaseColors.black} />
        )}
        <Text style={styles.title}>&nbsp;{title}</Text>
      </View>
      <Text style={{fontSize: 15, color: BaseColors.black90}}>
        {description}
      </Text>
    </View>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({
  main: {
    padding: 10,
    width: '100%',
    paddingHorizontal: 20,
    marginTop:-15
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 25,
  },
  title: {
    fontSize: 20,
    color: BaseColors.black,
    fontWeight: '500',
  },
});
