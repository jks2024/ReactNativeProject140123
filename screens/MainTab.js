import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import MyLocScreen from './MyLocScreen';
import ChattingScreen from './ChattingScreen';
import BoardScreen from './BoardScreen';
import MyInfoScreen from './MyInfoScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarLabelStyle: {display: 'none'}, // 라벨 숨기기
        tabBarActiveTintColor: '#009688', // 활성 탭 색상
      })}>
      <Tab.Screen
        name="홈"
        component={HomeScreen}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="게시판"
        component={BoardScreen}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <Icon name="dashboard" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="내주변"
        component={MyLocScreen}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <Icon name="my-location" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="채팅"
        component={ChattingScreen}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <Icon name="wechat" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="내정보"
        component={MyInfoScreen}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <Icon name="menu" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
