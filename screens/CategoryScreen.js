import React, {useState, useEffect} from 'react';
import {Alert, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosApi from '../api/AxiosApi';
import CateTemplate from '../components/board/CateTemplate';
import CateList from '../components/board/CateList';
import CateInsert from '../components/board/CateInsert';

const CategoryScreen = () => {
  const [category, setCategory] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); //삭제 대상 ID

  // Fetch email from AsyncStorage
  const getEmail = async () => {
    try {
      return await AsyncStorage.getItem('email');
    } catch (e) {
      // Error reading value
      console.log(e);
    }
  };

  useEffect(() => {
    const cateList = async () => {
      try {
        const rsp = await AxiosApi.cateList();
        console.log(rsp.data);
        setCategory(rsp.data);
      } catch (e) {
        console.log(e);
      }
    };
    cateList();
  }, []);

  const onInsert = async text => {
    const email = await getEmail();
    try {
      const rsp = await AxiosApi.cateInsert(email, text);
      console.log(rsp.data);
      if (rsp.data) {
        const rsp2 = await AxiosApi.cateList();
        setCategory(rsp2.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onRemove = id => {
    setSelectedCategoryId(id);
    console.log('삭제 대상 ID : ', id);
    Alert.alert('Confirmation', '카테고리 목록을 정말로 삭제하시겠습니까?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'OK', onPress: () => confirmModal()},
    ]);
  };

  const confirmModal = async () => {
    try {
      const rsp = await AxiosApi.cateDelete(selectedCategoryId);
      console.log(rsp.data);
      setCategory(rsp.data);
      if (rsp.data) {
        const rsp2 = await AxiosApi.cateList();
        setCategory(rsp2.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView>
      <CateTemplate>
        <CateInsert onInsert={onInsert} />
        <CateList cates={category} onRemove={onRemove} />
      </CateTemplate>
    </ScrollView>
  );
};

export default CategoryScreen;
