import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import useLocation from '../hooks/useLocation';

const MyLocScreen = () => {
  const {location, addr} = useLocation();
  return (
    <View style={styles.block}>
      <Text>위도: {location.lat}</Text>
      <Text>경도: {location.long}</Text>
      <Text>주소: {addr}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {},
});

export default MyLocScreen;
