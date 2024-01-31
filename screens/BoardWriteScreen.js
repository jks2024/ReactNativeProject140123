import React, {useState, useEffect} from 'react';
import {
  View,
  Alert,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AxiosApi from '../api/AxiosApi';
import {launchImageLibrary} from 'react-native-image-picker'; // For image picking
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';

const BoardWriteScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [fileUri, setFileUri] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  useEffect(() => {
    const load = async () => {
      const data = await AsyncStorage.getItem('email');
      setEmail(data);
    };
    load();

    const loadCategories = async () => {
      try {
        const response = await AxiosApi.cateList();
        console.log('카테고리 목록 : ', response.data);
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadCategories();
  }, []);

  const handleImagePick = () => {
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
        console.log(source.uri);
        setFileUri(source);
      },
    );
  };

  const handleSubmit = async () => {
    console.log('글쓰기 버튼 클릭 : ', email);

    const filename = fileUri.uri.split('/').pop();
    const reference = storage().ref(`/board/${filename}`);
    console.log('filename : ', filename);

    if (Platform.OS === 'android') {
      await reference.putString(fileUri.base64, 'base64', {
        contentType: fileUri.type,
      });
    } else {
      await reference.putFile(fileUri.uri);
    }
    const url = await reference.getDownloadURL();
    setFileUri({...fileUri, uri: url});
    console.log('handleSave url : ', url);

    try {
      const response = await AxiosApi.boardWrite(
        email,
        title,
        selectedCategory,
        content,
        url,
      );
      if (response.data) {
        Alert.alert(
          'Profile Updated',
          'Your profile has been updated successfully.',
        );

        navigation.goBack();
      }

      // Navigate to another screen or reset form here
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    setTitle('');
    setContent('');
    setFileUri('');
    setSelectedCategory('');
    // Navigate to another screen if needed
  };

  return (
    <ScrollView style={styles.container}>
      <Picker
        selectedValue={selectedCategory}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedCategory(itemValue)
        }>
        <Picker.Item label="전체" value="all" />
        {categories.map(category => (
          <Picker.Item
            key={category.categoryId}
            label={category.categoryName}
            value={category.categoryId}
          />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        onChangeText={setTitle}
        value={title}
        placeholder="제목"
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        onChangeText={setContent}
        value={content}
        placeholder="내용"
        multiline
        numberOfLines={4}
      />
      <Button title="이미지 선택" onPress={handleImagePick} />
      <View style={styles.margin} />
      {fileUri ? (
        <Image source={{uri: fileUri.uri}} style={styles.image} />
      ) : null}

      <View style={styles.buttonContainer}>
        <Button title="글쓰기" onPress={handleSubmit} />
        <Button title="취소" onPress={handleReset} color="red" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  textArea: {
    height: 100,
  },
  image: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  margin: {
    marginBottom: 10,
  },
});

export default BoardWriteScreen;
