import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainTab from './MainTab';
import Login from './Login';
import Signup from './Signup';
import EditProfileScreen from './EditProfileScreen';
import CategoryScreen from './CategoryScreen';
import BoardWriteScreen from './BoardWriteScreen';

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{title: '로그인'}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{title: '회원 가입'}}
      />
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{title: '프로필 편집'}}
      />
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={{title: '카테고리 편집'}}
      />
      <Stack.Screen
        name="BoardWrite"
        component={BoardWriteScreen}
        options={{title: '게시글 작성'}}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
