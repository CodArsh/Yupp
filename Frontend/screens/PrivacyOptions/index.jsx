import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import Header from '../../components/Header';
import LinearGradient from 'react-native-linear-gradient';
import {ActivityIndicator, Button, RadioButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CModal from '../../components/CModal';
import {useDispatch, useSelector} from 'react-redux';
import {delete_API_CALL} from '../../services/api';
import Toast from 'react-native-toast-message';
import {setProfileData, setUserData} from '../../redux/actions/actions';
import LottieView from 'lottie-react-native';
const PrivacyOptions = ({navigation}) => {
  const dispatch = useDispatch();
  const profileData = useSelector(state => state.profileData.profileData);
  const [value, setValue] = useState('first');
  const [isModalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState(
    'You want to deactivate this account?',
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (value === 'second') {
      setMessage('You want to delete this account?');
    } else {
      setMessage('You want to deactivate this account?');
    }
  }, [value]);
  const action = [
    {
      mode: 'first',
      title: 'Deactivate Account',
      description:
        'After deactivate account your profile will be hidden and no one can see that. But if you want to use it again then you can do it, you just have to login, you can access your profile and your all data will be safe.',
    },
    {
      mode: 'second',
      title: 'Delete Account',
      description:
        'If you delete your account then you have loss your all data and not be able to use this account.',
    },
  ];

  // callback yes modal
  const pressYes = async data => {
    setModalVisible(false);
    setLoading(true);
    const resp = await delete_API_CALL(profileData?.email);
    if (resp?.status) {
      dispatch(setUserData('')),
        dispatch(setProfileData('')),
        Toast.show({
          type: 'success',
          text1: resp?.data?.data,
        });
        setLoading(false);
        navigation.navigate('SignIn');
    }
  };
  return (
    <LinearGradient
      colors={['rgb(230, 192, 254)', 'rgb(254, 254, 254)']}
      style={{flex: 1}}
      start={{x: 0.0, y: 0.0}}
      end={{x: 1.0, y: 1.0}}>
      {
        !loading && <Header title={'Privacy Options'} />
      }

      {loading ? (
        <View
          style={{flex: 1, justifyContent: 'center', justifyContent: 'center'}}>
          {/* <ActivityIndicator size={'large'} /> */}
          <Text
            style={{
              marginBottom: 15,
              fontSize: 20,
              textAlign: 'center',
            }}>
            Deleting...
          </Text>
          <LottieView
            source={require('../../assets/Lottie/delete.json')} // Path to your animation file
            autoPlay
            style={{height: 240, width: 240, marginLeft: 100}}
            loop
            speed={0.6}
          />
        </View>
      ) : (
        <View
          style={{
            marginHorizontal: 20,
            justifyContent: 'space-between',
            flex: 1,
            paddingVertical: 20,
          }}>
          <RadioButton.Group
            onValueChange={newValue => setValue(newValue)}
            value={value}>
            {action?.map((item, index) => {
              return (
                <View key={index} style={{paddingBottom: 20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <RadioButton value={item?.mode} />
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                      {item?.title}
                    </Text>
                  </View>
                  <View>
                    <Text style={{fontSize: 14}}>{item?.description}</Text>
                  </View>
                </View>
              );
            })}
          </RadioButton.Group>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{width: '100%'}}
            onPress={() => setModalVisible(true)}>
            <Button
              mode="contained"
              style={{
                borderRadius: 5,
                paddingVertical: 8,
                alignItems: 'center',
              }}>
              <Icon name="privacy-tip" size={16} />
              &nbsp;&nbsp;
              <Text style={{fontSize: 18}}>Take Action</Text>
            </Button>
          </TouchableOpacity>
        </View>
      )}
      {isModalVisible && (
        <CModal
          title={'Are you sure?'}
          description={message}
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          transferData={pressYes}
        />
      )}
    </LinearGradient>
  );
};

export default PrivacyOptions;
