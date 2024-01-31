import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Commons from '../../utils/Common';

const BoardItem = ({item, onPress}) => {
  return (
    <TouchableOpacity style={styles.boardItem} onPress={onPress}>
      <Image
        source={{uri: item.img ? item.img : 'http://via.placeholder.com/160'}}
        style={styles.boardImage}
      />
      <View style={styles.contentWrapper}>
        <View style={styles.header}>
          <Text style={styles.boardTitle}>{item.title}</Text>
          <Text style={styles.userId}>{item.email}</Text>
        </View>
        <Text style={styles.boardContent}>{item.content}</Text>
        <Text style={styles.boardDate}>{Commons.formatDate(item.regDate)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boardTitle: {
    fontSize: 18,
    color: '#007bff',
  },
  userId: {
    fontStyle: 'italic',
    color: '#555',
  },
  boardContent: {
    color: '#444',
  },
  boardDate: {
    color: '#777',
    fontSize: 12,
    textAlign: 'right',
  },
  boardItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  boardImage: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
});

// Add styles here

export default BoardItem;
