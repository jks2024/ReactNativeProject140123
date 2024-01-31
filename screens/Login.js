import React, {useState, useRef, useContext} from 'react';
import {
  View, // 뷰를 구성하기 위해 추가
  Text, // 텍스트를 출력하기 위해 추가
  TextInput, // 입력을 받기 위해 추가
  TouchableOpacity, // 터치 이벤트를 사용하기 위해 추가
  StyleSheet, // 스타일을 적용하기 위해 추가
  Image, // 이미지를 사용하기 위해 추가
  KeyboardAvoidingView, // 키보드가 올라오면서 화면이 잘리는 문제를 해결하기 위해 추가
  Platform, // OS별로 다른 UI를 구성하기 위해 추가
  ScrollView, // 스크롤뷰를 사용하기 위해 추가
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AxiosApi from '../api/AxiosApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from '../contexts/UserContext';

const styles = StyleSheet.create({
  container: {
    flex: 1, // 뷰가 차지하는 영역을 꽉 채우도록 설정
    backgroundColor: 'white', // 배경색을 흰색으로 설정
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'cover', // 이미지의 크기를 가로세로 비율을 유지하면서 설정
    alignSelf: 'center', // 자신의 컨텐츠의 중앙에 위치하도록 설정
    marginTop: 100,
    marginBottom: 40,
  },

  magin: {
    marginBottom: 10,
  },
  signup: {
    color: 'orange',
    fontWeight: '700',
    marginTop: 6,
    marginRight: 20,
    fontSize: 14,
    alignSelf: 'flex-end', // 오른쪽 정렬을 위한 추가
  },
  inputContainer: {
    width: '80%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 18,
    height: 50,
  },
  buttonContainer: {
    width: '80%',
    height: 50,
    backgroundColor: '#999',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  buttonEnabled: {
    backgroundColor: 'orange',
  },
  scrollViewContainer: {
    flexGrow: 1, // 스크롤뷰가 화면에 꽉 차도록 설정
    alignItems: 'center', // 가운데 정렬
  },
});

const Login = () => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPw, setInputPw] = useState('');
  const [isId, setIsId] = useState(false);
  const [isPw, setIsPw] = useState(false);

  const pwInputRef = useRef(); // 패스워드 입력창의 ref
  const navigation = useNavigation();
  const context = useContext(UserContext);
  const {setEmail} = context;

  const onChangeEmail = text => {
    console.log(text);
    setInputEmail(text);
    setIsId(text.length >= 5);
  };

  const onChangePw = text => {
    setInputPw(text);
    setIsPw(text.length >= 5);
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('email', inputEmail);
      await AsyncStorage.setItem('isLogin', 'TRUE');
      setEmail(inputEmail);
    } catch (err) {
      console.log(err);
    }
  };

  const onClickLogin = async () => {
    try {
      const rsp = await AxiosApi.memberLogin(inputEmail, inputPw);
      console.log(rsp.data);
      if (rsp.data) {
        saveData();
        navigation.navigate('MainTab');
      } else {
        alert('아이디 또는 패스워드를 확인해주세요.');
      }
    } catch (err) {
      console.log(err);
      alert('서버가 응답하지 않습니다.');
    }
  };

  const handleSignupPress = () => {
    // 회원가입 화면으로 이동
    navigation.navigate('Signup');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.topMagin}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>

        <TextInput
          style={styles.inputContainer}
          placeholder="이메일"
          value={inputEmail}
          onChangeText={onChangeEmail}
          onSubmitEditing={() => pwInputRef.current.focus()}
        />

        <View style={styles.magin} />
        <View style={styles.magin} />
        <TextInput
          ref={pwInputRef}
          style={styles.inputContainer}
          placeholder="패스워드"
          value={inputPw}
          onChangeText={onChangePw}
          secureTextEntry={true} // 입력 내용을 숨김
        />
        <View style={styles.signup}>
          <TouchableOpacity onPress={handleSignupPress}>
            <Text style={styles.signup}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.magin} />
        <View style={styles.magin} />
        <View style={styles.magin} />
        {isId && isPw ? (
          <TouchableOpacity
            style={[styles.buttonContainer, styles.buttonEnabled]}
            onPress={onClickLogin}>
            <Text style={styles.buttonText}>SIGN IN</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.buttonContainer} disabled>
            <Text style={styles.buttonText}>SIGN IN</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
