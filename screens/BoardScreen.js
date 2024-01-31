import React, {useState, useCallback} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AxiosApi from '../api/AxiosApi';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import BoardList from '../components/board/BoardList';
const BoardScreen = () => {
  const [boardList, setBoardList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const fetchBoardList = async () => {
        const response = await AxiosApi.boardList();
        setBoardList(response.data);
      };

      const fetchCategories = async () => {
        const response = await AxiosApi.cateList();
        setCategories(response.data);
      };

      fetchBoardList();
      fetchCategories();
    }, []),
  );

  return (
    <View style={styles.container}>
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
      <BoardList
        boardList={boardList}
        onItemPress={item =>
          navigation.navigate('BoardDetail', {boardId: item.boardId})
        }
      />
      <TouchableOpacity
        style={styles.writeButton}
        onPress={() => navigation.navigate('BoardWrite')}>
        <Text style={styles.writeButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  picker: {
    alignSelf: 'center',
    height: 50,
    width: '90%',
    backgroundColor: '#ffffff', // 밝은 배경색
    borderRadius: 10, // 둥근 테두리
    borderWidth: 1, // 테두리 두께
    borderColor: '#007bff', // 테두리 색상
    shadowColor: '#000', // 그림자 색상
    shadowOffset: {width: 0, height: 2}, // 그림자 위치
    shadowOpacity: 0.1, // 그림자 불투명도
    shadowRadius: 4, // 그림자 반경
    elevation: 2, // 안드로이드용 그림자
    marginVertical: 2, // 상하 마진
  },
  writeButton: {
    position: 'absolute',
    bottom: 24,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1da1f2',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  writeButtonText: {
    fontSize: 30,
    color: 'white',
  },
});

export default BoardScreen;
