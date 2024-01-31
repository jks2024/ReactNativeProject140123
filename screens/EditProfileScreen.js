import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  Text,
  Platform,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import AxiosApi from '../api/AxiosApi';

const EditProfileScreen = ({route, navigation}) => {
  const {member} = route.params;
  const [name, setName] = useState(member.name);
  const [email, setEmail] = useState(member.email);
  const [profileImage, setProfileImage] = useState({
    uri: member.image || 'https://example.com/path/to/default/image.jpg',
  });

  const handleChoosePhoto = () => {
    console.log('handleChoosePhoto');
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android',
      },
      res => {
        if (res.didCancel || !res.assets) {
          console.log('User cancelled image picker');
          return;
        }

        const source = {
          uri: res.assets[0].uri,
          base64: res.assets[0].base64,
          type: res.assets[0].type,
        };
        setProfileImage(source);
      },
    );
  };

  const handleSave = async () => {
    const extension = profileImage.uri.split('.').pop(); // 확장자 추출
    const filename = `${member.email.split('@')[0]}.${extension}`;
    console.log('handleSave', filename);

    const reference = storage().ref(`/profile/${filename}`);

    if (Platform.OS === 'android') {
      await reference.putString(profileImage.base64, 'base64', {
        contentType: profileImage.type,
      });
    } else {
      await reference.putFile(profileImage.uri);
    }

    const url = await reference.getDownloadURL();
    setProfileImage({...profileImage, uri: url});
    console.log('handleSave url : ', url);

    // 회원 정보 수정
    await AxiosApi.menberUpdate(email, name, url);

    Alert.alert(
      'Profile Updated',
      'Your profile has been updated successfully.',
    );

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={handleChoosePhoto}>
        <Image source={{uri: profileImage.uri}} style={styles.profileImage} />
        <View style={styles.overlayContainer}>
          <Text style={styles.editText}>편집</Text>
        </View>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        editable={false} // 수정 불가
      />
      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 34,
  },
  input: {
    height: 42,
    borderColor: '#999',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  profileImage: {
    marginVertical: 60,
    width: 130,
    height: 130,
    backgroundColor: 'lightgray',
    borderRadius: 65,
  },
  overlayContainer: {
    position: 'absolute',
    top: 90,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editText: {
    color: 'white',
    padding: 5,
    borderRadius: 5,
  },
});

export default EditProfileScreen;
