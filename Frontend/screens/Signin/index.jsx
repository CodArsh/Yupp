import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {BaseColors} from '../../config/theme';
import {Button} from 'react-native-paper';
import CInput from '../../components/CInput';
import {isEmpty} from 'lodash';
import {
  completeProfile_API_CALL,
  profileDetails_API_CALL,
  signinAccount_API_CALL,
} from '../../services/api';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {setProfileData, setUserData} from '../../redux/actions/actions';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid'
import { ImageBundle } from '../../config/ImageBundle';
const SignIn = ({navigation}) => {
  // signin with google setup
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '629372607878-5g0da1cbijnf0t7i1bbgc2vm35lp4gng.apps.googleusercontent.com',
    });
  }, []);

  const [userInfo, setUserInfo] = useState(null);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const Info = await GoogleSignin.signIn();
      setUserInfo(Info?.user);
      console.log('user : ', Info?.user);
      checkProfileExist(Info?.user);
      // makeProfile(Info?.user);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const checkProfileExist = async data => {
    const resp = await profileDetails_API_CALL(data?.email);
    console.log('PROFILE : ', resp?.data);
    if (resp?.data) {
      dispatch(setProfileData(resp?.data));
      navigation.replace('BottomTabNavigator');
    } else {
      makeProfile(data);
    }
    setEmail('');
    setPassword('');
  };

  // FINALLY... :) MAKE THE PROFILE HERE
  const makeProfile = async data => {
    // setLoading(true);
    try {
      const createSocialProfile = {
        username: data?.name,
        email: data?.email,
        profile_pic: data?.photo,
      };
      console.log('REQUEST : ', createSocialProfile);
      const response = await completeProfile_API_CALL(createSocialProfile);
      console.log('RESP : ', response?.data?.profile);
      dispatch(setProfileData(response?.data?.profile));
      navigation.replace('BottomTabNavigator');
    } catch (error) {
      console.log('ERROR found at api integraion => /Complete Profile', error);
      // setLoading(false);
    }
  };

  const userData = useSelector(state => state.userData.userData);

  //user data set in rudex
  const dispatch = useDispatch();

  const errObj = {
    emailErr: 'Enter your email address',
    showEmailError: false,

    passwordError: 'Enter your password',
    showPasswordError: false,
  };

  const [errorObj, setErrorObj] = useState(errObj);
  const [email, setEmail] = useState('Hacker@gmail.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  const signInAccount = async () => {
    setLoading(true);
    const sentData = {
      email: email,
      password: password,
    };
    const response = await signinAccount_API_CALL(sentData);
    if (response?.data?.status) {
      setLoading(false);
      dispatch(setUserData(response?.data?.user));
      getProDetails();
    } else {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'SignIn Failed',
        text2: 'Email and Password does not match',
      });
    }
  };

  const getProDetails = async () => {
    const resp = await profileDetails_API_CALL(email);
    console.log('PROFILE : ', resp?.data);
    dispatch(setProfileData(resp?.data));
    navigation.replace('BottomTabNavigator');
    setEmail('');
    setPassword('');
  };

  return (
    <LinearGradient
      colors={['rgb(230, 192, 254)', 'rgb(254, 254, 254)']}
      style={styles.main}
      start={{x: 0.0, y: 0.0}}
      end={{x: 1.0, y: 1.0}}>
      <View />
      <View />
      <View />
      <View />
      <Image source={ImageBundle.logo} style={{height:80,width:80}} />
      <View style={{alignItems: 'center'}}>
        <Text style={styles.mainTitle}>Welcome to Yupp !</Text>
      </View>
      <View style={{width: '90%'}}>
        <CInput
          lable="Email"
          value={email}
          onChangeText={e => (
            setEmail(e), setErrorObj({...errorObj, showEmailError: false})
          )}
          icon="email"
          errorMsg={errorObj.emailErr}
          errVisible={errorObj.showEmailError}
          onBlur={() =>
            isEmpty(email) && setErrorObj({...errorObj, showEmailError: true})
          }
        />
        <CInput
          secureTextEntry
          lable="Password"
          value={password}
          onChangeText={e => (
            setPassword(e), setErrorObj({...errorObj, showPasswordError: false})
          )}
          icon="lock"
          errorMsg={errorObj.passwordError}
          errVisible={errorObj.showPasswordError}
          onBlur={() =>
            isEmpty(password) &&
            setErrorObj({...errorObj, showPasswordError: true})
          }
        />
        <View
          style={{
            justifyContent: 'flex-end',
            flexDirection: 'row',
          }}>
          <Text>Create new account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={{color: BaseColors.secondary}}>Signup</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 25}}>
          <Button
            loading={loading}
            style={{
              backgroundColor: BaseColors.secondary,
              marginBottom: 5,
              borderRadius: 5,
              paddingVertical: 10,
            }}
            icon="shield-account"
            mode="contained"
            onPress={() => signInAccount()}>
            <Text style={{fontSize: 20}}>Sign In</Text>
          </Button>
        </View>
      </View>
      <Text>OR</Text>
      <TouchableOpacity style={styles.button} onPress={() => signIn()}>
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/768px-Google_%22G%22_Logo.svg.png',
          }}
          style={styles.logo}
        />
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>
      <View />
    </LinearGradient>
  );
};

export default SignIn;
