import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../components/Header';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import CardDetails from '../../components/CardDetails';
import {
  checkFollow_API_CALL,
  getAllProfiles_API_CALL,
} from '../../services/api';
import {useSelector} from 'react-redux';
import {ImageBundle} from '../../config/ImageBundle';
import ImagePicker from 'react-native-image-crop-picker';
import styles from './styles';
import {BaseColors} from '../../config/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
const Friends = () => {
  const profileData = useSelector(state => state.profileData.profileData);
  const [users, setUsers] = useState([]);
  const [matchEmail, setMatchEmail] = useState([]);
  const [btn, setBtn] = useState(true);
  useEffect(() => {
    fetchProfiles();
  }, [btn]);

  const fetchProfiles = async () => {
    try {
      const resp = await getAllProfiles_API_CALL();
      setUsers(resp?.data);
      checkList();
    } catch (error) {
      console.log('Profile details integration error => ', error);
    }
  };

  const checkList = async () => {
    const resp = await checkFollow_API_CALL(profileData?.email);
    if (resp?.status) {
      setMatchEmail(resp?.data?.user);
    }
  };
  const [isModalVisible, setModalVisible] = useState(false);
  const [pic, setPic] = useState(null);

  // UPLOAD IMAGE AREA
  const takePictutreFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      const imagePath = image?.path;
      const pathParts = imagePath.split('/');
      const imageName = pathParts[pathParts.length - 1];
      console.log('Image Name:', imageName);
      console.log('Image Path:', imagePath);
      console.log('Image Type:', image?.mime);
      setPic(image?.path);
    });
    setModalVisible(false);
  };

  const takePictutreFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setPic(image?.path);
    });
    setModalVisible(false);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const RenderStatus = ({src, name, time}) => {
    return (
      <View
        style={{
          paddingHorizontal: 20,
          marginBottom: 18,
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 5,
        }}>
        <Image
          source={src}
          style={{
            height: 50,
            width: 50,
            backgroundColor: BaseColors.white,
            borderRadius: 50,
            borderWidth: 2,
            borderColor: BaseColors.white,
            // marginRight: 12,
          }}
        />

        <View>
          <Text style={{fontSize: 18, fontWeight: '700', marginLeft: 15}}>
            {name}
          </Text>
          <Text style={{fontSize: 13, marginLeft: 15}}>{time}</Text>
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['rgb(230, 192, 254)', 'rgb(254, 254, 254)']}
      style={{flex: 1}}
      start={{x: 0.0, y: 0.0}}
      end={{x: 1.0, y: 1.0}}>
      <Header title={'Status'} noBack />
      <View
        style={{
          paddingHorizontal: 20,
          marginBottom: 18,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={{uri: pic ? pic : profileData?.profile_pic}}
          style={{
            height: 50,
            width: 50,
            backgroundColor: BaseColors.white,
            borderRadius: 50,
            // marginRight: 12,
          }}
        />
        {!pic && (
          <TouchableOpacity
            style={{
              backgroundColor: BaseColors.white,
              height: 25,
              width: 25,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: -20,
              marginTop: 25,
            }}
            onPress={() => toggleModal()}>
            <Icon name="add" size={22} />
          </TouchableOpacity>
        )}
        <View>
          <Text style={{fontSize: 18, fontWeight: '700', marginLeft: 15}}>
            My Status
          </Text>
          {pic && <Text style={{fontSize: 13, marginLeft: 15}}>Just Now</Text>}
        </View>
      </View>
      <View style={{borderWidth: 0.3, borderColor: BaseColors.black30}} />
      <Text style={{marginHorizontal: 20, marginTop: 25}}>Recent Updates</Text>

      <RenderStatus
        src={ImageBundle.status}
        name={'Yupp'}
        time={'Welcome to Yupp'}
      />
      <RenderStatus  src={ImageBundle.hotel} name={'Humayu'} time={'Today 2:19 pm'} />
      <RenderStatus src={ImageBundle.paper} name={'Montu'} time={'Today 1:14 pm'} />
      <RenderStatus src={ImageBundle.dora} name={'Arsil'} time={'Yesterday 11:25 am'} />
      <Header title={'Network'} noBack />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <ScrollView
          horizontal
          style={{paddingVertical: 5}}
          showsHorizontalScrollIndicator={false}>
          {users?.map((item, index) => {
            return (
              profileData?.email !== item?.email && (
                <CardDetails
                  firstCard={index === 0}
                  username={item?.username}
                  profession={item?.Profession}
                  photo={item?.profile_pic}
                  key={index}
                  data={item}
                  index={profileData?.email !== item?.email && index === 1}
                  buttonTag={
                    matchEmail?.includes(item?.email) ? 'Following' : 'Follow'
                  }
                  btn={btn}
                  setBtn={setBtn}
                />
              )
            );
          })}
        </ScrollView>
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
          style={styles.modalContainer}
          onPress={() => toggleModal()}>
          <View style={styles.modalContent}>
            <Text
              style={{
                fontSize: 23,
                color: BaseColors.secondary,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Upload Status
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: '55%',
                marginVertical: 35,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity onPress={() => takePictutreFromGallery()}>
                <Icon2 name="image" size={40} color={BaseColors.secondary} />
                <Text style={{textAlign: 'center', marginTop: 5}}>Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => takePictutreFromCamera()}>
                <Icon2 name="camera" size={40} color={BaseColors.secondary} />
                <Text style={{textAlign: 'center', marginTop: 5}}>Camera</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </LinearGradient>
  );
};

export default Friends;
