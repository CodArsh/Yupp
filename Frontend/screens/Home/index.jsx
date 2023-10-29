import {
  View,
  Text,
  Animated,
  Easing,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {Button, Card, AnimatedFAB, IconButton} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {ImageBundle} from '../../config/ImageBundle';
import styles from './styles';
import {BaseColors} from '../../config/theme';
import Share from 'react-native-share';
import {getPost_API_CALL} from '../../services/api';
const Home = ({navigation}) => {
  const userData = useSelector(state => state.userData.userData);
  const profileData = useSelector(state => state.profileData.profileData);
  const translateY = useRef(new Animated.Value(-500)).current;
  const [isVisible, setIsVisible] = useState(true);
  const [isExtended, setIsExtended] = useState(true);
  useEffect(() => {
    if (!profileData?.profile_pic || !profileData?.Bio) {
      showUpdateArea();
    }
  }, [isVisible]);

  useEffect(() => {
    postList();
  }, []);

  const [post, setPost] = useState([]);
  const postList = async () => {
    const resp = await getPost_API_CALL();
    if (resp?.status == 200) {
      setPost(resp?.data);
    }
  };

  const showUpdateArea = () => {
    if (isVisible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        duration: 20000,
        bounciness: 2,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: -1000,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();
    }
  };

  const onScroll = ({nativeEvent}) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };

  const shareText = async message => {
    try {
      const options = {
        message: message,
      };
      await Share.open(options);
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };

  return (
    <LinearGradient
      colors={['rgb(230, 192, 254)', 'rgb(254, 254, 254)']}
      style={{flex: 1, paddingHorizontal: 20}}
      start={{x: 0.0, y: 0.0}}
      end={{x: 1.0, y: 1.0}}>
      <View style={styles.main}>
        <View>
          <Text style={{fontSize: 22, color: '#6B4FAB'}}>Welcome 😇</Text>
          <Text style={{fontSize: 28, fontWeight: 'bold', color: '#6B4FAB'}}>
            {userData.username ? userData.username : profileData?.username}{' '}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.round}
          onPress={() =>
            navigation.navigate(
              profileData?.email ? 'Profile' : 'CompleteProfile',
            )
          }>
          <Image
            source={
              profileData?.profile_pic
                ? {uri: profileData?.profile_pic}
                : ImageBundle.avatar
            }
            style={styles.img}
          />
        </TouchableOpacity>
      </View>
      {!isVisible && (
        <Animated.View
          style={{
            transform: [{translateY}],
          }}>
          <Card>
            <Card.Actions
              style={{
                justifyContent: 'space-between',
                position: 'relative',
              }}>
              <Text
                style={{
                  position: 'absolute',
                  left: 0,
                }}>
                Please create your profile
              </Text>
              <Button mode="outlined" onPress={() => setIsVisible(false)}>
                Skip
              </Button>
              <Button
                onPress={() => (
                  setIsVisible(false), navigation.navigate('CompleteProfile')
                )}>
                Now
              </Button>
            </Card.Actions>
          </Card>
        </Animated.View>
      )}

      <ScrollView onScroll={onScroll} showsVerticalScrollIndicator={false}>
        {post?.map((item, index) => (
          <Card key={index} style={{marginBottom: 30}}>
            <Card.Title
              title={item?.username}
              subtitle={item?.createdAt}
              left={props => (
                <Image
                  source={item.dp ? {uri: item.dp} : ImageBundle.avatar}
                  style={{height: 50, width: 50, borderRadius: 50}}
                />
              )}
              right={props => (
                <IconButton
                  {...props}
                  icon="share-variant-outline"
                  onPress={() => {
                    shareText(item?.description)
                  }}
                />
              )}
            />
            <Card.Content>
              <Text
                variant="titleLarge"
                style={{fontSize: 18, marginBottom: 5, fontWeight: '600'}}>
                {item?.title}
              </Text>
              <Text variant="bodyMedium" style={{fontSize: 15}}>
                {item?.description}
              </Text>
            </Card.Content>
            <Card.Cover
              style={{
                marginTop: 10,
                borderTopRightRadius: 0,
                borderTopLeftRadius: 0,
              }}
              source={{
                uri: item?.postPic
                  ? item?.postPic
                  : 'https://picsum.photos/700',
              }}
            />
          </Card>
        ))}
      </ScrollView>
      <AnimatedFAB
        icon="chat-processing"
        label="Chat"
        extended={isExtended}
        onPress={() => navigation.navigate('Chat')}
        style={styles.fabStyle}
        color={BaseColors.white}
        rippleColor={BaseColors.black}
      />
    </LinearGradient>
  );
};

export default Home;
