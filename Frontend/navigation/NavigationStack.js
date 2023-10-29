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
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import Notifications from '../screens/Notifications';
import Home from '../screens/Home';
import Friends from '../screens/Friends';
import {BottomNavigation} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Settings from '../screens/Settings';
import Signup from '../screens/Signup';
import {useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import SignIn from '../screens/Signin';
import {BaseColors} from '../config/theme';
import CompleteProfile from '../screens/CompleteProfile';
import Profile from '../screens/Profile';
import ProfileLocking from '../screens/ProfileLocking';
import ChangePassword from '../screens/ChangePassword';
import PrivacyOptions from '../screens/PrivacyOptions';
import CreatePost from '../screens/CreatePost';
import Chat from '../screens/Chat';
import Message from '../screens/Message';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
      })}
      tabBar={({navigation, state, descriptors, insets}) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          activeColor={BaseColors.black}
          inactiveColor={'#777'}
          style={{
            borderTopWidth: 1,
            borderColor: BaseColors.black20,
            backgroundColor: 'white',
          }}
          onTabPress={({route, preventDefault}) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.navigate(route.name, route.params);
            }
          }}
          renderIcon={({route, focused, color}) => {
            const {options} = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({focused, color, size: 25});
            }
            return null;
          }}
          getLabelText={({route}) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            return label;
          }}
        />
      )}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Friends"
        component={Friends}
        options={{
          tabBarLabel: 'Friends',
          tabBarIcon: ({color, size}) => {
            return <Icon name="account-multiple" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Post"
        component={CreatePost}
        options={{
          tabBarLabel: 'Post',
          tabBarIcon: ({color, size}) => {
            return <Icon name="plus-box" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({color, size}) => {
            return <Icon name="bell" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color, size}) => {
            return <Icon name="cog" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const NavigationStack = () => {
  const userData = useSelector(state => state.userData.userData);
  const profileData = useSelector(state => state.profileData.profileData);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoading ? (
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
        ) : (
          <>
            {isEmpty(userData) && isEmpty(profileData) ? (
              <>
                <Stack.Screen
                  name="SignIn"
                  component={SignIn}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="Signup"
                  component={Signup}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="BottomTabNavigator"
                  component={BottomTabNavigator}
                  options={{headerShown: false}}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="BottomTabNavigator"
                  component={BottomTabNavigator}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="Signup"
                  component={Signup}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="SignIn"
                  component={SignIn}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="CompleteProfile"
                  component={CompleteProfile}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="Profile"
                  component={Profile}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="ProfileLocking"
                  component={ProfileLocking}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="ChangePassword"
                  component={ChangePassword}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="PrivacyOptions"
                  component={PrivacyOptions}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="CreatePost"
                  component={CreatePost}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="Chat"
                  component={Chat}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="Message"
                  component={Message}
                  options={{headerShown: false}}
                />
              </>
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationStack;
