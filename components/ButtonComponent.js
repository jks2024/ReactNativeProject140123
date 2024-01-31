import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

export const TransBtn = ({color, onPress, children}) => (
  <TouchableOpacity
    // eslint-disable-next-line react-native/no-inline-styles
    style={{
      width: '100%',
      height: 60,
      backgroundColor: color,
      borderWidth: 2,
      borderColor: 'white', // 기본색상
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 12,
      shadowColor: '#888',
      shadowOffset: {width: 1, height: 1},
      shadowOpacity: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10,
      opacity: 0.6,
    }}
    onPress={onPress}>
    <Text
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        color: 'white',
        fontSize: 18,
      }}>
      {children}
    </Text>
  </TouchableOpacity>
);
