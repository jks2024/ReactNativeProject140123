import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import BoardItem from './BoardItem';

const BoardList = ({boardList, onItemPress}) => {
  return (
    <FlatList
      data={boardList}
      renderItem={({item}) => (
        <BoardItem item={item} onPress={() => onItemPress(item)} />
      )}
      keyExtractor={item => item.boardId.toString()}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  block: {flex: 1},
  separator: {
    backgroundColor: '#E0E0E0',
    height: 1,
    width: '100%',
  },
});
export default BoardList;
