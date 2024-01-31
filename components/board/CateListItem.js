import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Assuming you're using Material Icons

const CateListItem = ({cate, onRemove}) => {
  const {categoryId, categoryName} = cate;

  return (
    <View style={styles.cateListItemContainer}>
      <TouchableOpacity style={styles.checkbox}>
        <Text style={styles.text}>{categoryName}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onRemove(categoryId)}>
        <Icon name="remove-circle-outline" size={24} color="#ff6b6b" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cateListItemContainer: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkbox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
});

export default CateListItem;
