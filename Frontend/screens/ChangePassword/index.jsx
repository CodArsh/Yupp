import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import Header from '../../components/Header';
import LinearGradient from 'react-native-linear-gradient';
import CInput from '../../components/CInput';
import {isEmpty} from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-paper';
const ChangePassword = () => {
  const [msgPass, setMsgPass] = useState('Please Confirm new password');
  const errObj = {
    oldError: 'Please enter old password',
    showOldError: false,

    newPassErr: 'Please enter new password',
    showNewPassError: false,

    matchError: msgPass,
    showMatchError: false,
  };

  const [errorObj, setErrorObj] = useState(errObj);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [matchPass, setMatchPass] = useState('');

  const validation = () => {
    setMsgPass('');
    if (newPass === matchPass) {
      alert('success');
    }
  };

  useEffect(() => {
    if (matchPass) {
      if (newPass !== matchPass) {
        const confirm = {
          ...errorObj,
          matchError: 'New password & Confirm password is not matched',
        };
        setErrorObj({...confirm, showMatchError: true});
      }
    }
  }, [matchPass]);
  return (
    <LinearGradient
      colors={['rgb(230, 192, 254)', 'rgb(254, 254, 254)']}
      style={{flex: 1}}
      start={{x: 0.0, y: 0.0}}
      end={{x: 1.0, y: 1.0}}>
      <Header title={'Change Password'} />
      <View
        style={{
          flex: 1,
          padding: 20,
          justifyContent: 'space-between',
        }}>
        <View>
          <CInput
            lable="Old Password"
            value={oldPass}
            onChangeText={e => (
              setOldPass(e), setErrorObj({...errorObj, showOldError: false})
            )}
            icon="key-minus"
            secureTextEntry
            errorMsg={errorObj.oldError}
            errVisible={errorObj.showOldError}
            onBlur={() =>
              isEmpty(oldPass) && setErrorObj({...errorObj, showOldError: true})
            }
          />
          <CInput
            lable="New Password"
            value={newPass}
            onChangeText={e => (
              setNewPass(e), setErrorObj({...errorObj, showNewPassError: false})
            )}
            icon="key-plus"
            secureTextEntry
            errorMsg={errorObj.newPassErr}
            errVisible={errorObj.showNewPassError}
            onBlur={() =>
              isEmpty(newPass) &&
              setErrorObj({...errorObj, showNewPassError: true})
            }
          />
          <CInput
            lable="Confirm New Password"
            value={matchPass}
            onChangeText={e => (
              setMatchPass(e), setErrorObj({...errorObj, showMatchError: false})
            )}
            icon="key-chain"
            secureTextEntry
            errorMsg={errorObj.matchError}
            errVisible={errorObj.showMatchError}
            onBlur={() =>
              isEmpty(matchPass) &&
              setErrorObj({...errorObj, showMatchError: true})
            }
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={{width: '100%'}}
          onPress={validation}>
          <Button
            disabled={
              isEmpty(oldPass) || isEmpty(newPass) || isEmpty(matchPass)
            }
            mode="contained"
            style={{borderRadius: 5, paddingVertical: 8}}>
            <Icon name="key" size={20} />
            &nbsp;&nbsp;
            <Text style={{fontSize: 18}}>Change Password</Text>
          </Button>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default ChangePassword;
