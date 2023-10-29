import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import styles from './styles';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Header from '../../components/Header';
import {useSelector} from 'react-redux';
import {ImageBundle} from '../../config/ImageBundle';
import {BaseColors} from '../../config/theme';
import Followers from '../../components/Followers';
import ProfileDetails from '../../components/ProfileDetails';
const Profile = ({navigation, route}) => {
  const profileData = useSelector(state => state.profileData.profileData);
  const [cardData, setCardData] = useState(null);
  const fromCard = route?.params?.from === 'card';

  useEffect(() => {
    if (fromCard) {
      setCardData(route?.params?.data);
    }
  }, []);

  // check profile already existm or not
  useEffect(() => {
    console.log(profileData?.email ? 'THIS USER HAS PROFILE' : 'NOT EXIST');
  }, []);

  const userDetails = [
    {
      title: 'Bio',
      icon: 'briefcase',
      description: cardData ? cardData?.Bio : profileData?.Bio,
    },
    {
      title: 'Date of birth',
      icon: 'birthday-cake',
      description: cardData ? cardData?.DateOfBirth : profileData?.DateOfBirth,
    },
    {
      title: 'Nation',
      icon: 'earth-americas',
      description: cardData ? cardData?.Country : profileData?.Country,
    },

    {
      title: 'City',
      icon: 'road',
      description: cardData ? cardData?.City : profileData?.City,
    },
  ];

  return (
    <ScrollView>
      <View style={styles.main}>
        <Header title={'Profile'} profileHeader />
        <View style={{backgroundColor: BaseColors.white}}>
          <View style={styles.viewAngel} />
        </View>
        <View style={styles.sideView}>
          <View style={styles.upper}>
            <TouchableOpacity
              style={{
                borderRadius: 130 / 2,
                elevation: 5,
              }}>
              <Image
                source={
                  cardData
                    ? {uri: cardData?.profile_pic}
                    : profileData?.profile_pic
                    ? {uri: profileData?.profile_pic}
                    : ImageBundle.avatar
                }
                style={styles.img}
              />
            </TouchableOpacity>
            <View style={styles.afterImg}>
              <Text style={styles.name}>
                {cardData ? cardData?.username : profileData?.username}
              </Text>
              <Text style={styles.work}>
                {cardData ? cardData?.Profession : profileData?.Profession}
              </Text>
            </View>
            {!route?.params?.data?.email && (
              <TouchableOpacity
                style={styles.edit}
                onPress={() =>
                  navigation.navigate(
                    !profileData?.email ? 'Profile' : 'CompleteProfile',
                  )
                }>
                <Icon2
                  name={'pen-alt'}
                  size={10}
                  color={BaseColors.secondary}
                />
                <Text style={{marginLeft: 5, color: BaseColors.secondary}}>
                  Edit
                </Text>
              </TouchableOpacity>
            )}

            {route?.params?.data?.email && (
              <View style={styles.twoBtn}>
                <TouchableOpacity style={styles.connect}>
                  <Text style={{color: BaseColors.white}}>Follow</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.favorite}>
                  <Text style={{color: BaseColors.secondary}}>Message</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Three in one (photos, folowers and following) */}
            <Followers />

            {/* user details like a bio, birthdate, nation etc */}
            {userDetails?.map((item, index) => {
              return (
                <ProfileDetails
                  key={index}
                  iconName={item?.icon}
                  title={item?.title}
                  description={item?.description}
                />
              );
            })}
          </View>
          <Text style={{textAlign:'center', marginTop:25}}>Coming Soon...</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
