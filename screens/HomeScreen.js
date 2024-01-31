import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {TransBtn} from '../components/ButtonComponent';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const load = async () => {
      const isLogin = await AsyncStorage.getItem('isLogin');
      if (isLogin !== 'TRUE') {
        navigation.navigate('Login');
      }
    };
    load();
  }, []);

  const onClickBtn = num => {
    switch (num) {
      case 1:
        navigation.navigate('MyInfo');
        break;
      case 2:
        navigation.navigate('Board');
        break;
      case 3:
        navigation.navigate('Chatting');
        break;
      case 4:
        navigation.navigate('MyLoc');
        break;
    }
  };

  return (
    <View style={styles.block}>
      <TransBtn color="royalblue" onPress={() => onClickBtn(1)}>
        내 정보
      </TransBtn>
      <TransBtn color="royalblue" onPress={() => onClickBtn(2)}>
        게시판
      </TransBtn>
      <TransBtn color="royalblue" onPress={() => onClickBtn(3)}>
        채팅
      </TransBtn>
      <TransBtn color="royalblue" onPress={() => onClickBtn(4)}>
        내 위치
      </TransBtn>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    margin: 26,
  },
});

export default HomeScreen;
