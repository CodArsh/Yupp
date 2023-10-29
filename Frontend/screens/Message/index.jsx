import {StyleSheet, StatusBar, Text, Image, View} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {BaseColors} from '../../config/theme';
import Header from '../../components/Header';
const Message = ({route}) => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://facebook.github.io/react/img/logo_og.png',
        },
      },
    ]);

    const subscriber = firestore()
      .collection('chats')
      .doc(route.params.email + route.params.data.email)
      .collection('messages')
      .orderBy('createdAt', 'desc');

    subscriber.onSnapshot(snap => {
      const allMsg = snap.docs.map(item => {
        return {
          ...item._data,
          createdAt: Date?.parse(new Date()),
        };
      });
      setMessages(allMsg);
    });
    // return () => subscriber();
  }, []);

  const onSend = useCallback((messages = []) => {
    const msg = messages[0];
    const myMsg = {
      ...msg,
      sendBy: route.params.email,
      sendTo: route.params.data.email,
      createdAt: Date.parse(msg.createdAt),
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));
    firestore()
      .collection('chats')
      .doc('' + route.params.email + route.params.data.email)
      .collection('messages')
      .add(myMsg);

    firestore()
      .collection('chats')
      .doc('' + route.params.data.email + route.params.email)
      .collection('messages')
      .add(myMsg);
  }, []);

  const renderBubble = props => {
    return (
      <View>
        {props.currentMessage.user._id === route.params.email ? (
          <View
            style={{
              backgroundColor: BaseColors.secondary,
              borderRadius: 5,
              padding: 15,
            }}>
            <Text style={{color: 'white'}}>{props.currentMessage.text}</Text>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: '#E5E5EA',
              borderRadius: 5,
              padding: 15,
              marginLeft: -40,
              borderWidth:0.3,
              borderColor:BaseColors.secondary
            }}>
            <Text style={{color: 'black'}}>{props.currentMessage.text}</Text>
          </View>
        )}
      </View>
    );
  };
  const Header = () => {
    return (
      <View
        style={{
          backgroundColor: BaseColors.secondary,
          padding: 10,
          flexDirection: 'row',
        }}>
        <Image
          source={{uri: route?.params?.data?.profile_pic}}
          style={{height: 50, width: 50, borderRadius: 50}}
        />
        <Text
          style={{
            color: BaseColors.white,
            fontSize: 20,
            padding: 15,
            fontWeight: 'bold',
          }}>
          {route?.params?.data?.username}
        </Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <StatusBar
        backgroundColor={BaseColors.secondary}
        barStyle={'light-content'}
      />
      <Header />
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: route.params.email,
        }}
        messagesContainerStyle={{backgroundColor: BaseColors.primaryLight}}
        renderBubble={renderBubble}

        // customStyles={customStyles}
      />
    </View>
  );
};

export default Message;
