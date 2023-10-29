import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-paper';
import {BaseColors} from '../../config/theme';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import {
  completeProfile_API_CALL,
  getcities_API_CALL,
  getcountries_API_CALL,
  getProfession_API_CALL,
  updateProfile_API_CALL,
} from '../../services/api';
import styles from './styles';
import DataSlide from '../../components/DataSlide';
import {useDispatch, useSelector} from 'react-redux';
import {setProfileData} from '../../redux/actions/actions';
import ImagePicker from 'react-native-image-crop-picker';
import {ImageBundle} from '../../config/ImageBundle';
import LottieView from 'lottie-react-native';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
const CompleteProfile = ({navigation}) => {
  const profileData = useSelector(state => state.profileData.profileData);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [birth, setBirth] = useState(
    profileData?.DateOfBirth ? profileData?.DateOfBirth : null,
  );
  const [bio, setBio] = useState(profileData?.Bio ? profileData?.Bio : null);
  const [professionItems, setProfessionItems] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cityItems, setCityItems] = useState([]);
  const [professionVal, setProfessionVal] = useState(
    profileData?.Profession ? profileData?.Profession : null,
  );
  const [countryVal, setCountryVal] = useState(
    profileData?.Country ? profileData?.Country : null,
  );
  const [cityVal, setCityVal] = useState(
    profileData?.City ? profileData?.City : null,
  );
  const [offBtn, setOffBtn] = useState(true);
  const [genderItems, setGenderItems] = useState();
  const [genderVal, setGenderVal] = useState(
    profileData?.Gender ? profileData?.Gender : null,
  );
  const [sendToProfile, setSendToProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState(
    profileData?.profile_pic ? profileData?.profile_pic : null,
  );
  const [isModalVisible, setModalVisible] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [profileExist, setProfileExist] = useState(null);
  const userData = useSelector(state => state.userData.userData);
  const dispatch = useDispatch();

  // here check first that profile is available or not. if available then UPDATE API else CREATE API
  useEffect(() => {
    // handleProfile()
    setProfileExist(profileData?.email);
    console.log('EMAIL > ', profileData?.email);
    console.log(
      profileData?.email ? 'MAKE UPDATE API FIRST' : 'CREATE CALL NEED',
    );
  }, []);

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
  useEffect(() => {
    console.log('only pah...', pic);
  }, [pic]);

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
  useEffect(() => {
    setGenderItems([
      {
        label: 'Male',
        value: 'Male',
      },
      {
        label: 'Female',
        value: 'Female',
      },
      {
        label: 'Other',
        value: 'Other',
      },
    ]);
  }, []);

  useEffect(() => {
    getProfessions();
    getCountries();
  }, []);

  useEffect(() => {
    if (countryVal) {
      getCities();
    }
  }, [countryVal]);

  const [allData, setAllData] = useState();
  useEffect(() => {
    // profile related all data
    const profileObject = {
      username: userData?.username || profileData?.username,
      email: userData?.email || profileData?.email,
      phone: userData?.phone || 0,
      profile_pic: pic ? pic : null,
      Age: 22,
      Bio: bio,
      DateOfBirth: birth,
      Profession: professionVal,
      Country: countryVal,
      City: cityVal,
      Gender: genderVal,
    };
    if (
      bio?.length > 0 &&
      birth &&
      professionVal &&
      countryVal &&
      cityVal &&
      genderVal
    ) {
      setOffBtn(false);
      setSendToProfile(profileObject);
    } else {
      setOffBtn(true);
    }
    setAllData(profileObject);
  }, [pic, bio, birth, professionVal, countryVal, cityVal, genderVal]);

  // GET CITIES DROP DOWN LIST
  const getCities = async () => {
    const response = await getcities_API_CALL();
    try {
      const cities = response?.data[0]?.[countryVal]?.map(item => ({
        label: item,
        value: item,
      }));
      setCityItems(cities);
    } catch (error) {
      console.log('City Api integration error => ', error);
    }
  };

  // GET PROFESSION DROP DOWN LIST
  const getProfessions = async () => {
    const response = await getProfession_API_CALL();
    const transformedItems = response?.data[0]?.profession?.map(item => ({
      label: item,
      value: item,
    }));
    setProfessionItems(transformedItems);
  };

  // GET COUNTRY LIST DROP DOWN
  const getCountries = async () => {
    const response = await getcountries_API_CALL();
    const transformedItems = response?.data[0]?.countries?.map(item => ({
      label: item,
      value: item,
    }));
    setCountries(transformedItems);
  };

  // FINALLY... :) MAKE THE PROFILE HERE
  const makeProfile = async () => {
    setLoading(true);
    try {
      console.log('REQUEST : ', sendToProfile);
      const response = await completeProfile_API_CALL(sendToProfile);
      console.log('RESP : ', response);
      dispatch(setProfileData(response?.data?.profile));
      setCompleted(true);
      setLoading(false);

        //FIRESTORE CODE HERE
        const userId = uuid?.v4();
        firestore()
          .collection('users')
          .doc(userId)
          .set({
            username: userData?.username || profileData?.username,
            email: userData?.email || profileData?.email,
            phone: userData?.phone || 0,
            profile_pic: pic ? pic : null,
            userId: userId,
          })
          .then(res => {
            console.log('User created');
          })
          .catch(e => {
            console.log('ERROR : ', e);
          });


      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } catch (error) {
      console.log('ERROR found at api integraion => /Complete Profile', error);
      setLoading(false);
    }
  };

  // handle which call we should apply
  const handleProfile = () => {
    if (profileExist) {
      console.log('MAKE UPDATE API FIRST ');
      updateProfile();
    } else {
      makeProfile();
    }
  };

  const updateProfile = async () => {
    setLoading(true);
    try {
      await updateProfile_API_CALL(allData?.email, allData);
      dispatch(setProfileData(allData));
      console.log('ALL DATA : ', allData);
      Toast.show({
        type: 'success',
        text1: 'Profile Updated',
      });
       //FIRESTORE CODE HERE
       const userId = uuid?.v4();
       firestore()
         .collection('users')
         .doc(userId)
         .set({
           username: userData?.username || profileData?.username,
           email: userData?.email || profileData?.email,
           phone: userData?.phone || 0,
           profile_pic: pic ? pic : null,
           userId: userId,
         })
         .then(res => {
           console.log('User created');
         })
         .catch(e => {
           console.log('ERROR : ', e);
         });
      setLoading(false);
      navigation.goBack();
    } catch (error) {
      console.log('Update profile api call => ', error);
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['rgb(230, 192, 254)', 'rgb(254, 254, 254)']}
      style={{flex: 1}}
      start={{x: 0.0, y: 0.0}}
      end={{x: 1.0, y: 1.0}}>
      {!completed && (
        <Header
          title={profileData?.email ? ' Edit Profile' : 'Create Profile'}
        />
      )}

      {completed ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <LottieView
            source={require('../../assets/Lottie/check.json')} // Path to your animation file
            autoPlay
            style={{height: 120, width: 120}}
            loop
            speed={0.6}
          />
          <Text
            style={{marginTop: 15, color: BaseColors.secondary, fontSize: 18}}>
            Your profile is ready
          </Text>
        </View>
      ) : (
        <KeyboardAvoidingView>
          <ScrollView>
            <View style={{paddingHorizontal: 20}}>
              <View style={{alignItems: 'center', marginTop: 25}}>
                <View>
                  <Image
                    source={pic ? {uri: pic} : ImageBundle.avatar}
                    style={{height: 100, width: 100, borderRadius: 50}}
                  />
                  <TouchableOpacity
                    style={{
                      backgroundColor: BaseColors.secondary,
                      width: 35,
                      height: 35,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 50,
                      position: 'absolute',
                      bottom: -8,
                      right: -3,
                    }}
                    onPress={() => toggleModal()}>
                    <Icon name="camera" size={15} color={BaseColors.white} />
                  </TouchableOpacity>
                </View>
              </View>
              <TextInput
                multiline
                placeholder="&nbsp;Your bio data"
                value={bio}
                onChangeText={e => setBio(e)}
                style={{
                  marginTop: 30,
                  fontSize: 15,
                  borderWidth: 1,
                  borderColor: BaseColors.primaryLight,
                  elevation: 1,
                  width: '100%',
                  height: 150,
                  borderRadius: 5,
                  backgroundColor: bio ? BaseColors.white40 : 'rgba(0,0,0,0)',
                  textAlignVertical: 'top',
                  color: bio ? BaseColors.secondary : BaseColors.black90,
                }}
              />

              <TouchableOpacity
                style={{
                  height: 50,
                  marginVertical: 25,
                  borderWidth: 1,
                  borderColor: BaseColors.primaryLight,
                  elevation: 1,
                  backgroundColor: birth ? BaseColors.white40 : 'rgba(0,0,0,0)',
                  width: '100%',
                  borderRadius: 5,
                  justifyContent: 'center',
                  paddingHorizontal: 5,
                }}
                onPress={() => setOpen(true)}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon
                    name="calendar"
                    size={25}
                    style={{
                      color: birth ? BaseColors.secondary : BaseColors.black90,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      color: birth ? BaseColors.secondary : BaseColors.black90,
                    }}>
                    {' '}
                    {birth ? birth : 'DD-MM-YYYY / (Date of birth)'}
                  </Text>
                </View>
              </TouchableOpacity>
              <DatePicker
                modal
                title={'Date of birth'}
                mode="date"
                open={open}
                date={date}
                onConfirm={date => {
                  setOpen(false);
                  console.log(moment(date).format('DD-MM-YYYY'));
                  setDate(date);
                  setBirth(moment(date).format('DD-MM-YYYY'));
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />

              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <DataSlide
                  lable={'Choose your profession'}
                  bundle={professionItems}
                  initialValue={professionVal}
                  onSelect={value => setProfessionVal(value)}
                  iconName={'business-center'}
                />
                <DataSlide
                  lable={'Select Country'}
                  bundle={countries}
                  initialValue={countryVal}
                  onSelect={value => setCountryVal(value)}
                  iconName={'earth'}
                />

                {countryVal && (
                  <DataSlide
                    lable={'Select City'}
                    bundle={cityItems}
                    initialValue={cityVal}
                    onSelect={value => setCityVal(value)}
                    iconName={'road'}
                  />
                )}

                <DataSlide
                  lable={'Select Gender'}
                  bundle={genderItems}
                  initialValue={genderVal}
                  onSelect={value => setGenderVal(value)}
                  iconName={'transgender'}
                />
              </View>

              <Button
                loading={loading}
                disabled={offBtn}
                mode="contained"
                style={{
                  backgroundColor: offBtn
                    ? BaseColors.black10
                    : BaseColors.secondary,
                  marginTop: 15,
                  paddingVertical: 10,
                  borderRadius: 5,
                  marginBottom: 100,
                }}
                onPress={() => handleProfile()}>
                <Text
                  style={{
                    fontSize: 20,
                    color: offBtn ? BaseColors.black40 : BaseColors.white,
                  }}>
                  {profileData?.email ? ' Update Now' : 'Create Profile'}
                </Text>
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}

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
              Choose picture
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

export default CompleteProfile;
