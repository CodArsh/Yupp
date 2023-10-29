import {View, Text, TouchableOpacity, Modal} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../components/Header';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import {BaseColors} from '../../config/theme';
import styles from './styles';
const ProfileLocking = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <LinearGradient
      colors={['rgb(230, 192, 254)', 'rgb(254, 254, 254)']}
      style={{flex: 1}}
      start={{x: 0.0, y: 0.0}}
      end={{x: 1.0, y: 1.0}}>
      <Header title={'Profile Locking'} />
      <View
        style={{
          padding: 20,
          marginTop: 15,
          justifyContent: 'space-between',
          flex: 1,
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 16}}>
          With this feature, you can secure your profile with a password, PIN,
          or biometric authentication, granting exclusive access to trusted
          users. Keep your personal information and data safe, prevent
          unauthorized access, and enjoy peace of mind while using our app
        </Text>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Icon name="user-circle" size={45} color={BaseColors.black30} />
          <Icon
            name="lock"
            size={150}
            style={{marginTop: -120}}
            color={'rgba(0,0,0,0.1)'}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{width: '100%'}}
          onPress={() => toggleModal()}>
          <Button
            mode="contained"
            style={{borderRadius: 5, paddingVertical: 8}}>
            <Icon name="lock" size={20} />
            &nbsp;&nbsp;
            <Text style={{fontSize: 18}}>Lock Now</Text>
          </Button>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide" // Set the animation type to "slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          toggleModal();
        }}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modal}
          onPress={() => toggleModal()}>
          <View style={styles.modalCard}>
            <Text style={styles.titleM}>Are you sure?</Text>
            <Text style={styles.descM}>Do you want lock your Profile?</Text>
            <View style={styles.btnM}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Button
                  style={{width: 100, paddingVertical: 5, borderRadius: 50}}
                  mode="outlined">
                  No
                </Button>
              </TouchableOpacity>

              <TouchableOpacity>
                <Button
                  style={{width: 100, paddingVertical: 5, borderRadius: 50}}
                  mode="contained">
                  Yes
                </Button>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </LinearGradient>
  );
};

export default ProfileLocking;
