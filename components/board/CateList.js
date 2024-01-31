import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import CateListItem from './CateListItem';

const CateList = ({cates, onRemove}) => {
  return (
    <View style={styles.cateListItemContainer}>
      {cates && (
        <FlatList
          data={cates}
          renderItem={({item}) => (
            <CateListItem cate={item} onRemove={onRemove} />
          )}
          keyExtractor={item => item.categoryId}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cateListItemContainer: {
    minHeight: 320,
  },
});

export default CateList;
