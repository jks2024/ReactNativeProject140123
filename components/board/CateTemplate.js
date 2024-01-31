import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CateTemplate = ({children}) => {
  return (
    <View style={styles.cateTemplateContainer}>
      <View style={styles.appTitle}>
        <Text style={styles.appTitleText}>게시판 카테고리</Text>
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  cateTemplateContainer: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 40, // converting em to points
  },
  appTitle: {
    backgroundColor: '#22b8cf',
    height: 52, // converting rem to points
    justifyContent: 'center',
    alignItems: 'center',
  },
  appTitleText: {
    color: 'white',
    fontSize: 24, // converting rem to points
  },
  content: {
    backgroundColor: 'white',
  },
});

export default CateTemplate;
