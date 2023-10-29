import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import Header from '../../components/Header';
import LinearGradient from 'react-native-linear-gradient';
import {BaseColors} from '../../config/theme';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-paper';
import {isEmpty} from 'lodash';
import {post_API_CALL} from '../../services/api';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import moment from 'moment';
const CreatePost = ({navigation}) => {
  const profileData = useSelector(state => state.profileData.profileData);
  const [pic, setPic] = useState();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const takePictutreFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      const imagePath = image?.path;
      const pathParts = imagePath.split('/');
      const imageName = pathParts[pathParts.length - 1];
      setPic(image?.path);
    });
  };

  //create post api integration
  const handlePost = async () => {
    const params = {
      email: profileData?.email,
      username: profileData?.username,
      dp: profileData?.profile_pic,
      createdAt: moment(new Date()).format('MMM Do YY'),
      title: title,
      description: desc,
      postPic: pic,
    };
    const resp = await post_API_CALL(params);
    if (resp?.data?.status) {
      Toast.show({
        type: 'success',
        text1: resp?.data?.message,
      });
      navigation.goBack();
    } else {
      Toast.show({
        type: 'error',
        text1: 'All fields are required !',
      });
    }
  };
  return (
    <LinearGradient
      colors={['rgb(230, 192, 254)', 'rgb(254, 254, 254)']}
      style={{flex: 1}}
      start={{x: 0.0, y: 0.0}}
      end={{x: 1.0, y: 1.0}}>
      <Header title={'Create Post'} noBack />
      <View
        style={{
          paddingHorizontal: 20,
          justifyContent: 'space-between',
          height: '100%',
        }}>
        <View>
          <TextInput
            multiline
            placeholder="&nbsp;Title"
            value={title}
            onChangeText={e => setTitle(e)}
            style={{
              marginTop: 30,
              fontSize: 15,
              borderWidth: 1,
              borderColor: BaseColors.primaryLight,
              elevation: 1,
              width: '100%',
              height: 50,
              borderRadius: 5,
              backgroundColor: 1 ? BaseColors.white40 : 'rgba(0,0,0,0)',
              textAlignVertical: 'top',
              color: 1 ? BaseColors.secondary : BaseColors.black90,
            }}
          />
          <TextInput
            multiline
            placeholder="&nbsp;What do you want to talk about?"
            value={desc}
            onChangeText={e => setDesc(e)}
            style={{
              marginTop: 5,
              fontSize: 15,
              borderWidth: 1,
              borderColor: BaseColors.primaryLight,
              elevation: 1,
              width: '100%',
              height: 150,
              borderRadius: 5,
              backgroundColor: 1 ? BaseColors.white40 : 'rgba(0,0,0,0)',
              textAlignVertical: 'top',
              color: 1 ? BaseColors.secondary : BaseColors.black90,
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: BaseColors.white40,
              borderWidth: 0.7,
              borderColor: BaseColors.secondary,
              borderStyle: 'dashed',
              height: 230,
              marginVertical: 10,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => takePictutreFromGallery()}>
            {isEmpty(pic) ? (
              <Icon name={'camera'} size={50} color={BaseColors.secondary} />
            ) : (
              <Image
                source={{uri: pic}}
                style={{height: '100%', width: '100%'}}
              />
            )}
          </TouchableOpacity>
        </View>

        <Button
          mode="contained"
          style={{
            backgroundColor: BaseColors.secondary,
            marginTop: 15,
            paddingVertical: 10,
            borderRadius: 5,
            marginBottom: 80,
          }}
          onPress={() => handlePost()}>
          <Text
            style={{
              fontSize: 20,
              color: BaseColors.white,
            }}>
            POST
          </Text>
        </Button>
      </View>
    </LinearGradient>
  );
};

export default CreatePost;
