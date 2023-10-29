import {View, Text, TouchableOpacity, Image, Modal, Alert} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import Icon6 from 'react-native-vector-icons/Octicons';
import {BaseColors} from '../../config/theme';
import {Button, Switch} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {ImageBundle} from '../../config/ImageBundle';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {setProfileData, setUserData} from '../../redux/actions/actions';
import styles from './styles';
import CModal from '../../components/CModal';
import Toast from 'react-native-toast-message';
const Settings = ({navigation}) => {
  const profileData = useSelector(state => state.profileData.profileData);

  const [isSwitchNT, setIsSwitchOnNT] = useState(false);
  const [isSwitchDM, setIsSwitchOnDM] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [feed, setFeed] = useState(false);
  const onToggleSwitchNT = () => setIsSwitchOnNT(!isSwitchNT);
  const onToggleSwitchDM = () => setIsSwitchOnDM(!isSwitchDM);
  const dispatch = useDispatch();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const settingData = [
    {
      title: 'Account',
      icon: (
        <Icon name={'user-circle-o'} size={25} color={BaseColors.secondary} />
      ),
      insides: [
        {
          title: 'Profile Locking',
          icon: (
            <Icon2 name={'user-lock'} size={13} color={BaseColors.black80} />
          ),
          jump: 'ProfileLocking',
        },
        {
          title: 'Edit Profile',
          icon: (
            <Icon4
              name={'edit-document'}
              size={17}
              color={BaseColors.black80}
            />
          ),
          jump: 'CompleteProfile',
        },
        {
          title: 'Change Password',
          icon: <Icon name={'key'} size={17} color={BaseColors.black80} />,
          jump: 'ChangePassword',
        },
        {
          title: ' Privacy Options ',
          icon: <Icon2 name={'lock'} size={17} color={BaseColors.black80} />,
          jump: 'PrivacyOptions',
        },
        {
          title: 'Block List',
          icon: <Icon4 name={'block'} size={17} color={BaseColors.black80} />,
        },
      ],
    },
    {
      title: 'Decision',
      icon: (
        <Icon6 name={'arrow-switch'} size={25} color={BaseColors.secondary} />
      ),
      insides: [
        {
          title: 'Notifications',
          icon: <Icon name={'bell'} size={17} color={BaseColors.black80} />,
        },
        {
          title: 'Dark Mode',
          icon: <Icon3 name={'moon'} size={17} color={BaseColors.black80} />,
        },
      ],
    },
    {
      title: 'More',
      icon: <Icon2 name={'plus'} size={22} color={BaseColors.secondary} />,
      insides: [
        {
          title: 'Feedback',
          icon: <Icon4 name={'feed'} size={17} color={BaseColors.black80} />,
        },
        {
          title: 'Terms & Policies',
          icon: <Icon name={'book'} size={17} color={BaseColors.black80} />,
        },
        {
          title: 'About',
          icon: (
            <Icon2 name={'info-circle'} size={17} color={BaseColors.black80} />
          ),
        },
        {
          title: 'Signout',
          icon: <Icon name={'sign-out'} size={17} color={BaseColors.black80} />,
        },
      ],
    },
  ];

  // settings item clicked
  const handleItemClicked = (title, jump) => {
    // console.log(item);
    if (title === 'Signout') {
      setModalVisible(true);
    } else if (title === 'Feedback') {
      setFeed(true);
    } else {
      navigation.navigate(jump);
    }
  };

  // signout process
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = () => {
    signOut();
    setModalVisible(false);
    dispatch(
      dispatch(setUserData('')),
      dispatch(setProfileData('')),
      navigation.replace('SignIn'),
    );
  };

  // callback yes modal
  const pressYes = () => {
    setModalVisible(false);
    handleSignOut();
  };

  // callback yes modal
  const pressFeed = () => {
    setFeed(false);
    Toast.show({
      type: 'success',
      text1: 'Feedback submited',
      text2: 'Thank you for submitting your feedback.',
    });
    console.log('feed....');
  };

  return (
    <LinearGradient
      colors={['rgb(230, 192, 254)', 'rgb(254, 254, 254)']}
      style={{flex: 1}}
      start={{x: 0.0, y: 0.0}}
      end={{x: 1.0, y: 1.0}}>
      <Header title={'Settings'} noBack />
      <View style={{alignItems: 'center'}}>
        <View style={styles.box}>
          {settingData?.map((item, index) => {
            return (
              <View key={index}>
                <View style={[styles.outer, {marginTop: index ? 10 : 0}]}>
                  <View style={{flexDirection: 'row'}}>
                    {item?.icon}
                    <Text style={styles.titleUp}>{item?.title}</Text>
                  </View>
                  {!index && (
                    <>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                          source={
                            profileData?.profile_pic
                              ? {uri: profileData?.profile_pic}
                              : ImageBundle.avatar
                          }
                          style={styles.img}
                        />
                        <Text style={{fontWeight: 'bold'}}>
                          {profileData?.email}
                        </Text>
                      </View>
                    </>
                  )}
                </View>
                {item?.insides?.map((list, indexList) => {
                  return (
                    <TouchableOpacity
                      style={styles.inside}
                      onPress={() => handleItemClicked(list?.title, list?.jump)}
                      key={indexList}>
                      <View>{list?.icon}</View>
                      <Text style={styles.titleIn}>{list.title}</Text>

                      {index === 1 && (
                        <View style={{position: 'absolute', right: 0}}>
                          <Switch
                            value={indexList === 0 ? isSwitchNT : isSwitchDM}
                            onValueChange={
                              indexList === 0
                                ? onToggleSwitchNT
                                : onToggleSwitchDM
                            }
                          />
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        </View>
        {isModalVisible && (
          <CModal
            title={'Are you sure?'}
            description={'You want to Signout?'}
            isModalVisible={isModalVisible}
            setModalVisible={setModalVisible}
            transferData={pressYes}
          />
        )}
        {feed && (
          <CModal
            title={'Are you sure?'}
            feedSpecial
            description={'You want to Signout?'}
            isModalVisible={feed}
            setModalVisible={setFeed}
            transferData={pressFeed}
          />
        )}
      </View>
    </LinearGradient>
  );
};

export default Settings;
