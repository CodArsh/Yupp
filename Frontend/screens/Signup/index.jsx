import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {BaseColors} from '../../config/theme';
import {Button} from 'react-native-paper';
import CInput from '../../components/CInput';
import {isEmpty} from 'lodash';
import {makeNewAccount_API_CALL} from '../../services/api';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {setUserData} from '../../redux/actions/actions';

const Signup = ({navigation}) => {
  //user data set in rudex
  const dispatch = useDispatch();

  const errObj = {
    userError: 'Please enter username ',
    showUserError: false,

    emailErr: 'Enter your email address',
    showEmailError: false,

    passwordError: 'Please set your password',
    showPasswordError: false,

    phoneError: 'Enter your phone number',
    showPhoneError: false,
  };

  const [errorObj, setErrorObj] = useState(errObj);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const createAccount = async () => {
    setLoading(true);
    const sentData = {
      username: username,
      email: email,
      password: password,
      phone: number,
    };
    const response = await makeNewAccount_API_CALL(sentData);
    if (response?.data?.status) {
      setLoading(false);
      dispatch(setUserData(response?.data?.user));
    
      navigation.replace('BottomTabNavigator');
    } else {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Signup Failed',
        text2: 'This email address already exist.',
      });
    }
  };

  return (
    <LinearGradient
      colors={['rgb(230, 192, 254)', 'rgb(254, 254, 254)']}
      style={styles.main}
      start={{x: 0.0, y: 0.0}}
      end={{x: 1.0, y: 1.0}}>
      <View />
      <View style={{alignItems: 'center'}}>
        <Text style={styles.mainTitle}>Create an account</Text>
        <View style={styles.topBox}>
          <Text style={{color: BaseColors.black, fontSize: 20}}>✌️</Text>
          <Text style={styles.tagline}>Join us and explore more! </Text>
        </View>
      </View>
      <View style={{width: '90%'}}>
        <CInput
          lable="Username"
          value={username}
          onChangeText={e => (
            setUsername(e), setErrorObj({...errorObj, showUserError: false})
          )}
          icon="account-circle"
          errorMsg={errorObj.userError}
          errVisible={errorObj.showUserError}
          onBlur={() =>
            isEmpty(username) && setErrorObj({...errorObj, showUserError: true})
          }
        />
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
        <CInput
          lable="Phone"
          value={number}
          onChangeText={e => (
            setNumber(e), setErrorObj({...errorObj, showPhoneError: false})
          )}
          numericKeyboard
          icon="cellphone"
          errorMsg={errorObj.phoneError}
          errVisible={errorObj.showPhoneError}
          onBlur={() =>
            isEmpty(number) && setErrorObj({...errorObj, showPhoneError: true})
          }
        />
        <View
          style={{
            justifyContent: 'flex-end',
            flexDirection: 'row',
          }}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={{color: BaseColors.secondary}}>SignIn</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{width: '100%'}}>
        <Button
          loading={loading}
          style={{
            backgroundColor: BaseColors.secondary,
            marginBottom: 5,
            paddingVertical: 10,
            borderRadius: 5,
          }}
          icon="shield-account"
          mode="contained"
          onPress={() => createAccount()}>
          <Text style={{fontSize: 20}}>Signup</Text>
        </Button>
      </View>
    </LinearGradient>
  );
};

export default Signup;
