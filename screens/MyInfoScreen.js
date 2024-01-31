import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import AxiosApi from '../api/AxiosApi';
import ProfileHeader from '../components/ProfileHeader';

const DATA = [
  {title: '친구 초대', icon: 'face'},
  {title: '포인트', icon: 'control-point'},
  {title: '카테고리', icon: 'credit-card'},
  {title: '나의 문의', icon: 'done-outline'},
  {title: '나의 후기', icon: 'star'},
  {title: '환경 설정', icon: 'settings'},
  {title: '로그아웃', icon: 'logout'},
];

const MyInfoScreen = () => {
  const navigation = useNavigation();
  const [member, setMember] = useState(''); // 회원 정보를 저장할 객체
  const [email, setEmail] = useState('');

  const navigateToScreen = title => {
    switch (title) {
      case '친구 초대':
        navigation.navigate('FriendInviteScreen');
        break;
      case '포인트':
        navigation.navigate('PointsScreen');
        break;
      case '카테고리':
        navigation.navigate('Category');
        break;
      case '나의 문의':
        navigation.navigate('MyInquiriesScreen');
        break;
      case '나의 후기':
        navigation.navigate('MyReviewsScreen');
        break;
      case '환경 설정':
        navigation.navigate('SettingsScreen');
        break;
      case '로그아웃':
        // Handle logout logic
        break;
      // Add more cases as needed for other menu items
      default:
        console.log('Unknown Menu Item');
    }
  };

  useEffect(() => {
    const load = async () => {
      const isLogin = await AsyncStorage.getItem('isLogin');
      if (isLogin !== 'TRUE') {
        navigation.navigate('Login');
      } else {
        setEmail(await AsyncStorage.getItem('email'));
      }
    };
    load();
  }, []);

  useFocusEffect(
    useCallback(() => {
      // 이 부분에 회원 정보를 다시 불러오는 로직을 추가합니다.
      const memberInfo = async () => {
        try {
          const rsp = await AxiosApi.memberGetOne(email);
          setMember(rsp.data);
        } catch (err) {
          console.log(err);
        }
      };

      if (email) {
        memberInfo();
      }
    }, [email]),
  );

  const handleEditProfile = () => {
    navigation.navigate('EditProfileScreen', {member});
  };

  return (
    <View style={styles.container}>
      <ProfileHeader member={member} onEditProfile={handleEditProfile} />
      <View style={styles.margin} />
      <FlatList
        data={DATA}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigateToScreen(item.title)}>
            <View style={styles.menuItemContent}>
              <View style={styles.menuItemLeft}>
                <Icon name={item.icon} size={20} />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <Icon name="keyboard-arrow-right" size={20} />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    marginLeft: 16,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
  },
  editProfileButton: {
    marginTop: 20,
    marginLeft: 'auto',
    padding: 8,
    borderRadius: 8,
  },
  editProfileText: {
    color: 'royalblue',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 16,
  },
  margin: {
    marginBottom: 30,
  },
  menuItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },

  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MyInfoScreen;
