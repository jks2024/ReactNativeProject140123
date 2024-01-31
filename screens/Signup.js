import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AxiosApi from '../api/AxiosApi';
import ModalComponent from '../components/ModalComponent';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContainer: {
    flexGrow: 1, // 스크롤뷰가 화면에 꽉 차도록 설정
    alignItems: 'center', // 가운데 정렬
    justifyContent: 'center', // 수직 가운데 정렬
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  topMagin: {
    marginBottom: 40,
    justifyContent: 'center',
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
    textDecorationLine: 'none',
    alignSelf: 'flex-end',
  },
  hint: {
    marginTop: 6,
    marginBottom: 10,
    marginRight: 40,
    alignSelf: 'flex-end',
    fontSize: 12,
    color: '#999',
  },
  errorMsg: {
    color: 'red',
    fontSize: 12,
    marginLeft: 10,
  },
  successMsg: {
    color: 'green',
    fontSize: 12,
    marginLeft: 10,
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
});

const MsgComponent = ({input, type, msg}) => {
  return (
    <View style={styles.hint}>
      {input.length > 0 ? (
        <Text style={type ? styles.successMsg : styles.errorMsg}>{msg}</Text>
      ) : (
        <Text>{}</Text>
      )}
    </View>
  );
};

const Signup = () => {
  const [inputPw, setInputPw] = useState('');
  const [inputConPw, setInputConPw] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [pwMessage, setPwMessage] = useState('');
  const [conPwMessage, setConPwMessage] = useState('');
  const [mailMessage, setMailMessage] = useState('');
  const [isEmail, setIsEmail] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [isConPw, setIsConPw] = useState(false);
  const [isName, setIsName] = useState(false);

  const pwInputRef = useRef(); // 패스워드 입력창의 ref
  const conPwInputRef = useRef(); // 패스워드 확인 입력창의 ref
  const nameInputRef = useRef(); // 이름 입력창의 ref
  const navigation = useNavigation();

  const onChangeEmail = text => {
    setInputEmail(text);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(text)) {
      setMailMessage('이메일 형식이 올바르지 않습니다.');
      setIsEmail(false);
    } else {
      setMailMessage('올바른 형식 입니다.');
      setIsEmail(true);
      memberRegCheck(text);
    }
  };

  const onChangePw = text => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    setInputPw(text);
    if (!passwordRegex.test(text)) {
      setPwMessage('숫자+영문자 조합으로 8자리 이상 입력해주세요!');
      setIsPw(false);
    } else {
      setPwMessage('안전한 비밀번호에요 : )');
      setIsPw(true);
    }
  };

  const onChangeConPw = text => {
    setInputConPw(text);
    if (text !== inputPw) {
      setConPwMessage('비밀 번호가 일치하지 않습니다.');
      setIsConPw(false);
    } else {
      setConPwMessage('비밀 번호가 일치 합니다. )');
      setIsConPw(true);
    }
  };

  const onChangeName = text => {
    setInputName(text);
    setIsName(true);
  };

  const memberRegCheck = async email => {
    try {
      const rsp = await AxiosApi.memberRegCheck(email);
      console.log(rsp.data);
      if (rsp.data) {
        setMailMessage('사용 가능한 이메일 입니다.');
        setIsEmail(true);
      } else {
        setMailMessage('중복된 이메일 입니다.');
        setIsEmail(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickMemberReg = async () => {
    try {
      const rsp = await AxiosApi.memberReg(inputEmail, inputPw, inputName);
      console.log(rsp.data);
      if (rsp.data) {
        alert('회원가입이 완료되었습니다.');
        navigation.navigate('Login');
      } else {
        alert('회원가입이 실패하였습니다.');
      }
    } catch (err) {
      console.log(err);
      alert('서버가 응답하지 않습니다.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
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
        <MsgComponent input={inputEmail} type={isEmail} msg={mailMessage} />
        <TextInput
          ref={pwInputRef}
          style={styles.inputContainer}
          placeholder="패스워드"
          value={inputPw}
          onChangeText={onChangePw}
          secureTextEntry={true}
          onSubmitEditing={() => conPwInputRef.current.focus()}
        />
        <MsgComponent input={inputPw} type={isPw} msg={pwMessage} />
        <TextInput
          ref={conPwInputRef}
          style={styles.inputContainer}
          placeholder="패스워드 확인"
          value={inputConPw}
          onChangeText={onChangeConPw}
          secureTextEntry={true}
          onSubmitEditing={() => nameInputRef.current.focus()}
        />
        <MsgComponent input={inputConPw} type={isConPw} msg={conPwMessage} />
        <TextInput
          ref={nameInputRef}
          style={styles.inputContainer}
          placeholder="이름"
          value={inputName}
          onChangeText={onChangeName}
        />
        <View style={styles.magin} />
        <View style={styles.magin} />
        {isEmail && isPw && isConPw && isName ? (
          <TouchableOpacity
            style={[styles.buttonContainer, styles.buttonEnabled]}
            onPress={onClickMemberReg}>
            <Text style={styles.buttonText}>회원 가입</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.buttonContainer} disabled>
            <Text style={styles.buttonText}>회원 가입</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Signup;
